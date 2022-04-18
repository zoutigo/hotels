import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondarytext.main,
  background: theme.palette.border.main,
  textTransform: 'uppercaze',
  padding: '0.5rem',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primarytext.main,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

function ButtonDelete({ children, ...rest }) {
  return (
    <ColorButton {...rest} variant="contained">
      {children}
    </ColorButton>
  )
}

ButtonDelete.propTypes = {
  children: PropTypes.string.isRequired,
}
export default ButtonDelete
