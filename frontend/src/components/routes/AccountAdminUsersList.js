import React from 'react'
import { Paper, Box, LinearProgress, Container, Alert } from '@mui/material'

import { useTheme, styled } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import useFetch from '../hook/useFetch'
import { apiUsersList } from '../utils/api'

import UserDetais from '../customs/UserDetais'
import { usersAdminQueryKey } from '../constants/queryKeys'

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  '& >:nth-of-type(2n)': {
    background: theme.palette.tertiary.main,
  },
  '& >div': {
    alignItems: 'center',
  },
  '& >:last-child': {
    width: '100%',
  },
}))

function AccountAdminUsersList() {
  const { palette } = useTheme()
  const queryParams = ''

  const { isLoading, isError, data, errorMessage } = useFetch(
    usersAdminQueryKey,
    queryParams,
    apiUsersList
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
          <Container>
            <Alert severity="error">{errorMessage}</Alert>
          </Container>
        )}
        {data && Array.isArray(data.data) && (
          <StyledPaper className="adminUserListPaper">
            {data.data.map((details) => (
              <UserDetais details={details} key={details.uuid} />
            ))}
          </StyledPaper>
        )}
      </StyledSection>
      <section>hello</section>
    </StyledPage>
  )
}

export default AccountAdminUsersList
