import React from "react";

import "../styles/list-tech.less"

function TechItem({ data, index, maxCount }) {
  let colors = [ "blue", "orange", "gold", "red", "purple", "green", "crimson", "steel", "pink", "rebecca", "gainsboro"]
  let scaleFactor = "" + Math.log( 1 + (data.totalCount / maxCount) * 4)
  return (
    <article className={`badge ${colors[index%colors.length]}`} style={{ scale: scaleFactor }} data-aos="flip-up" >
      <div className="rounded"><i className={`fab fa-${data.fieldValue}`}></i></div>
    </article>
  );
}

export default TechItem