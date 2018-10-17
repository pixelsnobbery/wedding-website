import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Helmet from 'react-helmet'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import config from '../utils/siteConfig'
import Header from '../components/layout/Header'

const Index = ({ data, pageContext }) => {
  const posts = data.allContentfulPost.edges
  const { title, slug, body } = data.contentfulPage
  const featuredPost = posts[0].node
  const { currentPage } = pageContext
  const isFirstPage = currentPage === 1

  return (
    <Layout>
      
      {isFirstPage ? (
        <div>
          <SEO />
          <Header title={title}></Header>
          <Container>
          
          </Container>
        </div>
      ) : (
        <div>
        <SEO />
        <Helmet>
          <title>{`${config.siteTitle} - Page ${currentPage}`}</title>
        </Helmet>
        <Container>
          <CardList>
            {posts.map(({ node: post }) => (
              <Card key={post.id} {...post} />
            ))}
          </CardList>
          <Pagination context={pageContext} />
        </Container>
        </div>
      )}
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          heroImage {
            title
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          body {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 90)
            }
          }
        }
      }
    }
  }
`

export default Index
