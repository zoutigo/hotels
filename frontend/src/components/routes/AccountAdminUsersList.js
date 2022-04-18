import React from 'react'
import { useTheme } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'

function AccountAdminUsersList() {
  const { palette } = useTheme()
  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread title="login" />
        <PageTitle>AccountAdminHouseCreate vous</PageTitle>
      </StyledSection>
      List
    </StyledPage>
  )
}

export default AccountAdminUsersList
