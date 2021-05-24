import React from "react";

import { Link } from "gatsby-plugin-intl";
import "../styles/list-portfolio.less";
import SEO from "./seo"
import { GatsbyImage } from "gatsby-plugin-image"
import TechItem from "./items-tech"

function PortfolioItem({ data, aos, noSeo }) {
  return (
    <div className="item-portfolio col s12" data-aos={aos} >
      {!!!noSeo && <SEO title={data.node.frontmatter.title} description={data.node.frontmatter.description} />}
      <div className="row flex">
        <div className="col m6 image">
          <GatsbyImage image={data.node.frontmatter.coverImage.childImageSharp.gatsbyImageData} alt={data.node.frontmatter.title}/>
          <Link
            to={data.node.fields.slug}
            title={data.node.frontmatter.title}
            aria-label={data.node.frontmatter.title}
            className="overlay-link"
            style={{ opacity: 0 }}
          >
            {data.node.frontmatter.title}
          </Link>
        </div>
        <div className="col m6 content">
          <h2 className="text-primary pseudo-divider">
            <Link
              to={data.node.fields.slug}
              title={data.node.frontmatter.title}
              aria-label={
                data.node.frontmatter.title
              }
            >
              {data.node.frontmatter.title}
            </Link>
          </h2>
          <p className="text-tertiary">
            {data.node.frontmatter.description || data.node.excerpt}
          </p>
          <div className="badge-wrapper">
            {data.node.frontmatter.tags.map((tag, index) => {
              return <TechItem
                key={index}
                maxCount={1}
                data={{ fieldValue: tag, totalCount: 1 }}
                icon={true}
              />
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioItem