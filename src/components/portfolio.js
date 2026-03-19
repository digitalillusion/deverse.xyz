import React from "react"
import PortfolioItem from "./items-portfolio"
import { FormattedMessage } from "gatsby-plugin-intl"

const PortfolioSection = ({ postsByCategory }) => {
  return (
    <section id="portfolio">

      <div className="container">
        <h2 className="section-title">
          <FormattedMessage id="navlinks_portfolio" />
        </h2>
        <div className="portfolio-grid">
          {postsByCategory
            .sort(
              (c1, c2) =>
                c2.edges[0].node.frontmatter.timestamp -
                c1.edges[0].node.frontmatter.timestamp
            )
            .map((category, index) => {
              // Note: Each category here seems to contain one or more posts.
              // In the original, it was using CategoryItem which showed one category.
              // I'll show the latest post from each category in the grid for now, 
              // or better, map all edges if we want all projects.
              return category.edges.map((edge, edgeIndex) => (
                <PortfolioItem
                  key={`${index}-${edgeIndex}`}
                  aos="fade-up"
                  data={edge}
                  noSeo={true}
                />
              ))
            })}
        </div>
      </div>
    </section>

  )
}

export default PortfolioSection
