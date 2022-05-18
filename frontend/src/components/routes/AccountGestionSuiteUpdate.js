import React from 'react'
import { useTheme } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import { apiSuitUpdate } from '../utils/api'
import SuiteCreateForm from '../form/SuiteCreateForm'
import { siteName } from '../constants/globals'
import CustomHelmet from '../elements/CustomHelmet'

function AccountGestionSuiteUpdate() {
  const { palette } = useTheme()

  const queryKey = ['houses']
  const querypParams = ''
  const action = 'update'
  const poster = apiSuitUpdate

  const formOptions = { queryKey, querypParams, action, poster }

  const pageName = `Mise à jour des suites`
  const seoDescription = `Modifier les caractéristiques de la suite`
  const seoKeywords = [pageName, siteName, 'modifier']

  const seodatas = { pageName, seoDescription, seoKeywords }
  return (
    <StyledPage>
      <CustomHelmet {...seodatas} />

      <StyledSection background={palette.white.main}>
        <Bread>{pageName}</Bread>
        <PageTitle>{pageName}</PageTitle>
        <SuiteCreateForm {...formOptions} />
      </StyledSection>
    </StyledPage>
  )
}

export default AccountGestionSuiteUpdate
