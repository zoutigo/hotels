import { Grid, Box, Alert, LinearProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import houses from '../constants/houses'
import Bread from '../customs/Bread'
import CardSmallHouse from '../customs/CardSmallHouse'
import PageTitle from '../customs/PageTitle'
import StyledPage from '../customs/StyledPage'
import StyledSection from '../customs/StyledSection'
import EtablissementsListForm from '../elements/EtablissementsListForm'
import useFetch from '../hook/useFetch'
import { housesQueryKey } from '../constants/queryKeys'
import { apiHousesList } from '../utils/api'

function EtablissementListPage() {
  const queryParams = ''

  const { isLoading, isError, data, errorMessage } = useFetch(
    housesQueryKey,
    queryParams,
    apiHousesList
  )

  console.log(data)

  const { palette } = useTheme()
  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread />
        <PageTitle />
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
