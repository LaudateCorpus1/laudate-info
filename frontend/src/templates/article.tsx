import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

import ReactMarkdown from 'react-markdown'

import LayoutRoot from '../components/LayoutRoot'

interface ArticleProps {
  data: {
    strapiArticle: {
      image: {
        url: string
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
      }
      title: string
      content: string
    }
  }
}

export const query = graphql`
  query ArticleQuery($id: String) {
    strapiArticle(strapiId: { eq: $id }) {
      strapiId
      title
      content
      published_at
      image {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 660)
          }
        }
      }
    }
  }
`

const Article: React.FC<ArticleProps> = ({ data }) => {
  const article = data.strapiArticle
  return (
    <LayoutRoot>
      <div>
        <div
          id="banner"
          className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        >
          <GatsbyImage image={article.image.localFile.childImageSharp.gatsbyImageData} alt="Article image" />
          <h1 className="uk-position-z-index">{article.title}</h1>
        </div>

        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </LayoutRoot>
  )
}

export default Article
