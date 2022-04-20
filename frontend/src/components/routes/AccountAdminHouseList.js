import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Grid, Box, Alert, LinearProgress } from '@mui/material'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import CardSmallHouse from '../customs/CardSmallHouse'
import { apiHousesList } from '../utils/api'
import { housesQueryKey } from '../constants/queryKeys'
import useFetch from '../hook/useFetch'

function AccountAdminHouseList() {
  const { palette } = useTheme()
  const queryParams = ''

  const { isLoading, isError, data, errorMessage } = useFetch(
    housesQueryKey,
    queryParams,
    apiHousesList
  )

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread />
        <PageTitle />
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
      List
    </StyledPage>
  )
}

export default AccountAdminHouseList
