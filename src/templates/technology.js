import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import GlobalHead from "../components/head"
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl"
import Layout from "../components/layout"
import { Container } from "react-bootstrap"
import PortfolioItem from "../components/items-portfolio"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { technologies } from "../components/items-tech"
import slug from "slug"

const getTechName = techTag => technologies[techTag]?.name || techTag
const getTechLink = techTag => `/technologies/${slug(getTechName(techTag))}`

const Technology = ({ pageContext, data }) => {
  const { tag } = pageContext
  const intl = useIntl()
  const { edges, totalCount } = data.allMarkdownRemark
  const tags = data.allTags.group
    .map(group => group.fieldValue)
    .sort((a, b) => getTechName(a).localeCompare(getTechName(b)))
  const currentIndex = tags.indexOf(tag)
  const previousTag = currentIndex > 0 ? tags[currentIndex - 1] : null
  const nextTag = currentIndex >= 0 && currentIndex < tags.length - 1 ? tags[currentIndex + 1] : null

  const tagHeader =
    totalCount === 1
      ? intl.formatMessage(
        { id: "technology_using_one" },
        { 0: technologies[tag].name }
      )
      : intl.formatMessage(
        { id: "technology_using_many" },
        { 0: technologies[tag].name, 1: totalCount }
      )
  return (
    <Layout>
      <div className="category-container">

        <section id="technologies" className="container">
          <h2 className="section-title">{tagHeader}</h2>
          <Container>
            <header>
              <nav>
                <ul className={"inner"}>
                  <li>
                    {previousTag && (
                      <Link
                        to={getTechLink(previousTag)}
                        className="text-secondary"
                        rel="prev"
                      >
                        ◀ {getTechName(previousTag)}
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link
                      to="/#technologies"
                      className="text-secondary"
                      rel="up"
                    >
                      ▲ <FormattedMessage id={"technology_all"} />
                    </Link>
                  </li>
                  <li>
                    {nextTag && (
                      <Link
                        to={getTechLink(nextTag)}
                        className="text-secondary"
                        rel="next"
                      >
                        {getTechName(nextTag)} ▶
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </header>
            <div className="portfolio-grid">
              {edges.map((node, index) => {
                return (
                  <PortfolioItem
                    noSeo
                    key={node.id}
                    col={index % 2 === 1 ? "col-right" : "col-left"}
                    aos="fade-up"
                    data={node}
                  />
                )
              })}
            </div>
          </Container>
        </section>
      </div>
    </Layout>
  )
}

export default Technology
export const pageQuery = graphql`
  query ($tag: String!, $language: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { tags: { in: [$tag] }, language: { eq: $language } }
      }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
            category
          }
          frontmatter {
            category
            title
            date
            description
            tags
            coverImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
    allTags: allMarkdownRemark(
      filter: { fields: { language: { eq: $language } } }
    ) {
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
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
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark

  const tagHeader =
    totalCount === 1
      ? intl.formatMessage(
        { id: "technology_using_one" },
        { 0: technologies[tag].name }
      )
      : intl.formatMessage(
        { id: "technology_using_many" },
        { 0: technologies[tag].name, 1: totalCount }
      )

  return (
    <RawIntlProvider value={intl}>
      <GlobalHead />
      <Seo title={tagHeader} />
    </RawIntlProvider>
  )
}
