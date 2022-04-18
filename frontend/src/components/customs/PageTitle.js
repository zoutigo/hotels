import { Container, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

function PageTitle({ children }) {
  return (
    <Container className="hideUpMd">
      <Typography variant="h1">{children}</Typography>
    </Container>
  )
}

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
}

export default PageTitle
