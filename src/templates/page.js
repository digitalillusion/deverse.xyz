import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import Layout from "../components/layout";

export default function Page({ data}) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
        <section id={frontmatter.slug} className="row flex">
          <h3>{frontmatter.title}</h3>
          <div className="page" dangerouslySetInnerHTML={{ __html: html }} />
        </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $language: String!) {
    markdownRemark(fields: { slug: { eq: $slug }, language: { eq: $language } }) {
      html
      frontmatter {
        title
        slug
      }
    }
  }
`