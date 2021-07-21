import React, { useCallback, useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Location } from "@reach/router";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { FormattedMessage, useIntl } from "gatsby-plugin-intl";

function ListItem({ data, section}) {
    const intl = useIntl();
    let anchor = {
        href:  intl.routed || intl.locale ? `/${intl.locale}${data.url}` : `${data.url}`,
        title: data.name
    };
    return (
      <Location>
          {({ location }) => {
              if (location.pathname === "/" + intl.locale + "/") {
                  return (
                    <li>
                        <AnchorLink
                          to={anchor.href}
                          className={
                              section ===
                              anchor.title
                                ? "active"
                                : ""
                          }
                        >
                            <FormattedMessage id={"navlinks_" + anchor.title} />
                        </AnchorLink>
                    </li>
                  )
              }
              return (
                <li>
                    <AnchorLink
                      to={anchor.href}
                      {...anchor}
                      className={
                          (section === anchor.title) ||
                          (!section && "/" + location.pathname.split("/")[1] === data.url && data.url)
                            ? "active"
                            : ""
                      }
                    >
                        <FormattedMessage id={"navlinks_" + anchor.title} />
                    </AnchorLink>
                </li>
              );
          }}
      </Location>
    );
}

export default function() {
    const data = useStaticQuery(graphql`
        query NavbarLinkQuery2 {
            site {
                siteMetadata {
                    navLinks {
                        name
                        url
                    }
                }
            }
        }
    `);
    const items = data.site.siteMetadata.navLinks;
    let list = [];

    let [lastSectionOnScreen, setLastSectionOnScreen] = useState()

    let findLastSection = useCallback(() => {
        let lastSection = null
        for (let item of items) {
            let section = document.getElementById(item.name)
            if (section && section.getBoundingClientRect().top < window.outerHeight * 0.5) {
                lastSection = item.name
            }
        }
        if (lastSection && lastSectionOnScreen !== lastSection) {
            return lastSection
        }
        return false
    }, [items, lastSectionOnScreen]);

    useEffect(() => {
        let scrollListener = () => {
            let lastSection = findLastSection();
            if (lastSection) {
                setLastSectionOnScreen(lastSection);
            }
        }

        if (lastSectionOnScreen == null) {
            scrollListener()
        }

        window.addEventListener('scroll', scrollListener)
        return () => {
            window.removeEventListener('scroll', scrollListener)
        }
    }, [lastSectionOnScreen, items, findLastSection])

    items.forEach(function(e, i) {
        list.push(<ListItem key={[e.url, i, lastSectionOnScreen]} data={e} section={lastSectionOnScreen} />);
    });

    return <ul className="navbar-links">{list}</ul>;
}
