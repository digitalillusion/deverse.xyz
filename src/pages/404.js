import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <section className="row">
        <h3>Not Found</h3>
        <div>You just hit a route that doesn&#39;t exist... the sadness.</div>
      </section>
    </Layout>
  )
}

export default NotFoundPage
