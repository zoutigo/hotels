import { Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Bread from '../customs/Bread'
import CardSuit from '../customs/CardSuit'

import StyledPage from '../customs/StyledPage'
import StyledSection from '../customs/StyledSection'

function EtablissementPage() {
  const { palette } = useTheme()

  const { location } = useNavigate()
  const {
    state: { house },
  } = location
  const { suits, name, description } = house

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Grid item container>
          <Bread title="Etabissement hotel" />
        </Grid>
        <Grid item container>
          <Typography variant="h1">{name}</Typography>
        </Grid>
        <Grid item container>
          <Typography variant="body1">{description}</Typography>
        </Grid>
      </StyledSection>
      {suits.map((suit) => (
        <StyledSection key={suit.id} background={palette.tertiary.main}>
          <CardSuit suit={suit} key={suit.id} />
        </StyledSection>
      ))}
    </StyledPage>
  )
}

export default React.memo(EtablissementPage)
