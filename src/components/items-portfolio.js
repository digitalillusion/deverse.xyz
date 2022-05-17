import React from "react"

import { Link, useIntl } from "gatsby-plugin-intl"
import "../styles/list-portfolio.less"
import Seo from "./seo"
import { GatsbyImage } from "gatsby-plugin-image"
import TechItem from "./items-tech"
import { rhythm, scale } from "../utils/typography"

function PortfolioItem({ data, aos, noSeo }) {
  const intl = useIntl()
  let { frontmatter, fields } = data.node
  return (
    <div className="item-portfolio col s12" data-aos={aos}>
      {!!!noSeo && (
        <Seo title={frontmatter.title} description={frontmatter.description} />
      )}
      <div className="row flex">
        <div className="col m6 image">
          <GatsbyImage
            image={frontmatter.coverImage.childImageSharp.gatsbyImageData}
            alt={frontmatter.title}
          />
          <Link
            to={fields.slug}
            title={frontmatter.title}
            aria-label={frontmatter.title}
            className="overlay-link"
            style={{ opacity: 0 }}
          >
            {frontmatter.title}
          </Link>
        </div>
        <div className="col m6 content">
          <h2 className="text-primary pseudo-divider">
            <Link
              to={fields.slug}
              title={frontmatter.title}
              aria-label={frontmatter.title}
            >
              {frontmatter.title}
            </Link>
          </h2>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {intl.formatDate(frontmatter.date, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-tertiary">
            {frontmatter.description || data.node.excerpt}
          </p>
          <div className="badge-wrapper">
            {frontmatter.tags.map((tag, index) => {
              return (
                <TechItem
                  key={index}
                  maxCount={1}
                  data={{ fieldValue: tag, totalCount: 1 }}
                  icon={true}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioItem
