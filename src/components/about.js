import React from "react"
import RellaxWrapper from "react-rellax-wrapper"
import { graphql, useStaticQuery } from "gatsby"



function AboutSection() {
  const data = useStaticQuery(graphql`
      query {
          site {
              siteMetadata {
                  aboutMessages {
                    caption
                    label
                  }
              }
          }
      }
  `)
  const messages = data.site.siteMetadata.aboutMessages

  return <section id="about" className="seethrough">
    <div className={'default__container'}>
      <div className={'default__wrapper'}>
        <RellaxWrapper speed={-2.05}>
          <div className="balloon" style={{ left: 400 }}>
            <a href="/about">
              <span className="caption">{messages[0].caption}</span>
              <p className="description">{messages[0].label}</p>
            </a>
          </div>
        </RellaxWrapper>
        <RellaxWrapper speed={1.0}>
          <div className="balloon">
            <a href="/about">
              <span className="caption">{messages[1].caption}</span>
              <p className="description">{messages[1].label}</p>
            </a>
          </div>
        </RellaxWrapper>
        <RellaxWrapper speed={-3.2} >
          <div className="balloon" style={{ left: -300 }}>
            <a href="/about">
              <span className="caption">{messages[2].caption}</span>
              <p className="description">{messages[2].label}</p>
            </a>
          </div>
        </RellaxWrapper>
      </div>
    </div>
  </section>
}



export default AboutSection;
