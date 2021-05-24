import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { init, sendForm } from "emailjs-com"
import "../styles/contact.less";
import SocialLinks from "./sociallinks";

function Contact({ contact }) {
  init("user_FJytP23RSN3LXSJA6gPJa");

  return (
    <section id="contact" className="container" >
      <div data-aos="fade-up">
        <div className={"row"}  >
              <div className="col s12 m6">
                <form action="https://postmail.invotes.com/send"
                      method="post" id="email_form" onSubmit={event => {
                  event.preventDefault();
                  this.contact_number.value = Math.random() * 100000 | 0;
                  sendForm('service_ht0g628', 'template_2ji6njb', this)
                    .then(function() {
                      console.log('SUCCESS!');
                    }, function(error) {
                      console.log('FAILED...', error);
                    });
                }}>

                  <div className="field">
                    <div className="input-border">
                      <input className="field-box" type="text" name="reply_to" placeholder="Your Email" />
                    </div>
                  </div>
                  <div className="field">
                    <div className="input-border">
                      <input  className="field-box" type="text" name="subject" placeholder="Subject" />
                    </div>
                  </div>
                  <div className="input-border">
                    <textarea className="field-box" name="text" placeholder="Message"/>
                  </div>
                  <input type="hidden" name="access_token" value="a73kobmjq7nnwo2plw7ofl56" />
                  <input type="hidden" name="success_url" value="/?sent#contact" />
                  <input type="hidden" name="error_url" value="/?error#contact" />
                  <div>
                    <span className="color-success">{ "Thanks for your inquiry."}</span>
                    <span className="color-error">{"Please fill in all required fields."}</span>
                  </div>
                  <div className="field">
                    <div className="g-recaptcha" data-sitekey="6Lc3eg8bAAAAAPFnTyw5ahAoZJqHUzVfQfnqMytX"/>
                    <label className="ib" htmlFor="submit_form" >
                      <button name="submit_form" className="btn" id="submit_form" type="submit" >Send</button>
                    </label>
                  </div>
                  <p className="powered-by">
                    Powered by <a className="text-secondary" href="https://www.emailjs.com/" target="_blank" rel="noreferrer">emailjs</a>
                  </p>
                </form>
              </div>
            <div
                className={"col s12 m6 details"}
            >
                {contact.description && (
                    <p className="text-tertiary">
                        {contact.description}
                    </p>
                )}
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

export default () => (
    <StaticQuery
        query={graphql`
            query {
                site {
                    siteMetadata {
                        contact {
                            description
                        }
                    }
                }
            }
        `}
        render={data => <Contact contact={data.site.siteMetadata.contact} />}
    />
);
