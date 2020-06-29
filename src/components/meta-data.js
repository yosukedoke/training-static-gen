import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

const MetaData = ({
    pageTitle = null,
    pageDesc = null,
    pagePath = null,
  }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          lang
          siteUrl,
        }
      }
    }
  `)

  const title = pageTitle ? `${pageTitle} | ${data.site.siteMetadata.title}` : data.site.siteMetadata.title
  const description = pageDesc || data.site.siteMetadata.description
  const url = pagePath ? `${data.site.siteMetadata.siteUrl}${pagePath}` : data.site.siteMetadata.siteUrl

  return (
    <Helmet>
      <html lang={data.site.siteMetadata.lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}

export default MetaData