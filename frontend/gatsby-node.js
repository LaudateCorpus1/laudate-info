const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const strapiResults = await graphql(
    `
      {
        articles: allStrapiArticle {
          edges {
            node {
              strapiId
            }
          }
        }
        categories: allStrapiCategory {
          edges {
            node {
              strapiId
            }
          }
        }
      }
    `,
  )

  if (strapiResults.errors) {
    throw strapiResults.errors
  }

  // Create blog articles pages.
  const articles = strapiResults.data.articles.edges
  const categories = strapiResults.data.categories.edges

  articles.forEach((article) => {
    createPage({
      path: `/article/${article.node.strapiId}`,
      component: require.resolve('./src/templates/article.tsx'),
      context: {
        id: article.node.strapiId,
      },
    })
  })

  categories.forEach((category) => {
    createPage({
      path: `/category/${category.node.strapiId}`,
      component: require.resolve('./src/templates/category.tsx'),
      context: {
        id: category.node.strapiId,
      },
    })
  })

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              layout
              slug
            }
          }
        }
      }
    }
  `)

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors)
    throw new Error(allMarkdown.errors)
  }

  allMarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, layout } = node.fields

    createPage({
      path: slug,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `page`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${layout || 'page'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const { permalink, layout } = node.frontmatter
    const { relativePath } = getNode(node.parent)

    let slug = permalink

    if (!slug) {
      slug = `/${relativePath.replace('.md', '')}/`
    }

    // Used to generate URL to view this content.
    createNodeField({
      name: `slug`,
      node,
      value: slug || '',
    })

    // Used to determine a page layout.
    createNodeField({
      node,
      name: 'layout',
      value: layout || '',
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      title: String
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
      selfIntroduction: String
      url : String
    }

    type Social {
      git: String
      instagram: String
      twitter: String
      linkdein: String
      facebook: String
      mail: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
      layout: String
    }
  `)
}
