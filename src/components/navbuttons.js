import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Moon, Sun } from "./icons";
import { changeLocale, useIntl } from "gatsby-plugin-intl";
import ReactFlagsSelect from "react-flags-select";

function ThemeSwitchButton() {
    let [theme, setTheme] = useState(getTheme())

    function getTheme() {
        if (typeof window !== "undefined") {
            return window.localStorage.getItem("theme")
        }
        return null
    }

    useEffect(() => {
        document.body.className = getTheme() === null ? changeTheme() : getTheme()
    })

    function hasDarkMode() {
        return getTheme() !== "light-mode"
    }

    function changeTheme(onSwitch) {
        if (theme === null) {
            let newTheme = onSwitch ? "light-mode" : "dark-mode";
            if (typeof window !== "undefined") {
                window.localStorage.setItem("theme", newTheme);
            }
            return newTheme
        }
        return getTheme() === "dark-mode" ? "light-mode" : "dark-mode"
    }

    function switchTheme(event) {
        if (event.type === 'click' ||
          (['keydown', 'keypress'].includes(event.type) &&
            ['F9'].includes(event.key))) {
            let newTheme = changeTheme(true)
            setTheme(newTheme)
            if (typeof window !== "undefined") {
                window.localStorage.setItem("theme", newTheme);
            }
        }

    }

    return (
      <React.Fragment>
          <li className="switch-theme">
              <div role='presentation' className="switch-button" onClick={switchTheme} onKeyDown={switchTheme}>
                  <div
                    title="Switch to Dark Mode"
                    data-switch-to="dark"
                    className={!hasDarkMode() ? "active" : ""}
                  >
                      <Moon />
                  </div>
                  <div
                    title="Switch to Light Mode"
                    data-switch-to="light"
                    className={hasDarkMode() ? "active" : ""}
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
        query NavbarButtonsQuery {
            site {
                siteMetadata {
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
    let list = [];

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
          onSelect={code => {
              let selected = i18n.find(i => i.country === code).language;
              changeLocale(selected, `/`)
          }}
          fullWidth={false}
          className="menu-flags"
          selectButtonClassName="menu-flags-button"
          showSelectedLabel={false}
          showOptionLabel={false}
        />
    );

    return <ul className="navbar-buttons">{list}</ul>;
}
