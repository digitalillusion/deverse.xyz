import React from "react"
import CategoryItem from "./items-category"

const PortfolioSection = ({ postsByCategory }) => {
  return (
    <section id="portfolio" className="container">
      {postsByCategory.map((category, index) => {
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
