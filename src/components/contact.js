import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Mapmarker } from "./icons";
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
                <span className="color-error">{getUrlParameter("pm_err")}</span>
                <span className="color-success">{getUrlParameter("pm_suc")}</span>
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
                    <textarea className="field-box" name="text" placeholder="Message"></textarea>
                  </div>
                  <input type="hidden" name="access_token" value="a73kobmjq7nnwo2plw7ofl56" />
                  <input type="hidden" name="success_url" value="/?error=0&pm_suc=Thanks for your inquiry." />
                  <input type="hidden" name="error_url" value="/?error=1" />


                  <div className="field">
                    <label className="ib">
                      <button className="btn" id="submit_form" type="submit" >Send</button>
                    </label>
                  </div>
                  <p>Powered by <a href="https://postmail.invotes.com" target="_blank">PostMail</a></p>
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
                    {contact.address && (
                        <li
                            className="text-tertiary item"
                            style={{ whiteSpace: "pre" }}
                        >
                            <span className="icon">
                                <Mapmarker />
                            </span>
                            {contact.address}
                        </li>
                    )}
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
                            address
                        }
                    }
                }
            }
        `}
        render={data => <Contact contact={data.site.siteMetadata.contact} />}
    />
);
