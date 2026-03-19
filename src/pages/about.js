import Layout from "../components/layout"
import Seo from "../components/seo"
import GlobalHead from "../components/head"
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl"
import { Container } from "react-bootstrap"
import React, { useEffect } from "react"
import AOS from "aos"
import { graphql } from "gatsby"
import { Mapmarker } from "../components/icons"
import { GatsbyImage } from "gatsby-plugin-image"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"
import filepdf from "@iconify/icons-fa-solid/file-pdf"
import { Icon } from "@iconify/react"
import { isSmallScreen } from "../utils/functions"

const About = ({ data }) => {
  let intl = useIntl()

  useEffect(() => {
    // Refresh AOS with a delay to account for PDF/Image loading that might shift elements
    const timer = setTimeout(() => {
      AOS.refresh()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Layout>
      <div className="about-page">
        <section className="container section-padding">
          <div className="about-grid">
            <div className="about-image-wrapper" data-aos="fade-right">
              <div className="glass-card photo-card">
                <GatsbyImage 
                  className="about-photo"
                  image={data.profilePic.childImageSharp.gatsbyImageData}
                  alt={intl.formatMessage({ id: "site_metadata_title" })}
                />
              </div>
            </div>
            
            <div className="about-content-wrapper" data-aos="fade-left">
              <h1 className="section-title text-left">
                <FormattedMessage id="about_title" />
              </h1>
              <div 
                className="about-text" 
                dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: "about_intro" }) }} 
              />
              
              <div className="about-meta">
                <div className="meta-item">
                  <span className="icon"><Mapmarker /></span>
                  <FormattedMessage id="about_position" />
                </div>
              </div>

              <div className="cta-group left">
                <a 
                  href={data.resume.publicURL} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn primary"
                >
                  <Icon icon={filepdf} className="btn-icon" />
                  <FormattedMessage id="index_intro_download_cv" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>

  )
}

export const pageQuery = graphql`
  query AboutPage {
    profilePic: file(relativePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    resume: file(relativePath: { regex: "/deverse_cv_en.pdf/" }) {
      publicURL
    }
  }
`

export default About

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
      <Seo title={intl.formatMessage({ id: "about_title" })} />
    </RawIntlProvider>
  )
}
