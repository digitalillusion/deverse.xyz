const path = require(`path`)
const slug = require("slug")

exports.createPages = async ({ node, graphql, actions }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const blogTemplate = path.resolve(`./src/templates/blog-post.js`)
  const techTemplate = path.resolve("src/templates/technology.js")
  const result = await graphql(
    `{
        allSite {
          nodes {
            siteMetadata {
              i18n {
                language
              }
            }
          }
        }
        blogMarkdownRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: {regex: "/.*blog.*/"} }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                category
                language
              }
              frontmatter {
                title
                language
              }
            }
          }
        }
        pageMarkdownRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: {regex: "/.*pages.*/"} }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
                category
                language
              }
              frontmatter {
                title
                language
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts and pages.
  const blogPostsByCategory = result.data.blogMarkdownRemark.edges.reduce((r, a) => {
    const category = a.node.fields.category
    r[category] = r[category] || [];
    r[category].push(a);
    return r;
  }, {})
  const pages = result.data.pageMarkdownRemark.edges

  const languages = result.data.allSite.nodes[0].siteMetadata.i18n.map(i => i.language)
  Object.keys(blogPostsByCategory).forEach(category => {
    const blogPosts = blogPostsByCategory[category]
    languages.forEach(language => {
      const blogPostsByLanguage = blogPosts.filter(post => post.node.fields.language === language);
      blogPostsByLanguage.forEach((post, index) => {
        const previous = index === blogPostsByLanguage.length - 1 ? null : blogPostsByLanguage[index + 1].node
        const next = index === 0 ? null : blogPostsByLanguage[index - 1].node
        createPage({
          path: post.node.fields.slug,
          component: blogTemplate,
          context: {
            category: post.node.fields.category,
            slug: post.node.fields.slug,
            previous,
            next,
          },
        })
      })
      pages.filter(page => page.node.fields.language === language).forEach(page => {
        createPage({
          path: page.node.fields.slug,
          component: pageTemplate,
          context: {
            slug: page.node.fields.slug,
            language: language
          },
        })
      })
    })
  })

  // Create technologies pages.
  const tags = result.data.tagsGroup.group
  tags.forEach(tag => {
    createPage({
      path: `/technologies/${slug(tag.fieldValue)}/`,
      component: techTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const value = `/${node.frontmatter.slug ? node.frontmatter.slug : slug(node.frontmatter.title)}`
    createNodeField({
      name: `slug`,
      node,
      value,
    })
    createNodeField({
      name: `language`,
      node,
      value: node.frontmatter.language
    })
    if (node.frontmatter.category) {
      createNodeField({
        name: `categorySlug`,
        node,
        value: `/category/${slug(node.frontmatter.category)}`
      })
    }
  }
}
