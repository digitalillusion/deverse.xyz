import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import github from "@iconify/icons-simple-icons/github"
import youtube from "@iconify/icons-simple-icons/youtube"
import googleplay from "@iconify/icons-fa-brands/google-play"
import linkout from "@iconify/icons-fa-solid/link"
import { Icon } from "@iconify/react"
import TechItem from "../components/items-tech"
import { GatsbyImage } from "gatsby-plugin-image"

const NavBlock = ({ pageContext, post }) => {
  const { previous, next } = pageContext
  const intl = useIntl()
  return (
    <nav>
      <ul className={"inner"}>
        <li>
          {previous && (
            <Link
              to={previous.fields.slug}
              rel="prev"
              className="text-secondary"
            >
              ◀ {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {post && (
            <Link
              to={post.fields.categorySlug}
              rel="up"
              className="text-secondary"
            >
              ▲{" "}
              <FormattedMessage
                id={"blog_post_all"}
                values={{
                  0: intl.formatMessage({
                    id: "blog_post_category_" + post.frontmatter.category,
                  }),
                }}
              />
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
  )
}

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const intl = useIntl()
  return (
    <Layout location={location}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <section id="blog-post" className="row flex">
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
              {intl.formatDate(post.frontmatter.date, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <NavBlock pageContext={pageContext} post={post} />
          </header>
          <div className="blog-post-row">
            <div className="blog-post-lcol" data-aos="zoom-in">
              <GatsbyImage
                className="blog-post-cover"
                image={
                  post.frontmatter.coverImage.childImageSharp.gatsbyImageData
                }
                alt={post.frontmatter.title}
              />
            </div>
            <div className="blog-post-rcol" data-aos="zoom">
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </div>
          <div className="blog-post-row">
            <div className="blog-post-lcol">
              <div className="links">
                {post.frontmatter.links &&
                  post.frontmatter.links.map(link => {
                    let icon
                    if (link.indexOf("github.com") > 0) {
                      icon = github
                    } else if (link.indexOf("youtube.com") > 0) {
                      icon = youtube
                    } else if (link.indexOf("play.google.com") > 0) {
                      icon = googleplay
                    } else {
                      icon = linkout
                    }
                    return (
                      <a
                        key={icon}
                        href={link}
                        title={link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon icon={icon} color="#6888DF" />
                      </a>
                    )
                  })}
              </div>
            </div>
            <div className="blog-post-rcol">
              <div className="badge-wrapper">
                {post.frontmatter.tags.map((tag, index) => {
                  return (
                    <TechItem
                      key={index}
                      maxCount={1}
                      data={{ fieldValue: tag, totalCount: 1 }}
                      icon={true}
                    />
                  )
                })}
              </div>
            </div>
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
  query BlogPostBySlugAndLanguage($slug: String!, $language: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(
      fields: { slug: { eq: $slug }, language: { eq: $language } }
    ) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        categorySlug
      }
      frontmatter {
        title
        coverImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        category
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        links
      }
    }
  }
`
