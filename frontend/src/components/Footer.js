import { Typography, Grid } from '@mui/material'
import { styled } from '@mui/styles'
import React from 'react'
import StyledNavLink from './customs/StyledNavLink'

const StyledGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.black.main,
  minHeight: '5vh',
  padding: '0 1rem',
}))
const StyledItem = styled(Grid)(({ theme }) => ({
  color: theme.palette.white.main,
  margin: '0 0.5rem',
  padding: '0 1rem',
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primarytext.main,
    textDecoration: 'none',
  },
}))

const pages = [
  {
    id: 1,
    name: 'etablissements',
    path: '/etablissemnts',
  },
  {
    id: 2,
    name: 'reservation',
    path: '/reservations',
  },
  {
    id: 3,
    name: 'contact',
    path: '/contact',
  },
]

function Footer() {
  return (
    <StyledGrid container justifyContent="flex-end">
      {pages.map(({ id, name, path }) => (
        <StyledItem key={id}>
          <StyledNavLink to={path}>
            <Typography component="div">{name}</Typography>
          </StyledNavLink>
        </StyledItem>
      ))}
    </StyledGrid>
  )
}

export default Footer
