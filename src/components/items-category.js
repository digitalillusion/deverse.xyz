import React from "react"

import { Link, useIntl } from "gatsby-plugin-intl";
import "../styles/list-portfolio.less"
import { GatsbyImage } from "gatsby-plugin-image"

function CategoryItem({ data, aos }) {
  const intl = useIntl()
  let post = data.edges[0].node
  let category = intl.formatMessage({ id: "blog_post_category_" + post.frontmatter.category })
  return (
    <div className="item-category col s12" data-aos={aos} >
      <div className="row flex">
        <div className="col m6 image">
          <GatsbyImage image={post.frontmatter.coverImage.childImageSharp.gatsbyImageData} alt={category}/>
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
            {intl.formatDate(post.frontmatter.date, { year: 'numeric', month: 'long', day: 'numeric' })}
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