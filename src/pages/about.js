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
      <div className="about-container">


        <section id="about" className="container">
          <Container>
            <div className="row flex">
              <div className="col m6 image" data-aos="flip-left">
                <GatsbyImage className="about-photo"
                  image={data.profilePic.childImageSharp.gatsbyImageData}
                  alt={intl.formatMessage({ id: "site_metadata_title" })}
                />
              </div>
              <div className="col m6 vcenter">
                <div className="about-intro" data-aos="fade-down" data-aos-offset="50"
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({ id: "about_intro" }),
                  }}
                />
                <div className="details" data-aos="fade-up" data-aos-offset="-50">
                  <ul>
                    <li className="text-tertiary item">
                      <span className="icon">
                        <Mapmarker />
                      </span>
                      <FormattedMessage id={"about_position"} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {!isSmallScreen() && (
              <div className="row flex">
                <div className="col m6 hcenter" data-aos="zoom-in">
                  <embed
                    src={data.resume.publicURL}
                    width="1060"
                    height="1400"
                    type="application/pdf"
                  />
                </div>
              </div>
            )}
            {isSmallScreen() && (
              <div className="row flex">
                <a
                  className="download-resume"
                  href={data.resume.publicURL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon icon={filepdf} color="#6888DF" />
                </a>
              </div>
            )}
            <div className="main-title-text">
              <FormattedMessage id={"site_metadata_title"} />
            </div>
          </Container>
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
    resume: file(relativePath: { regex: "/adriano_dalpane_cv_en.pdf/" }) {
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
