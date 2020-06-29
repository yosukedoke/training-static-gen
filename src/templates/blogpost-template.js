import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import {
  faChevronLeft,
  faChevronRight,
  faCheckSquare,
} from '@fortawesome/free-solid-svg-icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'

import useContentfulImage from '../utils/useContentfulImage'

import Layout from '../components/layout'
import MetaData from '../components/meta-data'
const options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2>
        <FontAwesomeIcon icon={faCheckSquare} />
        {children}
      </h2>
    ),
    [BLOCKS.EMBEDDED_ASSET]: node => (
      <Img
        fluid={useContentfulImage(node.data.target.fields.file['ja-JP'].url)}
        alt={
          node.data.target.fields.description
            ? node.data.target.fields.description['ja-JP']
            : node.data.target.fields.title['ja-JP']
        }
      />
    ),
  },
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment]
    }, [])
  },
}

export const query = graphql`
query($id: String!) {
  contentfulBlogPost(id: { eq: $id }) {
    title
    publishDateJP:publishDate(formatString: "YYYY年MM月DD日")
    publishDate
    category {
      id
      category
      categorySlug
    }
    eyecatch {
      fluid(maxWidth: 1600) {
        ...GatsbyContentfulFluid_withWebp
      }
      description
    }
    content {
      json
    }
  }
}
`

const BlogPost = ({ data, pageContext, location }) => (
  <Layout>
    <MetaData
      pageTitle={data.contentfulBlogPost.title}
      pageDesc={`${documentToPlainTextString(data.contentfulBlogPost.content.json).slice(0, 70)}`}
      pagePath={location.pathname}
    />
    <div className="eyecatch">
      <figure>
        <Img
          fluid={data.contentfulBlogPost.eyecatch.fluid}
          alt={data.contentfulBlogPost.eyecatch.description}
        />
      </figure>
    </div>

    <article className="content">
      <div className="container">
        <h1 className="bar">{data.contentfulBlogPost.title}</h1>

        <aside className="info">
          <time dateTime={data.contentfulBlogPost.publishDate}>
            <FontAwesomeIcon icon={faClock} />
            {data.contentfulBlogPost.publishDateJP}
          </time>

          <div className="cat">
            <FontAwesomeIcon icon={faFolderOpen} />
            <ul>
              {data.contentfulBlogPost.category.map(({ id, category, categorySlug }) => (
                <li className={categorySlug} key={id}>{category}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="postbody">
          {documentToReactComponents(
            data.contentfulBlogPost.content.json,
            options
          )}
        </div>

        <ul className="postlink">
          {pageContext.next && (
            <li className="prev">
              <Link to={`/blog/post/${pageContext.next.slug}`} rel="prev">
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>{pageContext.next.title}</span>
              </Link>
            </li>
          )}
          {pageContext.previous && (
            <li className="next">
              <Link to={`/blog/post/${pageContext.previous.slug}`} rel="prev">
                <span>{pageContext.previous.title}</span>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </li>
          )}
        </ul>

      </div>
    </article>
  </Layout>
)

export default BlogPost