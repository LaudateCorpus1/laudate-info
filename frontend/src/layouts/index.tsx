import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize'
import '../styles/normalize'

import Header from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'
import UnderConstruction from '../components/UnderConstruction'

import ArticlesComponent from '../components/Articles'
import { TypeArticle } from '../typings'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
  allStrapiArticle: {
    edges: TypeArticle[]
  }
}

interface IndexLayoutProps {
  readonly title?: string
  readonly children: React.ReactNode
}

const IndexLayout: React.FC<IndexLayoutProps> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
        allStrapiArticle {
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
                    gatsbyImageData(width: 200, quality: 100)
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <LayoutRoot>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
          ]}
        />
        {process.env.NODE_ENV === 'production' && <UnderConstruction />}
        {process.env.NODE_ENV !== 'production' && (
          <>
            <Header title={data.site.siteMetadata.title} />
            <LayoutMain>{children}</LayoutMain>
            <ArticlesComponent articles={data.allStrapiArticle.edges} />
          </>
        )}
      </LayoutRoot>
    )}
  />
)

export default IndexLayout
