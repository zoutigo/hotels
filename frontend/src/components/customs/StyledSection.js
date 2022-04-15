import React from 'react'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
import useStyles from '../../style'

function StyledSection({ children, background }) {
  const classes = useStyles()
  return (
    <Grid container className={classes.section} sx={{ background }}>
      {children}
    </Grid>
  )
}

StyledSection.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  background: PropTypes.string.isRequired,
}

export default StyledSection
