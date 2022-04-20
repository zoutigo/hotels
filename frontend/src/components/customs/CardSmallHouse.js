/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Box, Grid, Typography, Container, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import useImage from '../hook/useImage'
import ButtonSecondary from './ButtonSecondary'
import StyledNavLink from './StyledNavLink'
import ButtonUpdate from './ButtonUpdate'
import ButtonDelete from './ButtonDelete'
import { IMG_PREFIX } from '../constants/prefix'

const StyledNameTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.primarytext.main,
}))
const StyledCityTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.primarytext.main,
  opacity: 0.4,
}))
const StyledDescriptionTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondarytext.main,
}))
const StyledGrid = styled(Grid)(({ theme }) => ({
  '& >div': {
    background: theme.palette.tertiary.main,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 345,
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },

  '& .media': {
    padding: '0rem !important',
    height: '22vh',
    overflow: 'hidden',
    '& img': {
      width: '100%',

      objectFit: 'contain',
      borderRadius: '19px',
    },
  },
  '& .name': {
    textAlign: 'left',
    maxHeight: '5vh',
    [theme.breakpoints.down('md')]: {
      padding: '0 2rem',
    },
  },
  '& .city': {
    textAlign: 'right',
    maxHeight: '5vh',
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
  '& .button': {
    padding: '0rem !important',
  },
}))

function CardSmallHouse({ house }) {
  const { name, description, bannerUrl, city, slug } = house
  // const { image: pic } = useImage(image)
  const adminLocation = '/mon-compte/administration/liste-etablissements'
  const { pathname } = useLocation()
  return (
    <StyledGrid item container xs={12} md={3}>
      <Container
        className="media"
        sx={{ background: 'pink', textAlign: 'center' }}
      >
        <img src={`${IMG_PREFIX}${bannerUrl}`} alt="bannière" />
      </Container>
      <Container className="name">
        <StyledNameTypo
          variant="h4"
          sx={{
            textTransform: 'capitalize',
          }}
        >
          {name}
        </StyledNameTypo>
      </Container>
      <Container className="city">
        <StyledCityTypo variant="h4">{city}</StyledCityTypo>
      </Container>
      <Container className="description">
        <StyledDescriptionTypo variant="caption">
          {description.substring(0, 100)}
        </StyledDescriptionTypo>
      </Container>
      {pathname === adminLocation ? (
        <Container className="button">
          <StyledNavLink
            to={{
              pathname:
                '/mon-compte/administration/etablissements/modification',
              state: {
                from: pathname,
                house,
              },
            }}
          >
            <ButtonUpdate fullWidth>Modifier</ButtonUpdate>
          </StyledNavLink>
          <StyledNavLink
            to={{
              pathname: '/mon-compte/administration/etablissements/suppression',
              state: {
                from: pathname,
                house,
              },
            }}
          >
            <ButtonDelete fullWidth>Supprimer</ButtonDelete>
          </StyledNavLink>
        </Container>
      ) : (
        <Container className="button">
          <StyledNavLink
            to={{
              pathname: `/liste-des-etablissements/${slug}`,
              state: {
                house,
              },
            }}
          >
            <ButtonSecondary fullWidth>En savoir plus ++</ButtonSecondary>
          </StyledNavLink>
        </Container>
      )}
    </StyledGrid>
  )
}

CardSmallHouse.propTypes = {
  house: PropTypes.exact({
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    bannerUrl: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    suites: PropTypes.arrayOf(
      PropTypes.exact({
        uuid: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        bannerUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        bookinglink: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
          PropTypes.exact({
            filename: PropTypes.string.isRequired,
            filepath: PropTypes.string.isRequired,
            uuid: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
}

export default CardSmallHouse
