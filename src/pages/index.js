import React, { useCallback, useEffect, useState } from "react"
import Layout from "../components/layout";
import { graphql } from "gatsby";
import SEO from "../components/seo"
import SocialLinks from "../components/sociallinks";
import "../styles/wall.less";
import AboutSection from "../components/about"
import PortfolioSection from "../components/portfolio"
import TechSection from "../components/tech"
import Contact from "../components/contact"
import { GatsbyImage } from "gatsby-plugin-image"
import { useIntl, FormattedMessage } from "gatsby-plugin-intl"
import { Link } from "gatsby-plugin-intl"


function IndexPage({ data }){
  let [winHeight, setWinHeight] = useState(window.outerHeight);
  let [wallpaper, setWallpaper] = useState(null);
  const intl = useIntl();

  let chooseWallpaper = useCallback(() => {
    let documentHeight = document.body.offsetHeight
    let scroll = window.innerHeight + window.scrollY
    if (scroll < documentHeight * 0.6 && wallpaper !== "wall") {
      return "wall"
    } else if (scroll >= documentHeight * 0.6 && wallpaper !== "wall2") {
      return "wall2"
    }
    return wallpaper
  }, [wallpaper]);
  let resizeListener = useCallback(() => setWinHeight(window.outerHeight), [setWinHeight]);
  let scrollListener = useCallback(() => setWallpaper(chooseWallpaper()), [chooseWallpaper]);

  useEffect(() => {
    window.addEventListener("resize", resizeListener)
    window.addEventListener("scroll", scrollListener)

    if (wallpaper == null) {
      scrollListener()
    }

    return () => {
      window.removeEventListener('resize', resizeListener)
      window.removeEventListener('scroll', scrollListener)
    };
  }, [wallpaper, resizeListener, scrollListener]);

  return (
    <Layout placeholder={false}>
      {wallpaper && <GatsbyImage className="wallpaper" image={data[wallpaper].childImageSharp.gatsbyImageData} alt="wallpaper"/>}
      <section id="home" className="seethrough">
        <SEO
          lang={intl.locale}
          title={intl.formatMessage({ id: "index_title" })}
        />
        <div className="wall">
          <div className="intro container">
            <div className="main-title text-primary" style={{  height: winHeight + "px" }}>
              <div className="main-title-text">
                <svg>
                  <defs>
                    <mask id="mask" x="0" y="0" width="100%" height="100%">
                      <rect id="alpha" x="0" y="0" width="100%" height="100%"/>
                      <text id="title" x="50%" y={0 - Math.max(0,  400 - 0.5 * winHeight)} dy="1.58em" textAnchor="middle">
                        {intl.formatMessage({ id: "site_metadata_title" })}
                      </text>
                    </mask>
                    <linearGradient id="alpha-gradient" x2="0%" y2="100%">
                      <stop offset="70%" stopColor="white" />
                      <stop offset="80%" stopColor="lightgrey" />
                      <stop offset="90%" stopColor="grey" />
                      <stop offset="99%" stopColor="black" />
                    </linearGradient>
                  </defs>
                  <rect id="base" x="0" y="0" width="100%" height="100%"/>
                </svg>
              </div>
              <div className="main-title-subtext" style={{ top: -0.5 * winHeight + "px" }}>
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

      <AboutSection/>
      <PortfolioSection postsByCategory={data.allCategories.group} />
      <TechSection postsByTag={data.allTags.group} />
      <Contact />
    </Layout>
  );
}

export default IndexPage;

export const query = graphql`
    query {
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
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          group(
            field: frontmatter___category,
            limit: 1
          ) {
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
        allTags:   allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          group(
            field: frontmatter___tags,
            limit: 1
          ) {
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
`;
