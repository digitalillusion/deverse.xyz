import React from "react";
import { useLocation } from "@reach/router"
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'
import Logo from "./logo";
import Navlinks from "./navlinks";
import FooterLinks from "./footer-links";
import "../styles/footer.less";
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import CookieConsent from "react-cookie-consent"

export default function() {
    let intl = useIntl();
    const location = useLocation();
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
            <CookieConsent
              location="bottom"
              containerClasses="cookie-banner"
              buttonClasses="cookie-banner-button"
              declineButtonClasses="cookie-banner-decline"
              contentClasses="cookie-banner-content"
              buttonText={intl.formatMessage({ "id" : "footer_cookie_accept"})}
              enableDeclineButton
              declineButtonText={intl.formatMessage({ "id" : "footer_cookie_decline"})}
              cookieName="gatsby-gdpr-google-analytics"
              onAccept={() => {
                initializeAndTrack(location);
              }}>
               <FormattedMessage id={"footer_cookie_consent"}/>
            </CookieConsent>
        </footer>
    );
}
