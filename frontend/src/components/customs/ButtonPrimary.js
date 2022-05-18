import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
  background: theme.palette.primary.main,
  textTransform: 'capitalize',
  padding: '0.5rem',
  minWidth: '200px',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primarytext.main,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

function ButtonPrimary(props) {
  const { children, ...rest } = props
  return (
    <ColorButton {...rest} variant="contained">
      {children}
    </ColorButton>
  )
}

ButtonPrimary.propTypes = {
  children: PropTypes.string.isRequired,
}
export default ButtonPrimary
