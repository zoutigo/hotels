import React from 'react'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'

function StyledSection({ children, background }) {
  return (
    <Grid container className="section" sx={{ background }}>
      {children}
    </Grid>
  )
}

StyledSection.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  background: PropTypes.string.isRequired,
}

export default StyledSection
