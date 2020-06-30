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
            blogpost {
              title
            }
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
    const categoryPostsPerPage = 6
    const numCategoryPosts = node.blogpost.length
    const numCategoryPages = Math.ceil(numCategoryPosts / categoryPostsPerPage)

    Array.from({ length: numCategoryPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/blog/category/${node.categorySlug}`
            : `/blog/category/${node.categorySlug}/${i + 1}`,
        component: path.resolve('./src/templates/blogcategory-template.js'),
        context: {
          categoryId: node.id,
          categoryName: node.category,
          categorySlug: node.categorySlug,
          skip: categoryPostsPerPage * i,
          limit: categoryPostsPerPage,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === numCategoryPages,
        },
      })
    })
  })
}
