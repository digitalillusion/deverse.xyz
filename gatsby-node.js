const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const slug = require("slug")

exports.createPages = async ({ node, graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const techTemplate = path.resolve("src/templates/technology.js")
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {fileAbsolutePath: {regex: "/.*blog.*/"}}
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                category
              }
              frontmatter {
                title
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

  // Create blog posts pages.
  const postsByCategory = result.data.allMarkdownRemark.edges.reduce((r, a) => {
    const category = a.node.fields.category
    r[category] = r[category] || [];
    r[category].push(a);
    return r;
  }, {})

  Object.keys(postsByCategory).forEach(category => {
    const posts = postsByCategory[category]
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          category: post.node.fields.category,
          slug: post.node.fields.slug,
          previous,
          next,
        },
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
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
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
