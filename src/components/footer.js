import React from "react";
import Logo from "./logo";
import Navlinks from "./navlinks";
import FooterLinks from "./footer-links";
import "../styles/footer.less";
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

export default function() {
    let intl = useIntl();
    let title = intl.formatMessage({ id : "site_metadata_title"});
    return (
        <footer className="footer">
            <div className="container">
                <div className="logo">
                    <Link to="/" title={title}>
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
                    <FormattedMessage id={"footer_copyright"} values={{ 0 : new Date().getFullYear(), 1 : title}} />
                </p>
            </div>
        </footer>
    );
}
