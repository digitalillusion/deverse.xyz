import React, { useCallback, useEffect, useRef, useState } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import SocialLinks from "../components/sociallinks"
import "../styles/wall.less"
import AboutSection from "../components/about"
import PortfolioSection from "../components/portfolio"
import TechSection from "../components/tech"
import Contact from "../components/contact"
import { GatsbyImage } from "gatsby-plugin-image"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { isSmallScreen } from "../utils/functions"

function IndexPage({ data }) {
  let initialHeight = 0, initialWidth = 0;
  if (typeof window !== "undefined") {
    initialHeight = window.innerHeight
    initialWidth =  window.innerWidth
  }
  let [winHeight, setWinHeight] = useState(initialHeight)
  let [winWidth, setWinWidth] = useState(initialWidth)

  let [wallpaper, setWallpaper] = useState(null)
  let mainTitle = useRef()
  const intl = useIntl()

  let chooseWallpaper = useCallback(() => {
    let documentHeight = document.body.offsetHeight
    let scroll = window.innerHeight + window.scrollY
    if (scroll < documentHeight * 0.6 && wallpaper !== "wall") {
      return "wall"
    } else if (scroll >= documentHeight * 0.6 && wallpaper !== "wall2") {
      return "wall2"
    }
    return wallpaper
  }, [wallpaper])
  let resizeListener = useCallback(() => {
    const outerHeight = typeof window !== "undefined" ? window.outerHeight : 0
    const outerWidth = typeof window !== "undefined" ? window.outerWidth : 0
    setWinHeight(outerHeight)
    setWinWidth(outerWidth)
  }, [setWinHeight, setWinWidth])
  let scrollListener = useCallback(
    () => setWallpaper(chooseWallpaper()),
    [chooseWallpaper]
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", resizeListener)
      window.addEventListener("scroll", scrollListener)
    }

    if (wallpaper == null) {
      resizeListener()
      scrollListener()
    }

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        if (mainTitle.current) {
          mainTitle.current.innerHTML += ""
        }
      }, 200 * i)
    }

    return () => {
      window.removeEventListener("resize", resizeListener)
      window.removeEventListener("scroll", scrollListener)
    }
  }, [wallpaper, resizeListener, scrollListener])

  return (
    <Layout placeholder={false}>
      {wallpaper && (
        <GatsbyImage
          className="wallpaper"
          image={data[wallpaper].childImageSharp.gatsbyImageData}
          alt="wallpaper"
        />
      )}
      <section id="home" className="seethrough">
        <Seo
          lang={intl.locale}
          title={intl.formatMessage({ id: "index_title" })}
        />
        <div className="wall">
          <div className="intro container">
            <div
              className="main-title text-primary"
              style={{ height: winHeight + "px" }}
              ref={mainTitle}
            >
              <div className="main-title-text" ref={mainTitle}>
                <svg>
                  <defs>
                    <mask id="mask" x="0" y="0" width="100%" height={winHeight}>
                      <rect
                        id="alpha"
                        x="0"
                        y="0"
                        width="100%"
                        height={winHeight}
                      />
                      <text
                        id="title"
                        x="50%"
                        y="0%"
                        dy={isSmallScreen() ? "15%" : "40%"}
                        textAnchor="middle"
                      >
                        {intl.formatMessage({ id: "site_metadata_title" })}
                      </text>
                    </mask>
                    <linearGradient id="alpha-gradient" x2="0%" y2="95%">
                      <stop offset="70%" stopColor="white" />
                      <stop offset="80%" stopColor="lightgrey" />
                      <stop offset="90%" stopColor="grey" />
                      <stop offset="99%" stopColor="black" />
                    </linearGradient>
                  </defs>
                  <rect id="base" x="0" y="0" width="100%" height="100%" />
                </svg>
              </div>
              <div
                className="main-title-subtext"
                style={{
                  top:
                    (isSmallScreen() ? -0.8 * winHeight : -0.5 * winHeight) +
                    "px",
                }}
              >
                <p className="tag-line text-secondary">
                  <FormattedMessage id={"index_intro_tag"} />
                </p>
                <p className="caption text-tertiary">
                  <FormattedMessage id={"index_intro_description"} />
                </p>
                <Link to="/#portfolio" className="btn">
                  <FormattedMessage id={"index_intro_works"} />
                </Link>
              </div>
            </div>
          </div>
          <div className="social-buttons">
            <SocialLinks />
          </div>
        </div>
      </section>
      <div className="home">
        <AboutSection width={winWidth} />
        <PortfolioSection postsByCategory={data.allCategories.group} />
        <TechSection postsByTag={data.allTags.group} />
        <Contact />
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query ($language: String!) {
    site {
      siteMetadata {
        social {
          name
          url
          icon
        }
      }
    }
    allCategories: allMarkdownRemark(
      filter: { fields: { language: { eq: $language } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___category, limit: 1) {
        totalCount
        edges {
          node {
            excerpt
            fields {
              slug
              categorySlug
            }
            frontmatter {
              category
              date(formatString: "MMMM DD, YYYY")
              timestamp: date(formatString: "x")
              title
              description
              coverImage {
                childImageSharp {
                  gatsbyImageData(layout: CONSTRAINED)
                }
              }
            }
          }
        }
      }
    }
    allTags: allMarkdownRemark(
      filter: { fields: { language: { eq: $language } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___tags, limit: 1) {
        fieldValue
        totalCount
      }
    }
    wall: file(absolutePath: { regex: "/wall.jpg/" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
    wall2: file(absolutePath: { regex: "/wall2.jpg/" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
  }
`
