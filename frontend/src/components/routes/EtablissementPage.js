import { Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Bread from '../customs/Bread'
import CardSuit from '../customs/CardSuit'
import PageTitle from '../customs/PageTitle'

import StyledPage from '../customs/StyledPage'
import StyledSection from '../customs/StyledSection'

function EtablissementPage() {
  const { palette } = useTheme()

  const { location } = useHistory()
  const {
    state: { house },
  } = location
  const { suites, name, description } = house

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Grid item container>
          <Bread />
          <PageTitle />
        </Grid>
        <Grid item container>
          <Typography variant="h1">{name}</Typography>
        </Grid>
        <Grid item container>
          <Typography variant="body1">{description}</Typography>
        </Grid>
      </StyledSection>
      {suites.map((suite) => (
        <StyledSection key={suite.uuid} background={palette.tertiary.main}>
          <CardSuit suite={suite} />
        </StyledSection>
      ))}
    </StyledPage>
  )
}

export default React.memo(EtablissementPage)
