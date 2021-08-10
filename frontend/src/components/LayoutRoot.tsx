import * as React from 'react'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import normalize from '../styles/normalize'
import main from '../styles/main'
import Seo from './Seo'

const StyledLayoutRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

interface LayoutRootProps {
  className?: string
}

const LayoutRoot: React.FC<LayoutRootProps> = ({ children, className }) => (
  <>
    <Seo />
    <Global styles={() => css(normalize, main)} />
    <StyledLayoutRoot className={className}>{children}</StyledLayoutRoot>
  </>
)

export default LayoutRoot
