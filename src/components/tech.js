import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"
import TechItem from "./items-tech"

const TechSection = ({ postsByTag }) => {
  let maxCount = Math.max.apply(
    Math,
    postsByTag.map(t => t.totalCount)
  )
  return (
    <section id="technologies" className="alternate">
      <div className="container" data-aos="fade-up">
        <h2 className="section-title">
          <FormattedMessage id="navlinks_technologies" />
        </h2>
        <div className="tech-stack-grid">
          {postsByTag.map((tag, index) => {
            return <TechItem key={index} maxCount={maxCount} data={tag} />
          })}
        </div>
      </div>
    </section>
  )
}


export default TechSection
