import React from "react";

import "../styles/list-tech.less"
import Link from "./link"
import slug from "slug"
import { InlineIcon } from "@iconify/react";
import java from "@iconify/icons-simple-icons/java"
import terminal from "@iconify/icons-fa-solid/terminal"
import javascript from "@iconify/icons-simple-icons/javascript"
import typescript from "@iconify/icons-simple-icons/typescript"

let colors = [ "blue", "orange", "gold", "red", "purple", "green", "crimson", "steel", "pink", "rebecca", "gainsboro"]

const techhnologies = {
  'java' : {
    color: 'blue',
    name: 'Java',
    icon: java
  },
  'javascript' : {
    color: 'orange',
    name: 'Javascript',
    icon: javascript
  },
  'typescript' : {
    color: 'gold',
    name: 'Typescript',
    icon: typescript
  },
}

function TechItem({ data, maxCount, icon = false }) {
  let tech = {
    color: 'steel',
    name: 'Other',
    icon: terminal
  }
  if (techhnologies[data.fieldValue]) {
    tech = techhnologies[data.fieldValue];
  }

  if (icon) {
    return <article className={`badge badge-icon ${tech.color}`} >
      <Link to={`/technologies/${slug(tech.name)}`} title={tech.name} aria-label={tech.name} style={{ color : "inherit" }}>
          <div className="rounded"><InlineIcon icon={tech.icon}/></div>
      </Link>
    </article>
  }

  let scaleFactor = "" + Math.log( 1 + (data.totalCount / maxCount) * 4)
  return (
    <span className="tooltip" data-direction="bottom">
      <span className="tooltip__initiator">
        <article className={`badge ${tech.color}`} style={{ scale: scaleFactor }} data-aos="flip-up" >
          <Link to={`/technologies/${slug(tech.name)}`} title={tech.name} aria-label={tech.name} style={{ color : "inherit" }}>
              <div className="rounded"><InlineIcon icon={tech.icon}/></div>
          </Link>
        </article>
      </span>
      <div className="tooltip__item">
        Using {tech.name} in {data.totalCount} {data.totalCount === 1 ? "project" :  "projects" }.
      </div>
    </span>
  );
}

export default TechItem