import React from 'react'
import { graphql } from 'gatsby'

import LayoutRoot from '../components/LayoutRoot'
import ArticlesComponent from '../components/Articles'
import { TypeArticle } from '../typings'

interface CategoryProps {
  data: {
    articles: {
      edges: TypeArticle[]
    }
    category: {
      name: string
    }
  }
}

export const query = graphql`
  query Category($id: String) {
    articles: allStrapiArticle(filter: { categories: { elemMatch: { id: { eq: $id } } } }) {
      edges {
        node {
          strapiId
          title
          categories {
            name
          }
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 595, quality: 100)
              }
            }
          }
        }
      }
    }
    category: strapiCategory(strapiId: { eq: $id }) {
      name
    }
  }
`

const Category: React.FC<CategoryProps> = ({ data }) => {
  const articles = data.articles.edges
  const category = data.category.name

  return (
    <LayoutRoot>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category}</h1>
          <ArticlesComponent articles={articles} />
        </div>
      </div>
    </LayoutRoot>
  )
}

export default Category
