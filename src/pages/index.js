import React, { useState } from "react"
import Layout from "../components/layout";
import { graphql } from "gatsby";
import SEO from "../components/seo"
import SocialLinks from "../components/sociallinks";
import "../styles/wall.less";
import { AnchorLink } from "gatsby-plugin-anchor-links"
import AboutSection from "../components/about"
import PortfolioSection from "../components/portfolio"
import TechSection from "../components/tech"
import Contact from "../components/contact"
import { GatsbyImage } from "gatsby-plugin-image"

function IndexPage({ data }){
  const siteMetadata = data.site.siteMetadata
  let [winHeight, setWinHeight] = useState(window.outerHeight);
  let [wallpaper, setWallpaper] = useState(null);

  function chooseWallpaper() {
    let documentHeight = document.body.offsetHeight
    let scroll = window.innerHeight + window.scrollY
    if (scroll < documentHeight * 0.6 && wallpaper !== "wall") {
      return "wall"
    } else if (scroll >= documentHeight * 0.6 && wallpaper !== "wall2") {
      return "wall2"
    }
    return wallpaper
  }

  window.requestAnimationFrame(function() {
    window.addEventListener("resize", function() {
      setWinHeight(window.outerHeight)
    })
    window.addEventListener("scroll", function() {
      setWallpaper(chooseWallpaper())
    })
    if (wallpaper == null) {
      setTimeout(() => setWallpaper(chooseWallpaper()), 100)
    }
  })

  return (
    <Layout placeholder={false}>
      {wallpaper && <GatsbyImage className="wallpaper" image={data[wallpaper].childImageSharp.gatsbyImageData} alt="wallpaper"/>}
      <section id="home" className="seethrough">
        <SEO
          lang="en"
          title="Home page"
        />
        <div className="wall">
          <div className="intro container">
            <div className="main-title text-primary" style={{  height: winHeight + "px" }}>
              <div className="main-title-text">
                <svg>
                  <defs>
                    <mask id="mask" x="0" y="0" width="100%" height="100%">
                      <rect id="alpha" x="0" y="0" width="100%" height="100%"/>
                      <text id="title" x="50%" y={0 - Math.max(0,  400 - 0.5 * winHeight)} dy="1.58em" text-anchor="middle">
                        {siteMetadata.title}
                      </text>
                    </mask>
                    <linearGradient id="alpha-gradient" x2="0%" y2="100%">
                      <stop offset="70%" stop-color="white" />
                      <stop offset="80%" stop-color="lightgrey" />
                      <stop offset="90%" stop-color="grey" />
                      <stop offset="99%" stop-color="black" />
                    </linearGradient>
                  </defs>
                  <rect id="base" x="0" y="0" width="100%" height="100%"/>
                </svg>
              </div>
              <div className="main-title-subtext" style={{ top: -0.5 * winHeight + "px" }}>
                <p className="tag-line text-secondary">
                  {siteMetadata.introTag}
                </p>
                <p className="caption text-tertiary">
                  {siteMetadata.description}
                </p>
                <AnchorLink to="/#portfolio" className="btn">
                  SEE WORKS
                </AnchorLink>
              </div>
            </div>
          </div>
          <div className="social-buttons">
            <SocialLinks />
          </div>
        </div>
      </section>

      <AboutSection messages={siteMetadata.aboutMessages}/>
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
                title
                capitalizeTitleOnHome
                introTag
                description
                social {
                    name
                    url
                    icon
                }
                aboutMessages {
                  caption
                  label
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
                  description,
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
