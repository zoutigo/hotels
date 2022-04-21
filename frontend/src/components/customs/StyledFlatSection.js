import React from 'react'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'

function StyledFlatSection({ children, background }) {
  return (
    <Grid container sx={{ background, margin: '1rem 0px' }}>
      {children}
    </Grid>
  )
}

StyledFlatSection.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  background: PropTypes.string.isRequired,
}

export default StyledFlatSection
