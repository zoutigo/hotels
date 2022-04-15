import React from 'react'
import { useTheme } from '@mui/styles'
import { Grid } from '@mui/material'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import houses from '../constants/houses'
import CardSuit from '../customs/CardSuit'

function AccountGestionSuiteList() {
  const { palette } = useTheme()
  const houseId = 2
  const { suits } = houses.find((houz) => houz.id === houseId)

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread title="gestion-liste des suites" />
        <PageTitle>liste des suites</PageTitle>
        <Grid item container>
          {suits.map((suit) => (
            <CardSuit key={suit.id} suit={suit} />
          ))}
        </Grid>
      </StyledSection>
      List
    </StyledPage>
  )
}

export default AccountGestionSuiteList
