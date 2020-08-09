import React from "react";
import BlogList from "gatsby-theme-elemental/src/components/list-blog";

export default function() {
    return (
      <section id="blog">
        <div data-aos="fade-up">
            <BlogList />
        </div>
      </section>
    );
}
