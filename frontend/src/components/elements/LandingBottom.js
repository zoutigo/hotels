import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'
import React from 'react'

import SmallCard from '../customs/CardSmall'
import StyledSection from '../customs/StyledSection'
import getRandomKey from '../utils/getRandomkey'

const features = [
  {
    name: 'Energie verte couvrant 80% des besoins de fonctionnement.',
    description:
      'Ce sont souvent des panneaux solaires qui alimentent nos infrastructures.',
    image: 'landingbottom1.jpg',
  },
  {
    name: 'Restauration faite à base de produits 100% locaux.',
    description:
      "l'approvisionnement se fait à moins de 40km de l'établissement.",
    image: 'landingbottom2.jpg',
  },
  {
    name: 'Préservation de la faune et de la flore proche de nous.',
    description:
      "Tout au long de l'année, des équipes dédiés encadrent les activités",
    image: 'landingbottom3.jpg',
  },
  {
    name: 'Solidarité avec les population autochtones.',
    description:
      'Les sont natifs de la région. Ils servent de relais pour les actions caritatives',
    image: 'landingbottom4.jpg',
  },
]

function LandingBottom() {
  const { palette } = useTheme()
  return (
    <StyledSection background={palette.white.main}>
      <Grid item container justifyContent="center">
        <Typography variant="h1">Pourquoi réserver chez nous</Typography>
      </Grid>
      <Grid item container justifyContent="center">
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="subtitle1">
            Nos experts vous accompagnent tout au long de votre séjour
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Profitez en !!</Typography>
        </Box>
      </Grid>
      <Grid item container justifyContent="space-evenly" spacing={2}>
        {features.map((feature) => (
          <SmallCard key={getRandomKey(9999)} feature={feature} />
        ))}
      </Grid>
    </StyledSection>
  )
}

export default LandingBottom
