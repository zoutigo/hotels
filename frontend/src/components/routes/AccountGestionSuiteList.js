import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Grid, LinearProgress, Box, Alert, Typography } from '@mui/material'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import houses from '../constants/houses'
import CardSuit from '../customs/CardSuit'
import useFetch from '../hook/useFetch'
import useAppContext from '../hook/useAppContext'
import { apiHouseGet, apiHousesList, apiSuitGet } from '../utils/api'
import { housesQueryKey } from '../constants/queryKeys'
import EtablissementPage from './EtablissementPage'
import { useLocation } from 'react-router-dom'

function AccountGestionSuiteList() {
  const { palette } = useTheme()
  const {
    state: {
      userInfo: { house, roles },
    },
  } = useAppContext()

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread />
        <PageTitle />
        {/* {isLoading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress color="primary" />
          </Box>
        )}
        {isError && (
          <Box sx={{ width: '100%' }}>
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )} */}
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
      {house.suites.length > 0 ? (
        house.suites.map((suite) => (
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
