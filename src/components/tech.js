import React from "react"
import TechItem from "./items-tech"

const TechSection = ({ postsByTag }) => {
  let maxCount = Math.max.apply(
    Math,
    postsByTag.map(t => t.totalCount)
  )
  return (
    <section id="technologies" className="seethrough">
      <div className="badge-wrapper" data-aos="fade-up" >
        {postsByTag.map((tag, index) => {
          return <TechItem key={index} maxCount={maxCount} data={tag} />
        })}
      </div>
    </section>
  )
}

export default TechSection
