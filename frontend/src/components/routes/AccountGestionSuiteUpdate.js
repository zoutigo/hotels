import React from 'react'
import { useTheme } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import StyledForm from '../customs/StyledForm'
import { apiSuitUpdate } from '../utils/api'
import SuiteCreateForm from '../form/SuiteCreateForm'

function AccountGestionSuiteUpdate() {
  const { palette } = useTheme()

  const queryKey = ['houses']
  const querypParams = ''
  const action = 'update'
  const poster = apiSuitUpdate

  const formOptions = { queryKey, querypParams, action, poster }
  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread title="modifier une suite" />
        <PageTitle>Modifier une suite</PageTitle>
        <SuiteCreateForm {...formOptions} />
      </StyledSection>
    </StyledPage>
  )
}

export default AccountGestionSuiteUpdate
