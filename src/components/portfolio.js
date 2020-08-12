import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PortfolioItem from "./items-portfolio"

const PortfolioSection = () => {
  const data = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            coverImage
          }
        }
      }
    }
  }
`)

  const posts = data.allMarkdownRemark.edges

  return (
    <section id="portfolio" className="container">
      {posts.map((node, index) => {
        return (
          <PortfolioItem
            key={node.id}
            aos={index%2 === 1 ? "fade-right" : "fade-left"}
            data={node} />
        )
      })}
    </section>
  )
}

export default PortfolioSection
