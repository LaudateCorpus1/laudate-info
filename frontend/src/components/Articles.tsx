import React from 'react'
import { TypeArticle } from '../typings'
import Card from './Card'

interface ArticlesProps {
  articles: TypeArticle[]
}

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const leftArticlesCount = Math.ceil(articles.length / 5)
  const leftArticles = articles.slice(0, leftArticlesCount)
  const rightArticles = articles.slice(leftArticlesCount, articles.length)

  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid>
        <div>
          {leftArticles.map((article) => (
            <Card article={article} key={`article__${article.node.id}`} />
          ))}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {rightArticles.map((article) => (
              <Card article={article} key={`article__${article.node.id}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Articles
