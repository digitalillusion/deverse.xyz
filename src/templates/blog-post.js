import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import TechItem from "../components/items-tech"

const NavBlock = ({ pageContext, post }) => {
  const { previous, next } = pageContext
  return <nav>
    <ul
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `space-between`,
        listStyle: `none`,
        padding: 0,
      }}
    >
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev" className="text-secondary">
            ◀ {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {post && (
          <Link to={post.fields.categorySlug} rel="up" className="text-secondary">
            ▲ Back to {post.frontmatter.category}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next" className="text-secondary">
            {next.frontmatter.title} ▶
          </Link>
        )}
      </li>
    </ul>
  </nav>
}

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <section id="portfolio" className="row flex" >
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </p>
            <NavBlock pageContext={pageContext} post={post} />
          </header>
            <div className="blog-post" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="badge-wrapper">
              {post.frontmatter.tags.map((tag, index) => {
                return <TechItem
                  key={index}
                  index={index}
                  maxCount={1}
                  data={{ fieldValue: tag, totalCount: 1 }}
                  icon={true}
                />
              })}
            </div>
          <footer>
            <NavBlock pageContext={pageContext} post={post} />
          </footer>
        </article>
      </section>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        categorySlug
      }
      frontmatter {
        title
        category
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`
