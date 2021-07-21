import React, { createRef, useEffect, useState } from "react";
import { init, sendForm } from "emailjs-com";
import "../styles/contact.less";
import SocialLinks from "./sociallinks";
import { FormattedMessage, useIntl } from "gatsby-plugin-intl";

export default () => {
  init("user_FJytP23RSN3LXSJA6gPJa");

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
      if (window.grecaptcha && window.grecaptcha.render && captchaRef.current && captchaRef.current.innerHTML === "") {
        window.grecaptcha.render(captchaRef.current, {
          "sitekey": "6Lc4ARgbAAAAABiBU4OerSf_X_m4iVeZzj7J_Uaa",
          "hl": intl.locale
        });
      } else {
        setTimeout(renderCaptcha, 100)
      }
    }
    renderCaptcha()
  }, [captchaRef, intl])

  return (
    <section id="contact" className="container" >
      <div data-aos="fade-up">
        <div className={"row"}  >
              <div className="col s12 m6">
                <form id="email_form" autoComplete="off" ref={formRef} onSubmit={event => {
                  event.preventDefault();

                  function performSubmit(resultCode) {
                    setSubmitted(resultCode)
                    setTimeout(() => {
                      setSubmitted(0)
                    }, 2000)
                  }

                  if (!isCookiePolicyAccepted()) {
                    performSubmit(-2)
                  } else {
                    sendForm('service_ht0g628', 'template_2ji6njb', formRef.current)
                      .then(() => {
                        formRef.current.reset()
                        window.grecaptcha.reset()
                        performSubmit(1)
                      }, () => performSubmit(-1));
                  }
                }}>

                  <div className="field">
                    <div className="input-border">
                      <input className="field-box" type="text" name="reply_to" placeholder={intl.formatMessage({ id: "index_contact_from" })} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="input-border">
                      <input  className="field-box" type="text" name="subject" placeholder={intl.formatMessage({ id: "index_contact_subject" })} />
                    </div>
                  </div>
                  <div className="input-border">
                    <textarea className="field-box" name="message" placeholder={intl.formatMessage({ id: "index_contact_message" })} required/>
                  </div>
                  <div className="field">
                    {isCookiePolicyAccepted() && <div className="captcha" ref={captchaRef} />}
                    {isSubmitted === 0 && <label className="ib" htmlFor="submit_form" >
                      <button name="submit_form" className="btn" id="submit_form" type="submit" >{intl.formatMessage({ id: "index_contact_send" })}</button>
                    </label>}
                    {isSubmitted === 1 && <span className="color-success"><FormattedMessage id={"index_contact_success"} /></span>}
                    {isSubmitted === -1 && <span className="color-error"><FormattedMessage id={"index_contact_fail"} /></span>}
                    {isSubmitted === -2 && <span className="color-error"><FormattedMessage id={"index_contact_fail_cookiepolicy"} /></span>}
                  </div>
                  <p className="powered-by">
                    Powered by <a className="text-secondary" href="https://www.emailjs.com/" target="_blank" rel="noreferrer">emailjs</a>
                  </p>
                </form>
              </div>
            <div
                className={"col s12 m6 details"}
            >
              <p className="text-tertiary">
                <FormattedMessage id={"index_contact_intro"} />
              </p>
                <ul>
                    <li>
                        <SocialLinks />
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </section>
  )
}