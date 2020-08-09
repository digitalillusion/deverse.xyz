import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import { Sun, Moon } from "gatsby-theme-elemental/src/components/icons";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import Link from "gatsby-theme-elemental/src/components/link"

function ListItem({ data, section}) {
  let anchorAttrs = {
    href: data.url,
    title: data.name
  };
  return (
    <Location>
      {({ location }) => {
        if (data.anchor && location.pathname === "/") {
          return (
            <li>
              <AnchorLink
                to={"#" + data.url.substr(1)}
                className={
                  section ===
                  data.name
                    ? "active"
                    : ""
                }
              >
                <span>{data.name}</span>
              </AnchorLink>
            </li>
          )
        }
        return (
          <li>
            <Link
              to={data.url}
              {...anchorAttrs}
              className={
                (!section || section === data.name) && "/" + location.pathname.split("/")[1] ===
                data.url
                  ? "active"
                  : ""
              }
            >
              <span>{data.name}</span>
            </Link>
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
              <Sun />
            </div>
            <div
              title="Switch to Light Mode"
              data-switch-to="light"
              className={darkMode? "active" : ""}
            >
              <Moon />
            </div>
          </div>
        </li>
      </React.Fragment>
    )
}

export default function() {
  const data = useStaticQuery(graphql`
        query NavbarLinkQuery2 {
            site {
                siteMetadata {
                    navLinks {
                        name
                        url
                        anchor
                    }
                    darkmode
                    switchTheme
                }
            }
        }
    `);
  const items = data.site.siteMetadata.navLinks;
  let list = [];

  let [lastSectionOnScreen, setLastSectionOnScreen] = useState(items[0].name)

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setLastSectionOnScreen(null)
    }
    let ticking = false;
    window.addEventListener('scroll', function(e) {

      if (!ticking) {
        window.requestAnimationFrame(function() {
          let lastSection = null
          for (let item of items) {
            let section = document.getElementById(item.name)
            if (section && section.getBoundingClientRect().top < window.outerHeight * 0.5) {
              lastSection = item.name
            }
          }
          if (lastSection && lastSectionOnScreen !== lastSection) {
            setLastSectionOnScreen(lastSection)
          }
          ticking = false;
        });

        ticking = true;
      }
    });
  }, [lastSectionOnScreen, items])

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

  return <ul className="navbar-links">{list}</ul>;
}
