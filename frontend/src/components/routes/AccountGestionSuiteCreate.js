import React from 'react'
import { useTheme } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import SuiteCreateForm from '../form/SuiteCreateForm'
import { apiSuitCreate } from '../utils/api'

function AccountGestionSuiteCreate() {
  const { palette } = useTheme()

  const queryKey = ['suits']
  const querypParams = ''
  const action = 'create'
  const poster = apiSuitCreate

  const formOptions = { queryKey, querypParams, action, poster }
  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread />
        <PageTitle />
        <SuiteCreateForm {...formOptions} />
      </StyledSection>
    </StyledPage>
  )
}

export default AccountGestionSuiteCreate
