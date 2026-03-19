import React from "react"

import { Link, useIntl } from "gatsby-plugin-intl"
import Seo from "./seo"
import { GatsbyImage } from "gatsby-plugin-image"
import TechItem from "./items-tech"


function PortfolioItem({ data, aos, noSeo }) {
  const intl = useIntl()
  let { frontmatter, fields } = data.node
  return (
    <div className="portfolio-card glass-card" data-aos={aos}>
      {!!!noSeo && (
        <Seo title={frontmatter.title} description={frontmatter.description} />
      )}
      <Link to={fields.slug} className="card-image" aria-label={frontmatter.title}>
        <GatsbyImage
          image={frontmatter.coverImage.childImageSharp.gatsbyImageData}
          alt={frontmatter.title}
        />
      </Link>
      <div className="card-content">
        <h3 className="project-title">
          <Link to={fields.slug}>{frontmatter.title}</Link>
        </h3>
        <p className="project-date">
          {intl.formatDate(frontmatter.date, {
            year: "numeric",
            month: "long",
          })}
        </p>
        <p className="project-description">
          {frontmatter.description || data.node.excerpt}
        </p>
        <div className="project-tags">
          {frontmatter.tags?.map((tag, index) => (
            <TechItem
              key={index}
              icon
              compact
              data={{ fieldValue: tag, totalCount: 1 }}
            />
          ))}
        </div>

      </div>
    </div>

  )
}

export default PortfolioItem
