import React from "react"
import RellaxWrapper from "react-rellax-wrapper"



function AboutSection({ messages }) {
  return <section id="about">
    <div className={'default__containe  r'}>
      <div className={'default__wrapper'}>
        <RellaxWrapper speed={-2}>
          <div className="balloon">
            <span className="caption">{messages[0].caption}</span>
            <p className="description">{messages[0].label}</p>
          </div>
        </RellaxWrapper>
        <RellaxWrapper speed={1.2}>
          <div className="balloon">
            <span className="caption">{messages[1].caption}</span>
            <p className="description">{messages[1].label}</p>
          </div>
        </RellaxWrapper>
        <RellaxWrapper speed={-4} >
          <div className="balloon">
            <span className="caption">{messages[2].caption}</span>
            <p className="description">{messages[2].label}</p>
          </div>
        </RellaxWrapper>
      </div>
    </div>
  </section>
}



export default AboutSection;
