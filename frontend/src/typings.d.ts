import { IGatsbyImageData } from 'gatsby-plugin-image'

interface TypeArticle {
  node: {
    id: number
    strapiId: string
    image: {
      localFile: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }
    categories: [
      {
        name: string
      },
    ]
    title: string
    content: string
  }
}
