import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import GlobalHead from "../components/head"
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl"
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
      <div className="project-detail-page">
        <section className="container section-padding">
          <div className="project-header" data-aos="fade-up">
            <NavBlock pageContext={pageContext} post={post} />
            <h1 className="project-title">{post.frontmatter.title}</h1>
            <p className="project-date">
              {intl.formatDate(post.frontmatter.date, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="project-grid">
            <div className="project-main-content">
              <div className="glass-card content-card" data-aos="fade-up">
                <GatsbyImage
                  className="project-cover"
                  image={post.frontmatter.coverImage.childImageSharp.gatsbyImageData}
                  alt={post.frontmatter.title}
                />
                <div
                  className="project-body"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </div>
            </div>

            <aside className="project-sidebar">
              <div className="glass-card sidebar-card" data-aos="fade-left">
                <h3 className="sidebar-title">
                  <FormattedMessage id="blog_post_links" />
                </h3>
                <div className="project-links">
                  {post.frontmatter.links &&
                    post.frontmatter.links.map(link => {
                      let icon
                      if (link.indexOf("github.com") > 0) icon = github
                      else if (link.indexOf("youtube.com") > 0) icon = youtube
                      else if (link.indexOf("play.google.com") > 0) icon = googleplay
                      else icon = linkout
                      
                      return (
                        <a key={link} href={link} target="_blank" rel="noreferrer" className="link-item">
                          <Icon icon={icon} className="link-icon" />
                          <span className="link-text">{new URL(link).hostname}</span>
                        </a>
                      )
                    })}
                </div>

                <h3 className="sidebar-title mt-4">
                  <FormattedMessage id="blog_post_tags" />
                </h3>
                <div className="project-tags">
                  {post.frontmatter.tags.map((tag, index) => (
                    <TechItem
                      key={index}
                      icon
                      compact
                      data={{ fieldValue: tag, totalCount: 1 }}
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
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

export const Head = ({ data, pageContext }) => {
  const intl = createIntl(
    {
      locale: pageContext.intl.language,
      messages: pageContext.intl.messages,
    },
    createIntlCache()
  )
  const post = data.markdownRemark
  return (
    <RawIntlProvider value={intl}>
      <GlobalHead />
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
    </RawIntlProvider>
  )
}
