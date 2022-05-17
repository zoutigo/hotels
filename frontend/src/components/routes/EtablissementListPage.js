import { Grid, Box, Alert, LinearProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'

import Bread from '../customs/Bread'
import CardSmallHouse from '../customs/CardSmallHouse'
import PageTitle from '../customs/PageTitle'
import StyledPage from '../customs/StyledPage'
import StyledSection from '../customs/StyledSection'
import EtablissementsListForm from '../elements/EtablissementsListForm'
import useFetch from '../hook/useFetch'
import { housesQueryKey } from '../constants/queryKeys'
import { apiHousesList } from '../utils/api'
import { siteName } from '../constants/globals'
import CustomHelmet from '../elements/CustomHelmet'

function EtablissementListPage() {
  const queryParams = ''

  const { isLoading, isError, data, errorMessage } = useFetch(
    housesQueryKey,
    queryParams,
    apiHousesList
  )

  const { palette } = useTheme()
  const pageName = `Liste des établissements`
  const seoDescription = `Liste des établissements du groupe hotelier ${siteName}`
  const seoKeywords = [
    siteName,
    'hotels',
    'suites de luxe',
    'environnement',
    'ecoresponsable',
  ]

  const seodatas = { pageName, seoDescription, seoKeywords, nofollow: false }
  return (
    <StyledPage>
      <CustomHelmet {...seodatas} />

      <StyledSection background={palette.white.main}>
        <PageTitle>{pageName}</PageTitle>
        <Bread>{pageName}</Bread>
        <Grid item container>
          <EtablissementsListForm />
        </Grid>
        {isLoading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress color="primary" />
          </Box>
        )}
        {isError && (
          <Box sx={{ width: '100%' }}>
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )}

        {data && data.datas && Array.isArray(data.datas) && (
          <Grid item container justifyContent="space-evenly" spacing={2}>
            {data.datas.map((house) => (
              <CardSmallHouse key={house.id} house={house} />
            ))}
          </Grid>
        )}
      </StyledSection>
    </StyledPage>
  )
}

export default EtablissementListPage
