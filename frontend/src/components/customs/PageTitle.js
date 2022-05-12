import { Grid, Typography } from '@mui/material'
import React from 'react'

import { PropTypes } from 'prop-types'

function PageTitle({ children }) {
  return (
    <Grid container className="hideDownMd ">
      <Typography variant="h1">{children}</Typography>
    </Grid>
  )
}

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
}

export default PageTitle
