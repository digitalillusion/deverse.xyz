import React, { createRef, useEffect, useState } from "react"
import AOS from "aos"
import { init, sendForm } from "@emailjs/browser"
import "../styles/contact.less"
import SocialLinks from "./sociallinks"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

const Contact = () => {
  init("user_FJytP23RSN3LXSJA6gPJa")

  let intl = useIntl()
  let captchaRef = createRef()
  let formRef = createRef()
  let [isSubmitted, setSubmitted] = useState(0)

  function isCookiePolicyAccepted() {
    if (typeof window == "undefined") {
      return true
    }
    return !!window.gaGlobal
  }

  useEffect(() => {
    function renderCaptcha() {
      if (typeof window == "undefined") {
        return
      }
      if (
        window.grecaptcha &&
        window.grecaptcha.render &&
        captchaRef.current &&
        captchaRef.current.innerHTML === ""
      ) {
        window.grecaptcha.render(captchaRef.current, {
          sitekey: "6Lc4ARgbAAAAABiBU4OerSf_X_m4iVeZzj7J_Uaa",
          hl: intl.locale,
        })
      } else {
        setTimeout(renderCaptcha, 100)
      }
    }
    renderCaptcha()
  }, [captchaRef, intl])

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])


  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">
          <FormattedMessage id="navlinks_contact" />
        </h2>
        
        <div className="contact-grid">
          <div className="contact-info" data-aos="fade-right">
            <h3 className="card-title">
              <FormattedMessage id="index_contact_intro" />
            </h3>
            <div className="social-wrapper">
              <SocialLinks />
            </div>
          </div>

          <div className="contact-form-wrapper glass-card" data-aos="fade-left">
            <form
              id="email_form"
              autoComplete="off"
              ref={formRef}
              onSubmit={event => {
                event.preventDefault()
                function performSubmit(resultCode) {
                  setSubmitted(resultCode)
                  setTimeout(() => setSubmitted(0), 4000)
                }

                if (!isCookiePolicyAccepted()) {
                  performSubmit(-2)
                } else {
                  sendForm("service_ht0g628", "template_2ji6njb", formRef.current)
                    .then(() => {
                      formRef.current.reset()
                      window.grecaptcha.reset()
                      performSubmit(1)
                    }, () => performSubmit(-1))
                }
              }}
            >
              <div className="form-group">
                <input
                  className="form-input"
                  type="email"
                  name="reply_to"
                  placeholder={intl.formatMessage({ id: "index_contact_from" })}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-input"
                  type="text"
                  name="subject"
                  placeholder={intl.formatMessage({ id: "index_contact_subject" })}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-input"
                  name="message"
                  rows="5"
                  placeholder={intl.formatMessage({ id: "index_contact_message" })}
                  required
                />
              </div>

              <div className="form-footer">
                {isCookiePolicyAccepted() && <div className="captcha" ref={captchaRef} />}
                
                <div className="submit-area">
                  {isSubmitted === 0 && (
                    <button className="btn primary w-full" type="submit">
                      {intl.formatMessage({ id: "index_contact_send" })}
                    </button>
                  )}
                  {isSubmitted === 1 && (
                    <div className="status-msg success">
                      <FormattedMessage id="index_contact_success" />
                    </div>
                  )}
                  {isSubmitted < 0 && (
                    <div className="status-msg error">
                      <FormattedMessage id={isSubmitted === -1 ? "index_contact_fail" : "index_contact_fail_cookiepolicy"} />
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Contact
