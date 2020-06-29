import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

const MetaData = ({
    pageTitle = null,
    pageDesc = null,
    pagePath = null,
    pageOgImage = null,
    pageOgImageWidth = 1280,
    pageOgImageHeight = 640,
    pageOgImageForBlogPost = null
  }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          lang
          siteUrl
          locale
          fbAppId
        }
      }
    }
  `)

  const title = pageTitle ? `${pageTitle} | ${data.site.siteMetadata.title}` : data.site.siteMetadata.title
  const description = pageDesc || data.site.siteMetadata.description
  const url = pagePath ? `${data.site.siteMetadata.siteUrl}${pagePath}` : data.site.siteMetadata.siteUrl

  const ogImage = pageOgImage
    ? `${data.site.siteMetadata.siteUrl}${pageOgImage}`
    : (pageOgImageForBlogPost || `${data.site.siteMetadata.siteUrl}/thumb.jpg`)

  return (
    <Helmet>
      <html lang={data.site.siteMetadata.lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={data.site.siteMetadata.locale} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={pageOgImageWidth} />
      <meta property="og:image:height" content={pageOgImageHeight} />
      <meta property="fb:app_id" content={data.site.siteMetadata.fbAppId} />
      <meta property="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}

export default MetaData