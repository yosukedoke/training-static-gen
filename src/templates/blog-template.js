import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

import Layout from '../components/layout'
import MetaData from '../components/meta-data'

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { fields: publishDate, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          title
          slug
          eyecatch {
            description
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`

const Blog = ({ data, pageContext, location }) => (
  <Layout>
    <MetaData
      pageTitle="ブログ"
      pageDesc="ESSENTIALSのブログです。"
      pagePath={location.pathname}
    />
    <section className="content bloglist">
      <div className="container">
        <h1 className="bar">RECENT POSTS</h1>

        <div className="posts">
          {data.allContentfulBlogPost.edges.map(({ node }) => (
            <article className="post" key={node.id}>
              <Link to={`/blog/post/${node.slug}`}>
                <figure>
                  <Img
                    fluid={node.eyecatch.fluid}
                    alt={node.eyecatch.description}
                    style={{ height: '100%' }}
                  />
                </figure>
                <h3>{node.title}</h3>
              </Link>
            </article>
          ))}
        </div>

        <ul className="pagenation">
          {!pageContext.isFirst && (
            <li className="prev">
              <Link
                to={
                  pageContext.currentPage === 2
                    ? '/blog'
                    : `/blog/${pageContext.currentPage - 1}`
                }
                rel="prev"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>前のページ</span>
              </Link>
            </li>
          )}
          {!pageContext.isLast && (
            <li className="next">
              <Link to={`/blog/${pageContext.currentPage + 1}`} rel="next">
                <span>次のページ</span>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  </Layout>
)
export default Blog
