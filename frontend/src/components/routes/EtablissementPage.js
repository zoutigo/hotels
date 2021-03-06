import { Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Bread from '../customs/Bread'
import CardSuit from '../customs/CardSuit'
import PageTitle from '../customs/PageTitle'

import StyledPage from '../customs/StyledPage'
import StyledSection from '../customs/StyledSection'

function EtablissementPage({ house: managerHouse }) {
  const { palette } = useTheme()
  const pathname = useLocation()
  const { location } = useHistory()
  const {
    state: { house: commonHouse },
  } = location

  const house =
    pathname === '/mon-compte/gestion-suite/list' && managerHouse
      ? managerHouse
      : commonHouse
  const { suites, name, description, uuid } = house

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Grid item container></Grid>
        <Grid item container>
          <Typography variant="h1">{name}</Typography>
        </Grid>
        <Grid item container>
          <Typography variant="body1">{description}</Typography>
        </Grid>
      </StyledSection>
      {suites.length > 0 &&
        suites.map((suite) => (
          <StyledSection key={suite.uuid} background={palette.tertiary.main}>
            <CardSuit suite={suite} house={{ houseUuid: uuid, name }} />
          </StyledSection>
        ))}
    </StyledPage>
  )
}

export default React.memo(EtablissementPage)
