import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Logo = () => {
  const query = useStaticQuery(graphql`
    query LogoQuery {
      site {
        siteMetadata {
          title
          logo
        }
      }
    }
  `)
  return (
    <img
      className="logo"
      src={query.site.siteMetadata.logo}
      alt={query.site.siteMetadata.title}
    />
  )
}
export default Logo
