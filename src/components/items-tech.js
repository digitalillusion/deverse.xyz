import React from "react";

import "../styles/list-tech.less"
import Link from "./link"
import slug from "slug"
import { InlineIcon } from "@iconify/react";
import java from "@iconify/icons-simple-icons/java"
import terminal from "@iconify/icons-fa-solid/terminal"
import javascript from "@iconify/icons-simple-icons/javascript"
import typescript from "@iconify/icons-simple-icons/typescript"
import gatsby from "@iconify-icons/logos/gatsby";
import graphql from "@iconify-icons/logos/graphql";
import react from "@iconify-icons/logos/react";
import nodejs from "@iconify-icons/logos/nodejs-icon"
import docker from "@iconify-icons/logos/docker-icon"
import rust from "@iconify/icons-simple-icons/rust";
import android from "@iconify-icons/logos/android-icon";
import godotengine from "@iconify/icons-simple-icons/godotengine";
import kotlin from "@iconify-icons/logos/kotlin";
import postgresql from "@iconify-icons/logos/postgresql";
import heroku from "@iconify-icons/logos/heroku-icon";
import cassandra from "@iconify-icons/logos/cassandra";
import gcp from "@iconify/icons-cib/google-cloud";
import angular from "@iconify-icons/logos/angular-icon";
import { useIntl } from "gatsby-plugin-intl";

export const technologies = {
  'java' : {
    color: 'gainsboro',
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
  'gatsby' : {
    color: 'purple',
    name: 'Gatsby',
    icon: gatsby
  },
  'graphql' : {
    color: 'pink',
    name: 'GraphQL',
    icon: graphql
  },
  'react' : {
    color: 'aqua',
    name: 'React',
    icon: react
  },
  'angular' : {
    color: 'cinder',
    name: 'Angular',
    icon: angular
  },
  'nodejs' : {
    color: 'darkgreen',
    name: 'Node.js',
    icon: nodejs
  },
  'docker' : {
    color: 'blue',
    name: 'Docker',
    icon: docker
  },
  'godot-engine' : {
    color: 'royalblue',
    name: 'Godot Engine',
    icon: godotengine
  },
  'rust' : {
    color: 'crimson',
    name: 'Rust',
    icon: rust
  },
  'android' : {
    color: 'green',
    name: 'Android',
    icon: android
  },
  'kotlin' : {
    color: 'red',
    name: 'Kotlin',
    icon: kotlin
  },
  'postgresql' : {
    color: 'rebecca',
    name: 'PostgreSQL',
    icon: postgresql
  },
  'cassandra' : {
    color: 'gray',
    name: 'Cassandra',
    icon: cassandra
  },
  'heroku' : {
    color: 'darkblue',
    name: 'Heroku',
    icon: heroku
  },
  'google-cloud-platform' : {
    color: 'sand',
    name: 'Google Cloud Platform',
    icon: gcp
  }
}

function TechItem({ data, maxCount, icon = false }) {
  const intl = useIntl();
  let tech = {
    color: 'steel',
    name: 'Other',
    icon: terminal
  }
  if (technologies[data.fieldValue]) {
    tech = technologies[data.fieldValue];
  }

  if (icon) {
    return <article className={`badge badge-icon ${tech.color}`} >
      <Link to={`/technologies/${slug(tech.name)}`} title={tech.name} aria-label={tech.name} style={{ color : "inherit" }}>
          <div className="rounded"><InlineIcon icon={tech.icon}/></div>
      </Link>
    </article>
  }

  const tagPopup = data.totalCount === 1 ?
    intl.formatMessage({ id : 'technology_using_one'}, { 0: tech.name }) :
    intl.formatMessage({ id : 'technology_using_many'}, { 0: tech.name, 1: data.totalCount });

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
        {tagPopup}
      </div>
    </span>
  );
}

export default TechItem