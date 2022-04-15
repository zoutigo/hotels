import { Container, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import useStyles from '../../style'

function PageTitle({ children }) {
  const classes = useStyles()
  return (
    <Container className={classes.hideUpMd}>
      <Typography variant="h1">{children}</Typography>
    </Container>
  )
}

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
}

export default PageTitle
