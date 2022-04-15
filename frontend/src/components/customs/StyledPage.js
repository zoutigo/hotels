import { Grid } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import useStyles from '../../style'

function StyledPage({ children }) {
  const classes = useStyles()
  return (
    <Grid container spacing={1} className={classes.page}>
      {children}
    </Grid>
  )
}

StyledPage.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default StyledPage
