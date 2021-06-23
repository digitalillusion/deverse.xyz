import React from "react"
import CategoryItem from "./items-category"

const PortfolioSection = ({ postsByCategory }) => {
  return (
    <section id="portfolio" className="container">
      {postsByCategory
        .sort((c1, c2) => c2.edges[0].node.frontmatter.timestamp - c1.edges[0].node.frontmatter.timestamp)
        .map((category, index) => {
        return (
          <CategoryItem
            key={index}
            aos={index%2 === 1 ? "fade-right" : "fade-left"}
            data={category} />
        )
      })}
    </section>
  )
}

export default PortfolioSection
