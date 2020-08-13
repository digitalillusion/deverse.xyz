import React from "react"
import { graphql } from "gatsby"
import { Container } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PortfolioItem from "../components/items-portfolio"
import SectionTitle from "../components/sectiontitle"
import Link from "../components/link"

const CategoryTemplate = ({ pageContext, data }) => {
  const category = data.allMarkdownRemark.edges[0].node.frontmatter.category
  return (
    <Layout>
      <div className="category-container">
        <SEO title={`Posts in category "${category}"`} />

        <Container>
          <section id="portfolio" className="container">
            <Link to={"/#portfolio"}><SectionTitle title={category} /></Link>
            {data.allMarkdownRemark.edges.map((node, index) => {
              return (
                <PortfolioItem
                  key={node.id}
                  col={index%2 === 1 ? "col-right" : "col-left"}
                  data={node} />
              )
            })}
          </section>
        </Container>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
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
                fluid(quality: 100) {
                ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default CategoryTemplate