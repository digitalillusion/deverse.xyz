import React from "react"
import RellaxWrapper from "react-rellax-wrapper"
import { FormattedMessage, Link } from "gatsby-plugin-intl"
import { isSmallScreen } from "../utils/functions"

const About = ({ width }) => {
  return (
    <section id="about" className="seethrough" key={width}>
      <div className={"default__container"} style={{ width: width }}>
        <div className={"default__wrapper"}>
          <RellaxWrapper speed={isSmallScreen() ? -1.025 : -2.05}>
            <div className="balloon" style={{ left: width * 0.5 }}>
              <Link to="/about">
                <span className="caption">
                  <FormattedMessage id={"index_about_msg_0_caption"} />
                </span>
                <p className="description">
                  <FormattedMessage id={"index_about_msg_0_label"} />
                </p>
              </Link>
            </div>
          </RellaxWrapper>
          <RellaxWrapper speed={isSmallScreen() ? 1.1 : 2.2}>
            <div className="balloon">
              <Link to="/about">
                <span className="caption">
                  <FormattedMessage id={"index_about_msg_1_caption"} />
                </span>
                <p className="description">
                  <FormattedMessage id={"index_about_msg_1_label"} />
                </p>
              </Link>
            </div>
          </RellaxWrapper>
          <RellaxWrapper speed={isSmallScreen() ? -0.1 : -0.2}>
            <div className="balloon" style={{ left: -width * 0.45 }}>
              <Link to="/about">
                <span className="caption">
                  <FormattedMessage id={"index_about_msg_2_caption"} />
                </span>
                <p className="description">
                  <FormattedMessage id={"index_about_msg_2_label"} />
                </p>
              </Link>
            </div>
          </RellaxWrapper>
        </div>
      </div>
    </section>
  )
}

export default About
