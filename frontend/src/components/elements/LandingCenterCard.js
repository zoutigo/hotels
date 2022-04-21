import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}))

function LandingCenterCard({ figure, name }) {
  return (
    <StyledGrid item xs={4}>
      <Typography variant="h1" component="div">
        {figure}{' '}
      </Typography>
      <Typography variant="body1" component="div">
        {name}
      </Typography>
    </StyledGrid>
  )
}

LandingCenterCard.propTypes = {
  figure: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}

export default LandingCenterCard
