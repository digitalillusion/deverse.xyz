import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container } from "react-bootstrap"
import React from "react"
import { graphql } from "gatsby"
import { Mapmarker } from "../components/icons";
import { GatsbyImage } from "gatsby-plugin-image"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

const About = ({ data }) => {
  let intl = useIntl();
  return (
    <Layout>
      <div className="about-container">
        <SEO title={intl.formatMessage({ id: "about_title" })} />

        <section id="about" className="container">
          <Container>
            <div className="row flex">
              <div className="col m6 image" data-aos="flip-left">
                <GatsbyImage image={data.profilePic.childImageSharp.gatsbyImageData} alt={intl.formatMessage({ id: "site_metadata_title" })}/>
              </div>
              <div className="col m6 vcenter" data-aos="fade-down">
                <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id : 'about_intro' }) }} />
                <div className="details" data-aos="fade-up">
                  <ul>
                    {data.site.siteMetadata.contact.address && (
                      <li className="text-tertiary item" >
                              <span className="icon">
                                  <Mapmarker />
                              </span>
                        {data.site.siteMetadata.contact.address}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="row flex">
              <div className="col m6 hcenter" data-aos="zoom-in">
                <embed src={data.resume.publicURL} width="1060" height="1400" type="application/pdf" />
              </div>
            </div>
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
    resume: file(relativePath: { regex: "/adriano_dalpane_resume_en.pdf/" }) {
      publicURL
    }
    site {
        siteMetadata {
          contact {
              address
          }
        }
    }
  }
`

export default About