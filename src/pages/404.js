import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import GlobalHead from "../components/head"
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl"

const NotFoundPage = () => {
  return (
    <Layout>

      <section className="row">
        <h3>Not Found</h3>
        <div>You just hit a route that doesn&#39;t exist... the sadness.</div>
      </section>
    </Layout>
  )
}
export const Head = ({ pageContext }) => {
  const intl = createIntl(
    {
      locale: pageContext.intl.language,
      messages: pageContext.intl.messages,
    },
    createIntlCache()
  )
  return (
    <RawIntlProvider value={intl}>
      <GlobalHead />
      <Seo title="404: Not Found" />
    </RawIntlProvider>
  )
}

export default NotFoundPage
