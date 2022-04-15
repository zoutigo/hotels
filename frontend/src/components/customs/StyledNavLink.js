import { styled } from '@mui/styles'
import { NavLink } from 'react-router-dom'

const StyledNavLink = styled(NavLink)(() => ({
  color: 'inherit',
  textDecoration: 'none !important',
  background: 'inherit',
}))

export default StyledNavLink
