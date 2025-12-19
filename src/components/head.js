import React from "react"
import { graphql, useStaticQuery } from "gatsby"

function Header({ children }) {
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          icon
        }
      }
    }
  `);

  return (
    <>
      <link rel="icon" href={query.site.siteMetadata.icon} type="image/png" />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/gh/akzhy/trunk/dist/trunk.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Work+Sans:800|Poppins&display=swap"
        rel="stylesheet"
      />

      <script src="https://www.google.com/recaptcha/api.js" async defer />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-6E180WPVZL"></script>
      <script>
        {`
          if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6E180WPVZL');
          }
        `}
      </script>

      {children}
    </>
  )
}

export default Header
