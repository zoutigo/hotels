/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledNameTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.primarytext.main,
}))
const StyledDescriptionTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondarytext.main,
}))
const StyledGrid = styled(Grid)(({ theme }) => ({
  '& >div': {
    width: '100%',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 345,
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },

  '& .media': {
    '& img': {
      width: '100%',
      objectFit: 'contain',
      borderRadius: '19px',
    },
  },
  '& .title': {
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      padding: '0 2rem',
    },
  },
  '& .description': {
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      padding: '0 2rem',
    },
  },
}))

function SmallCard({ feature }) {
  const { image, name, description } = feature

  return (
    <StyledGrid item container xs={12} md={3}>
      <Box className="media">
        <img
          src={process.env.PUBLIC_URL + `/assets/images/` + image}
          alt={name}
        />
      </Box>
      <Box className="title">
        <StyledNameTypo
          variant="h4"
          sx={{
            textTransform: 'capitalize',
          }}
        >
          {name}
        </StyledNameTypo>
      </Box>

      <Box className="description">
        <StyledDescriptionTypo variant="caption">
          {description}
        </StyledDescriptionTypo>
      </Box>
    </StyledGrid>
  )
}

SmallCard.propTypes = {
  feature: PropTypes.exact({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
}

export default SmallCard
