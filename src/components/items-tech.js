import React from "react";

import "../styles/list-tech.less"

function TechItem({ data, index, maxCount }) {
  let colors = [ "blue", "orange", "gold", "red", "purple", "green", "crimson", "steel", "pink", "rebecca", "gainsboro"]
  let scaleFactor = "" + Math.log( 1 + (data.totalCount / maxCount) * 4)

  function getTechName(str) {
    const [, ...match] = str.match(/([a-z\d]*)([\s\S]*)/);
    return match[0];
  }

  return (
    <span className="tooltip" data-direction="bottom">
      <span className="tooltip__initiator">
        <article className={`badge ${colors[index%colors.length]}`} style={{ scale: scaleFactor }} data-aos="flip-up" >
          <div className="rounded"><i className={`fab fa-${data.fieldValue}`}></i></div>
        </article>
      </span>
      <div className="tooltip__item">
        Using {getTechName(data.fieldValue)} in {data.totalCount} {data.totalCount === 1 ? "project" :  "projects" }.
      </div>
    </span>
  );
}

export default TechItem