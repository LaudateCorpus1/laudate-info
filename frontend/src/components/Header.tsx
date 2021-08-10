import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize, darken } from 'polished'
import { graphql, Link, StaticQuery } from 'gatsby'
import { motion } from 'framer-motion'

import { heights, dimensions, colors } from '../styles/variables'
import Container from './Container'

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: ${colors.brand};
  color: ${transparentize(0.5, colors.white)};
  position: sticky;
  top: 0;
  width: 100%;
  height: 78px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #e3e7ff;
  border-bottom: 1px solid #e3e7ff;
  z-index: 10;
`

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  & ul.navbar-nav {
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  & .navbar-left {
    flex-grow: 1;
  }
  & .navbar-right {
    flex-grow: 4;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`

interface ListItemLinkProps {
  color: string
  url: string
  name: string
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ color, url, name }) => {
  const StyledMotionLi = styled(motion.li)`
    height: 100%;
    padding-bottom: 8px;
    padding: 0px 0px 8px 0px;
    margin-right: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & a {
      color: ${color};
    }
  `
  const [isHovered, setHovered] = React.useState(false)

  return (
    <StyledMotionLi onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link to={url}>{name}</Link>
      {isHovered && (
        <motion.div
          initial={{
            height: '2px',
            width: 0,
            borderRadius: '4px',
            borderWidth: `2px`,
            borderStyle: `solid`,
            borderColor: `${color}`,
          }}
          animate={{ width: '100%' }}
          transition={{ duration: 1 }}
        />
      )}
      {!isHovered && <div style={{ height: '4px' }} />}
    </StyledMotionLi>
  )
}

interface CategoryInterface {
  node: {
    strapiId: number
    name: string
  }
}

interface HeaderProps {
  title?: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <StyledHeader>
    <HeaderInner>
      <StyledNav>
        <div className="navbar-left">
          <ul className="navbar-nav">
            <li>
              <Link to="/">Strapi Blog</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <ul className="navbar-nav">
            <StaticQuery
              query={graphql`
                query {
                  allStrapiCategory {
                    edges {
                      node {
                        strapiId
                        name
                      }
                    }
                  }
                }
              `}
              render={(data) =>
                data.allStrapiCategory.edges.map((category: CategoryInterface, i: number) => (
                  <ListItemLink
                    key={category.node.strapiId}
                    name={category.node.name}
                    url={`/category/${category.node.strapiId}`}
                    color={darken(0.3, colors.brand)}
                  />
                ))
              }
            />
          </ul>
        </div>
      </StyledNav>
    </HeaderInner>
  </StyledHeader>
)

export default Header
