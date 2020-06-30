import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

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

const Blog = ({ data, location }) => (
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

        <ul class="pagenation">
          <li class="prev">
            <a href="base-blog.html" rel="prev">
              <i class="fas fa-chevron-left" />
              <span>前のページ</span>
            </a>
          </li>
          <li class="next">
            <a href="base-blog.html" rel="next">
              <span>次のページ</span>
              <i class="fas fa-chevron-right" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  </Layout>
)
export default Blog
