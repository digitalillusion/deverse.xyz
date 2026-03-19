import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.headerFontFamily = ["Outfit", "sans-serif"]
Wordpress2016.bodyFontFamily = ["Inter", "sans-serif"]

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "h1,h2,h3,h4,h5,h6": {
      marginTop: "2.5rem",
      marginBottom: "1.25rem",
      fontFamily: ["Outfit", "sans-serif"].join(","),
    },
    a: {
      color: "var(--accent-primary)",
      textDecoration: "none",
      backgroundImage: "none",
      boxShadow: "none",
    },
    p: {
      marginBottom: "1.5rem",
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
