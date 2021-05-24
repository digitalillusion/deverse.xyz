import React from "react";
import { useStaticQuery, graphql} from "gatsby";
import Logo from "./logo";
import Navlinks from "./navlinks";
import FooterLinks from "./footer-links";
import "../styles/footer.less";
import { Link } from "gatsby-plugin-intl"

export default function() {
    const query = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <footer className="footer">
            <div className="container">
                <div className="logo">
                    <Link to="/" title={query.site.siteMetadata.title}>
                        <Logo />
                    </Link>
                </div>
                <div className="navlinks text-secondary">
                    <Navlinks />
                </div>
                <div
                    className="navlinks text-secondary"
                    style={{ marginTop: "20px" }}
                >
                    <FooterLinks />
                </div>
                <p className="text-primary f-d">
                    Copyright &copy; {query.site.siteMetadata.title}{" "}
                    {new Date().getFullYear()}.
                    All registered trademarks are property of their respective owners.
                </p>
            </div>
        </footer>
    );
}
