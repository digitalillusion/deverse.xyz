import React from "react"

import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

const About = () => {
  const intl = useIntl()
  return (
    <section id="about" className="alternate">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">
            {intl.formatMessage({
              id: "index_about_title",
              defaultMessage: "Building for Scale, Speed, and Impact",
            })}
          </h2>
        </div>

        <div className="expertise-grid">
          <div className="glass-card" data-aos="fade-right" data-aos-delay="100">
            <h3 className="card-title">
              <FormattedMessage id="index_about_msg_0_caption" />
            </h3>
            <p className="card-text">
              <FormattedMessage id="index_about_msg_0_label" />
            </p>
          </div>
          <div className="glass-card" data-aos="fade-up" data-aos-delay="200">
            <h3 className="card-title">
              <FormattedMessage id="index_about_msg_1_caption" />
            </h3>
            <p className="card-text">
              <FormattedMessage id="index_about_msg_1_label" />
            </p>
          </div>
          <div className="glass-card" data-aos="fade-left" data-aos-delay="300">
            <h3 className="card-title">
              <FormattedMessage id="index_about_msg_2_caption" />
            </h3>
            <p className="card-text">
              <FormattedMessage id="index_about_msg_2_label" />
            </p>
          </div>
        </div>
      </div>
    </section>

  )
}

export default About
