import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import SectionTitle from "../components/sectiontitle"
import { Container } from "react-bootstrap"
import PortfolioItem from "../components/items-portfolio"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl";
import { technologies } from "../components/items-tech";

const Technology = ({ pageContext, data }) => {
  const { tag } = pageContext
  const intl = useIntl();
  const { edges, totalCount } = data.allMarkdownRemark;

  const tagHeader = totalCount === 1 ?
    intl.formatMessage({ id : 'technology_using_one'}, { 0: technologies[tag].name }) :
    intl.formatMessage({ id : 'technology_using_many'}, { 0: technologies[tag].name, 1: totalCount });
  return (
    <Layout>
      <div className="category-container">
        <SEO title={tagHeader} />
        <section id="technologies" className="container">
          <SectionTitle title={tagHeader} />
          <Container>
            <header>
              <nav>
                <ul className={"inner"}>
                  <li>
                    <Link to="/#technologies" className="text-secondary" rel="up"  > ▲ <FormattedMessage id={'technology_all'}/></Link>
                  </li>
                </ul>
              </nav>
            </header>
            {edges.map((node, index) => {
              return (
                <PortfolioItem
                  noSeo
                  key={node.id}
                  col={index%2 === 1 ? "col-right" : "col-left"}
                  data={node} />
              )
            })}
            <footer className="page-footer">
              <nav>
                <ul className={"inner"}>
                  <li>
                    <Link to="/#technologies" className="text-secondary" rel="up"  > ▲ <FormattedMessage id={'technology_all'}/></Link>
                  </li>
                </ul>
              </nav>
            </footer>
          </Container>
        </section>
      </div>
    </Layout>
  )
}

export default Technology
export const pageQuery = graphql`
  query($tag: String!, $language: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, language: { eq : $language } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
            category
          }
          frontmatter {
            category
            title
            date
            description
            tags
            coverImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`