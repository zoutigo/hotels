import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Grid, LinearProgress, Box, Alert, Typography } from '@mui/material'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import CardSuit from '../customs/CardSuit'
import useFetch from '../hook/useFetch'
import useAppContext from '../hook/useAppContext'
import { apiHouseGet } from '../utils/api'
import { housesQueryKey } from '../constants/queryKeys'

import { useHistory } from 'react-router-dom'
import CustomHelmet from '../elements/CustomHelmet'
import { siteName } from '../constants/globals'

function AccountGestionSuiteList() {
  const history = useHistory()

  const { palette } = useTheme()
  const {
    state: { userInfo },
  } = useAppContext()

  if (!userInfo?.house || !userInfo.house?.uuid) {
    history.push('/liste-des-etablissements')
  }

  const { house } = userInfo
  const queryParams = userInfo.house.uuid
  const { isLoading, isError, data, errorMessage } = useFetch(
    housesQueryKey,
    queryParams,
    apiHouseGet
  )

  const pageName = `Les suites du ${house?.name}`
  const seoDescription = `La liste des suites du  ${house?.name}`
  const seoKeywords = [
    `${house?.name}`,
    siteName,
    'hotels',
    'environnement',
    'ecoresponsable',
    pageName,
  ]

  const seodatas = { pageName, seoDescription, seoKeywords }

  return (
    <StyledPage>
      <CustomHelmet {...seodatas} />
      <StyledSection background={palette.white.main}>
        <Bread>{pageName}</Bread>
        <PageTitle>{pageName}</PageTitle>

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
      </StyledSection>
      {house.uuid && (
        <StyledSection background={palette.white.main}>
          <Grid item container>
            <Typography variant="h1">{house.name || 'hello'}</Typography>
          </Grid>
          <Grid item container>
            <Typography variant="body1">{house.description}</Typography>
          </Grid>
        </StyledSection>
      )}

      {data && data.data && data.data.suites.length > 0 ? (
        data.data.suites.map((suite) => (
          <StyledSection key={suite.uuid} background={palette.tertiary.main}>
            <CardSuit suite={suite} />
          </StyledSection>
        ))
      ) : (
        <StyledSection>
          <Alert severity="error">
            Votre établissement a pas encore de suite. Veillez en créer{' '}
          </Alert>
        </StyledSection>
      )}
    </StyledPage>
  )
}

export default React.memo(AccountGestionSuiteList)
