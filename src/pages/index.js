import React, { useCallback, useEffect, useRef, useState } from "react"
import AOS from "aos"
import Layout from "../components/layout"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import GlobalHead from "../components/head"
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl"
import SocialLinks from "../components/sociallinks"
import AboutSection from "../components/about"
import PortfolioSection from "../components/portfolio"
import TechSection from "../components/tech"
import Contact from "../components/contact"
import { GatsbyImage } from "gatsby-plugin-image"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { isSmallScreen } from "../utils/functions"

function IndexPage({ data }) {
  const intl = useIntl()

  useEffect(() => {
    const aosTimer = setTimeout(() => {
      AOS.refresh()
    }, 1000)

    return () => {
      clearTimeout(aosTimer)
    }
  }, [])



  return (
    <Layout placeholder={false}>
      <section id="home" className="main-title v2">
        <div className="hero-content" data-aos="fade-up" data-aos-duration="1200">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <FormattedMessage id="index_intro_tag" />
            <span className="badge-dot badge-dot-right"></span>
          </div>
          <h1 className="hero-headline">
            {intl.formatMessage({ id: "site_metadata_title" })}
          </h1>
          <p className="hero-description">
            <FormattedMessage id="index_intro_description" />
          </p>
          <div className="hero-social">
            <SocialLinks />
          </div>
          <div className="cta-group">
            <Link to="/#contact" className="btn secondary">
              <FormattedMessage id="navlinks_contact" />
            </Link>
            <Link to="/#portfolio" className="btn primary glow">
              <FormattedMessage id="index_intro_works" />
            </Link>
          </div>
        </div>
        <div className="scroll-indicator-v2">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>


      <div className="home">
        <AboutSection />
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
      sort: { frontmatter: { date: DESC } }
    ) {
      group(field: {frontmatter: {category: SELECT}}, limit: 1) {
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
      sort: { frontmatter: { date: DESC } }
    ) {
      group(field: {frontmatter: {tags: SELECT}}, limit: 1) {
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

export const Head = ({ pageContext }) => {
  const intl = createIntl(
    {
      locale: pageContext.intl.language,
      messages: pageContext.intl.messages,
    },
    createIntlCache()
  )
  return (
    <RawIntlProvider value={intl}>
      <GlobalHead />
      <Seo title={intl.formatMessage({ id: "index_title" })} />
    </RawIntlProvider>
  )
}
