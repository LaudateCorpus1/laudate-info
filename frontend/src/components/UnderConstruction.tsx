import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const UnderConstruction = (props) => (
  <StaticImage
    src={'../images/under-construction.jpg'}
    alt={'Site en cours de construction...'}
    layout={'constrained'}
  />
)

export default UnderConstruction
