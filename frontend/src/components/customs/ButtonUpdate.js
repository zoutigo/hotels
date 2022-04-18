import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primarytext.main,
  background: theme.palette.secondary.main,
  textTransform: 'uppercaze',
  padding: '0.5rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primarytext.main,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

function ButtonUpdate({ children, ...rest }) {
  return (
    <ColorButton {...rest} variant="contained">
      {children}
    </ColorButton>
  )
}

ButtonUpdate.propTypes = {
  children: PropTypes.string.isRequired,
}
export default ButtonUpdate
