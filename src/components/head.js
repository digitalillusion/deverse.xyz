import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

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
        <Helmet>
            <link
                rel="icon"
                href={query.site.siteMetadata.icon}
                type="image/png"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdn.jsdelivr.net/gh/akzhy/trunk/dist/trunk.min.css"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Work+Sans:800|Poppins&display=swap"
                rel="stylesheet"
            />
            <link rel="stylesheet" type="text/css" href="https://cdn.wpcc.io/lib/1.0.2/cookieconsent.min.css"/>

            <script src="https://www.google.com/recaptcha/api.js" async defer/>

          { children }
        </Helmet>
    );
}

export default Header;
