import { Grid } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

function StyledPage({ children }) {
  return (
    <Grid container spacing={1} className="page">
      {children}
    </Grid>
  )
}

StyledPage.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default StyledPage
