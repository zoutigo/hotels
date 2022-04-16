import { Grid, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/styles'
import React from 'react'
import ButtonPrimary from '../customs/ButtonPrimary'
import getRandomKey from '../utils/getRandomkey'
import LandingCenterCard from './LandingCenterCard'
import image from '../../assets/images/donalg.jpg'
import StyledNavLink from '../customs/StyledNavLink'
import StyledSection from '../customs/StyledSection'

const StyledTextGrid = styled(Grid)(({ theme }) => ({
  '& >div': {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
}))
const StyledImageContainer = styled(Grid)(({ theme }) => ({
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    display: 'none !important',
  },
  boxSizing: 'border-box',
  borderRadius: '9px',

  '& img': {
    width: '34vw',
    height: '53vh !important',
    objectFit: 'cover',
    objectPosition: 'bottom left',
    borderRadius: '9px',
  },
}))

const StyledSectionChanged = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    paddingLeft: '1rem',
  },
}))

const statistics = [
  {
    name: 'Suites homologuées',
    figure: 2340,
  },
  {
    name: 'Etablissements actifs',
    figure: 786,
  },
  {
    name: 'Villes inscrites',
    figure: 234,
  },
]

function LandingCenter() {
  const { palette } = useTheme()
  return (
    <StyledSection background={palette.tertiary.main}>
      <Grid container>
        <Grid
          item
          container
          xs={12}
          md={7}
          flexDirection="column"
          justifyContent="space-between"
        >
          <StyledTextGrid container>
            <Grid item xs={12}>
              <Typography variant="h1">Nos suites garantissent</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h1">Un confort vraiment</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h1">Eco responsable</Typography>
            </Grid>
          </StyledTextGrid>
          <Grid container justifyContent="space-between">
            {statistics.map((stat) => (
              <LandingCenterCard key={getRandomKey(99999)} {...stat} />
            ))}
          </Grid>
        </Grid>

        <StyledImageContainer item container justifyContent="center" md={5}>
          <img src={image} alt="logo" />
        </StyledImageContainer>
      </Grid>

      <Grid container mt={10}>
        <StyledNavLink to="/liste-des-etablissements">
          <ButtonPrimary path="/liste-des-etablissements" type="button">
            Trouvez un établissement
          </ButtonPrimary>
        </StyledNavLink>
      </Grid>
    </StyledSection>
  )
}

export default LandingCenter
