import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/styles'
import { Button } from '@mui/material'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
  backgroundColor: theme.palette.black.main,
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primarytext.main,
  },
}))

function ButtonNavbar({ children, ...rest }) {
  return (
    <ColorButton {...rest} variant="contained">
      {children}
    </ColorButton>
  )
}

ButtonNavbar.propTypes = {
  children: PropTypes.string.isRequired,
}
export default ButtonNavbar
