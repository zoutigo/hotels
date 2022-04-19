import { Container, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

function PageTitle() {
  const { state } = useLocation()
  const { pagename } = state
  return (
    <Container className="hideUpMd">
      <Typography variant="h1">{pagename || ''}</Typography>
    </Container>
  )
}

export default PageTitle
