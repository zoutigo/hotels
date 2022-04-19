import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import houses from '../constants/houses'
import Bread from '../customs/Bread'
import CardSmallHouse from '../customs/CardSmallHouse'
import PageTitle from '../customs/PageTitle'
import StyledPage from '../customs/StyledPage'
import StyledSection from '../customs/StyledSection'
import EtablissementsListForm from '../elements/EtablissementsListForm'

function EtablissementListPage() {
  const { palette } = useTheme()
  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread />
        <PageTitle />
        <Grid item container>
          <EtablissementsListForm />
        </Grid>
        <Grid item container justifyContent="space-evenly" spacing={2}>
          {houses.map((house) => (
            <CardSmallHouse key={house.id} house={house} />
          ))}
        </Grid>
      </StyledSection>
    </StyledPage>
  )
}

export default EtablissementListPage
