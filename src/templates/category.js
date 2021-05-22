import React from "react"
import { graphql, Link } from "gatsby"
import { Container } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PortfolioItem from "../components/items-portfolio"
import SectionTitle from "../components/sectiontitle"

const NavBlock = ({ currentCategory, allCategories }) => {
  return <nav>
    <ul
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `center`,
        listStyle: `none`,
        padding: 0,
      }}
    >
      {allCategories && allCategories.group.map( group => {
        let node = group.edges[0].node
        if (currentCategory === node.frontmatter.category) {
          return null
        }
        return (
          <li>
            <Link to={node.fields.categorySlug} rel="prev" className="text-secondary">
              {node.frontmatter.category}
            </Link>
          </li>
        )
      })}
    </ul>
  </nav>
}

const CategoryTemplate = ({ pageContext, data }) => {
  const category = data.allMarkdownRemark.edges[0].node.frontmatter.category
  return (
    <Layout>
      <div className="category-container">
        <SEO title={`Posts in category "${category}"`} />

        <section id="portfolio" className="container">
          <SectionTitle title={category} />
          <Container>
            <header>
              <NavBlock currentCategory={category} allCategories={data.allCategories} />
            </header>

              {data.allMarkdownRemark.edges.map((node, index) => {
                return (
                  <PortfolioItem
                    noSeo
                    key={node.id}
                    col={index%2 === 1 ? "col-right" : "col-left"}
                    data={node} />
                )
              })}
              <footer>
                <NavBlock currentCategory={category} allCategories={data.allCategories} />
              </footer>
          </Container>
        </section>
    </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoryPage($category: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { category: { eq: $category } } }
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
            coverImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
    allCategories: allMarkdownRemark {
      group(
          field: frontmatter___category,
          limit: 1
      ) {
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