import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { TypeArticle } from '../typings'

interface ArticleProps {
  article: TypeArticle
}

const Card: React.FC<ArticleProps> = ({ article }) => (
  <Link to={`/article/${article.node.strapiId}`} className="uk-link-reset">
    <div className="uk-card uk-card-muted">
      <div className="uk-card-media-top">
        <GatsbyImage image={article.node.image.localFile.childImageSharp.gatsbyImageData} alt="Article Image" />
      </div>
      <div className="uk-card-body">
        <p id="category" className="uk-text-uppercase">
          {article.node.categories?.map((category) => category.name)}
        </p>
        <p id="title" className="uk-text-large">
          {article.node.title}
        </p>
      </div>
    </div>
  </Link>
)

export default Card
