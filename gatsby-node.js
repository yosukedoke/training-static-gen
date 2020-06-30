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
      allContentfulCategory {
        edges {
          node {
            category
            categorySlug
            id
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

  const blogPostsPerPage = 6
  const numBlogPosts = blogResult.data.allContentfulBlogPost.edges.length
  const numBlogPages = Math.ceil(numBlogPosts / blogPostsPerPage)

  Array.from({ length: numBlogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/blog' : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/blog-template.js'),
      context: {
        skip: blogPostsPerPage * i,
        limit: blogPostsPerPage,
        currentPage: i + 1,
        isFirst: i + 1 === 1,
        isLast: i + 1 === numBlogPages,
      },
    })
  })

  blogResult.data.allContentfulCategory.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/category/${node.categorySlug}`,
      component: path.resolve('./src/templates/blogcategory-template.js'),
      context: {
        categoryId: node.id,
        categoryName: node.category,
        skip: 0,
        limit: 100,
        currentPage: 1,
        isFirst: true,
        isLast: true,
      },
    })
  })
}
