import React, { useState } from "react"
import Layout from "gatsby-theme-elemental/src/components/layout";
import { graphql } from "gatsby";
import SEO from "gatsby-theme-elemental/src/components/seo";
import SocialLinks from "gatsby-theme-elemental/src/components/sociallinks";
import PortfolioList from "gatsby-theme-elemental/src/components/list-portfolio";
import BlogList from "gatsby-theme-elemental/src/components/list-blog";
import Contact from "gatsby-theme-elemental/src/components/contact";
import "gatsby-theme-elemental/src/style/wall.less";
import { AnchorLink } from "gatsby-plugin-anchor-links"
import AboutSection from "../components/about"

function IndexPage({ data }){
  const siteMetadata = data.site.siteMetadata
  let [winHeight, setWinHeight] = useState(window.outerHeight);
  window.addEventListener("resize", function() {
    setWinHeight(window.outerHeight)
  });
  return (
    <Layout placeholder={false}>
      <div id="wallpaper" style={{ height: winHeight + "px" }} />
      <section id="home">
        <SEO
          lang="en"
          title={siteMetadata.title}
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
                      <stop offset="100%" stop-color="black" />
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
      <PortfolioList />
      <BlogList />
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
                titleImage
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
    }
`;
