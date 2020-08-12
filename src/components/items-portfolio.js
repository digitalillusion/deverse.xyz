import React from "react";

import { Link } from "gatsby";
import "../styles/list-portfolio.less";
import SEO from "./seo"

function PortfolioItem({ data, aos }) {
  return (
    <div className="item col s12" data-aos={aos} >
      <SEO title={data.node.frontmatter.title} description={data.node.frontmatter.description} />
      <div className="row flex">
        <div className="col m6 image">
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
        </div>
      </div>
    </div>
  );
}

export default PortfolioItem