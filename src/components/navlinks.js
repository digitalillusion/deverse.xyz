import React, { useCallback, useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import { Sun, Moon } from "./icons";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { useIntl, changeLocale, FormattedMessage } from "gatsby-plugin-intl"
import ReactFlagsSelect from 'react-flags-select';


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
                          (!section && "/" + location.pathname.split("/")[1] === data.url)
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

function ThemeSwitchButton() {
    function hasDarkMode() {
        return localStorage.getItem("darkMode") === "dark-mode"
    }
    let [darkMode, setDarkMode] = useState(hasDarkMode())
    useEffect(() => {
        const darkMode = localStorage.getItem("darkMode");
        document.body.className = darkMode;
    })

    function switchTheme(event) {
        if (event.type === 'click' ||
          (['keydown', 'keypress'].includes(event.type) &&
            ['F9'].includes(event.key))) {
            const change = hasDarkMode() ? "" : "dark-mode"
            localStorage.setItem("darkMode", change)
            setDarkMode(change)
        }

    }

    return (
      <React.Fragment>
          <li className="switch-theme">
              <div role='presentation' className="switch-button" onClick={switchTheme} onKeyDown={switchTheme}>
                  <div
                    title="Switch to Dark Mode"
                    data-switch-to="dark"
                    className={!darkMode ? "active" : ""}
                  >
                      <Moon />
                  </div>
                  <div
                    title="Switch to Light Mode"
                    data-switch-to="light"
                    className={darkMode? "active" : ""}
                  >
                      <Sun />
                  </div>
              </div>
          </li>
      </React.Fragment>
    )
}

export default function() {
    const intl = useIntl();
    const data = useStaticQuery(graphql`
        query NavbarLinkQuery2 {
            site {
                siteMetadata {
                    navLinks {
                        name
                        url
                    }
                    darkmode
                    switchTheme
                    i18n {
                        country
                        language
                    }
                }
            }
        }
    `);
    const items = data.site.siteMetadata.navLinks;
    let list = [];

    let [lastSectionOnScreen, setLastSectionOnScreen] = useState(items[0].name)

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

    if (data.site.siteMetadata.switchTheme) {
        list.push(
          <ThemeSwitchButton
            key="themeswitcher"
            darkmode={data.site.siteMetadata.darkmode}
          />
        );
    }

    let i18n = data.site.siteMetadata.i18n;
    list.push(
        <ReactFlagsSelect
          key="languageswitcher"
          selected={i18n.find(i => i.language === intl.locale).country}
          countries={i18n.map(i => i.country)}
          onSelect={code => changeLocale(i18n.find(i => i.country === code).language) }
          fullWidth={false}
          className="menu-flags"
          selectButtonClassName="menu-flags-button"
          showSelectedLabel={false}
          showOptionLabel={false}
        />
    );

    return <ul className="navbar-links">{list}</ul>;
}
