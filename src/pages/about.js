import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container } from "react-bootstrap"
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image/index"
import { Mapmarker } from "../components/icons";

const About = ({ data }) => {
  return (
    <Layout>
      <div className="category-container">
        <SEO title={`About deverse.xyz`} />

        <section id="about" className="container">
          <Container>
            <div className="row flex">
              <div className="col m6 image" data-aos="flip-left">
                <Img fluid={
                  data.profilePic.childImageSharp.fluid
                } />
              </div>
              <div className="col m6 vcenter" data-aos="fade-down">
                <p>
                  Hello, welcome to my portfolio website.
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
              {data.site.siteMetadata.title}
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
        fluid (quality: 100, maxWidth: 350) {
          ...GatsbyImageSharpFluid
        }
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