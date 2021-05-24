import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container } from "react-bootstrap"
import React from "react"
import { graphql } from "gatsby"
import { Mapmarker } from "../components/icons";
import { GatsbyImage } from "gatsby-plugin-image"
import { FormattedMessage } from "gatsby-plugin-intl"

const About = ({ data }) => {
  return (
    <Layout>
      <div className="about-container">
        <SEO title={`About deverse.xyz`} />

        <section id="about" className="container">
          <Container>
            <div className="row flex">
              <div className="col m6 image" data-aos="flip-left">
                <GatsbyImage image={data.profilePic.childImageSharp.gatsbyImageData} alt={data.site.siteMetadata.title}/>
              </div>
              <div className="col m6 vcenter" data-aos="fade-down">
                <p>
                  Hello visitor, welcome to my portfolio website.
                </p>
                <p>
                  I'm Adriano, a senior and passionate developer with several years of experience in the IT industry.
                </p>
                <p>
                  I've moved on to a freelance career in order to work as contractor and to progress on personal projects as well.
                </p>
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
    site {
        siteMetadata {
          title
          contact {
              address
          }
        }
    }
  }
`

export default About