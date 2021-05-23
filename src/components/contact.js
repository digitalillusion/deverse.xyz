import React from "react";
import { StaticQuery, graphql } from "gatsby";
import SocialLinks from "./sociallinks";
import "../styles/contact.less";

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};

function Contact({ contact }) {
  return (
    <section id="contact" className="container" >
      <div data-aos="fade-up">
        <div className={"row"}  >
              <div className="col s12 m6">
                <form action="https://postmail.invotes.com/send"
                      method="post" id="email_form" onSubmit={function() {
                        this.value = "Sending...";
                        this.disabled = true;
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
                    <span className="color-success">{getUrlParameter("sent") ? "Thanks for your inquiry." : ""}</span>
                    <span className="color-error">{getUrlParameter("error") ? "Please fill in all required fields." : ""}</span>
                  </div>

                  <div className="field">
                    <label className="ib" htmlFor="submit_form" >
                      <button name="submit_form" className="btn" id="submit_form" type="submit" >Send</button>
                    </label>
                  </div>
                  <p>
                    Powered by <a className="text-secondary" href="https://postmail.invotes.com" target="_blank" rel="noreferrer">PostMail</a>
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
