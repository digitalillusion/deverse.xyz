import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import GlobalHead from "../components/head"
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl"
import Layout from "../components/layout"

export default function Page({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>

      <section id={frontmatter.slug} className="page-template row flex">
        <div className="container">
          <h3>{frontmatter.title}</h3>
          <div className="page" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($slug: String!, $language: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug }, language: { eq: $language } }
    ) {
      html
      frontmatter {
        title
        slug
      }
    }
  }
`

export const Head = ({ data, pageContext }) => {
  const intl = createIntl(
    {
      locale: pageContext.intl.language,
      messages: pageContext.intl.messages,
    },
    createIntlCache()
  )
  const { markdownRemark } = data
  const { frontmatter } = markdownRemark
  return (
    <RawIntlProvider value={intl}>
      <GlobalHead />
      <Seo title={frontmatter.title} />
    </RawIntlProvider>
  )
}
