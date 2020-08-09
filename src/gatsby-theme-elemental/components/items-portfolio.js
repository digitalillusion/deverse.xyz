import React from "react";

import { Link } from "gatsby";
import Img from "gatsby-image";
import "gatsby-theme-elemental/src/style/list-portfolio.less";

function PortfolioItem({ data, aos }) {
  return (
    <div className="item col s12" data-aos={aos} >
      <div className="row flex">
        <div className="col m6 image">
          <Img
            fluid={
              data.node.frontmatter.image
                .childImageSharp.fluid
            }
          />
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
            {data.node.frontmatter.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function(props) {
  const data = props.data.allMarkdownRemark.edges;
  let items = [];
  data.forEach(function(e, i) {
    items.push(<PortfolioItem
      key={e.node.id}
      aos={i%2 === 0 ? "fade-right" : "fade-left"}
      data={e} />);
  });
  return <div className="row">{items}</div>;
}

