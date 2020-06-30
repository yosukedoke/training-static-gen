const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogResult = await graphql(`
    query {
      allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
        edges {
          node {
            id
            slug
          }
          next {
            title
            slug
          }
          previous {
            slug
            title
          }
        }
      }
    }
  `)

  if (blogResult.errors) {
    reporter.panicOnBuild('GraphQLのクエリでエラーが発生しました')
    return
  }

  blogResult.data.allContentfulBlogPost.edges.forEach(
    ({ node, next, previous }) => {
      createPage({
        path: `/blog/post/${node.slug}`,
        component: path.resolve('./src/templates/blogpost-template.js'),
        context: {
          id: node.id,
          next,
          previous,
        },
      })
    }
  )
}
