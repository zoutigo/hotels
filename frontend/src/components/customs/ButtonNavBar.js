import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

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
