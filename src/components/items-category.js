import React from "react"

import { Link } from "gatsby"
import Img from "gatsby-image"
import "../styles/list-portfolio.less"

function CategoryItem({  data, aos }) {
  let post = data.edges[0].node
  let category = post.frontmatter.category
  return (
    <div className="item-category col s12" data-aos={aos} >
      <div className="row flex">
        <div className="col m6 image">
          <Img
            fluid={
              post.frontmatter.coverImage.childImageSharp.fluid
            }
          />
          <Link
            to={post.fields.categorySlug}
            title={category}
            aria-label={category}
            className="overlay-link"
            style={{ opacity: 0 }}
          >
            {category}
          </Link>
        </div>
        <div className="col m6 content">
          <h2 className="text-primary pseudo-divider">
            <Link
              to={post.fields.categorySlug}
              title={post.frontmatter.title}
              aria-label={
                category
              }
            >
              {category}
            </Link>
          </h2>
          <p className="text-tertiary">
            {post.frontmatter.date}
          </p>
          <p className="text-totalcount">
            {data.totalCount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CategoryItem