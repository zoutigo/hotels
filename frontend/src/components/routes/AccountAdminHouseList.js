import React from 'react'
import { useTheme } from '@mui/styles'
import { Grid } from '@mui/material'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import CardSmallHouse from '../customs/CardSmallHouse'
import houses from '../constants/houses'

function AccountAdminHouseList() {
  const { palette } = useTheme()
  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread title="admin - liste des établissements" />
        <PageTitle>AccountAdminHouseCreate vous</PageTitle>
        <Grid item container spacing={2}>
          {houses.map((house) => (
            <CardSmallHouse key={house.id} house={house} />
          ))}
        </Grid>
      </StyledSection>
      List
    </StyledPage>
  )
}

export default AccountAdminHouseList
