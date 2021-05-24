import React from "react"
import RellaxWrapper from "react-rellax-wrapper"
import { FormattedMessage, Link } from "gatsby-plugin-intl"

function AboutSection() {
  return <section id="about" className="seethrough">
    <div className={'default__container'}>
      <div className={'default__wrapper'}>
        <RellaxWrapper speed={-2.05}>
          <div className="balloon" style={{ left: 400 }}>
            <Link to="/about">
              <span className="caption"><FormattedMessage id={"index_about_msg_0_caption"} /></span>
              <p className="description"><FormattedMessage id={"index_about_msg_0_label"} /></p>
            </Link>
          </div>
        </RellaxWrapper>
        <RellaxWrapper speed={1.0}>
          <div className="balloon">
            <Link to="/about">
              <span className="caption"><FormattedMessage id={"index_about_msg_1_caption"} /></span>
              <p className="description"><FormattedMessage id={"index_about_msg_1_label"} /></p>
            </Link>
          </div>
        </RellaxWrapper>
        <RellaxWrapper speed={-3.2} >
          <div className="balloon" style={{ left: -300 }}>
            <Link to="/about">
              <span className="caption"><FormattedMessage id={"index_about_msg_2_caption"} /></span>
              <p className="description"><FormattedMessage id={"index_about_msg_2_label"} /></p>
            </Link>
          </div>
        </RellaxWrapper>
      </div>
    </div>
  </section>
}



export default AboutSection;
