const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const post = path.resolve("./src/templates/contentfulPost.js")

  return graphql(
    `
      {
        allContentfulProduct {
          edges {
            node {
              price
              name
              image {
                publicUrl
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allContentfulProduct.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: "/",
        component: post,
        context: {
          previous,
          next,
        },
        defer: true,
      })
    })
  })
}
