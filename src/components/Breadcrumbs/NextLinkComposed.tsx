import PropTypes from 'prop-types'
import * as React from 'react'

// next imports
// import Link as NextLink from 'rea';

// M-UI
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

// =============================|| Next Link Component ||============================= //

const Anchor = styled('a')({})
export const NextLinkComposed = React.forwardRef(
  (
    { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other }: any,
    ref
  ) => (
    <Link to={to} replace={replace}>
      <Anchor ref={ref} {...other} />
    </Link>
  )
)

export default NextLinkComposed
