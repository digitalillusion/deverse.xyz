import React from "react"
import { graphql } from "gatsby"
import { Container } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PortfolioItem from "../components/items-portfolio"
import SectionTitle from "../components/sectiontitle"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

const NavBlock = ({ currentCategory, allCategories }) => {
  return (
    <nav>
      <ul>
        {allCategories &&
          allCategories.group.map(group => {
            let node = group.edges[0].node
            if (currentCategory === node.frontmatter.category) {
              return null
            }
            return (
              <li>
                <Link
                  to={node.fields.categorySlug}
                  rel="prev"
                  className="text-secondary"
                >
                  <FormattedMessage
                    id={"blog_post_category_" + node.frontmatter.category}
                  />
                </Link>
              </li>
            )
          })}
      </ul>
    </nav>
  )
}

const CategoryTemplate = ({ data }) => {
  const category = data.allMarkdownRemark.edges[0].node.frontmatter.category
  const intl = useIntl()
  let categoryTitle = intl.formatMessage({
    id: "blog_post_category_" + category,
  })
  return (
    <Layout>
      <div className="category-container">
        <Seo
          title={intl.formatMessage(
            { id: "blog_post_title" },
            { 0: categoryTitle }
          )}
        />

        <section id="portfolio">
          <SectionTitle title={categoryTitle} />
          <Container>
            <header>
              <NavBlock
                currentCategory={category}
                allCategories={data.allCategories}
              />
            </header>

            {data.allMarkdownRemark.edges.map((node, index) => {
              return (
                <PortfolioItem
                  noSeo
                  key={index}
                  col={index % 2 === 1 ? "col-right" : "col-left"}
                  aos={index % 2 === 1 ? "fade-left" : "fade-right"}
                  data={node}
                />
              )
            })}
            <footer>
              <NavBlock
                currentCategory={category}
                allCategories={data.allCategories}
              />
            </footer>
          </Container>
        </section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoryPage($category: String!, $language: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { category: { eq: $category }, language: { eq: $language } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            category
          }
          excerpt
          timeToRead
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
    allCategories: allMarkdownRemark(
      filter: { fields: { language: { eq: $language } } }
    ) {
      group(field: frontmatter___category, limit: 1) {
        edges {
          node {
            fields {
              categorySlug
            }
            frontmatter {
              category
            }
          }
        }
      }
    }
  }
`

export default CategoryTemplate
