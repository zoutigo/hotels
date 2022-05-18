import React from 'react'
import { useTheme } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import SuiteCreateForm from '../form/SuiteCreateForm'
import { apiSuitCreate } from '../utils/api'
import CustomHelmet from '../elements/CustomHelmet'
import { siteName } from '../constants/globals'

function AccountGestionSuiteCreate() {
  const { palette } = useTheme()

  const queryKey = ['suits']
  const querypParams = ''
  const action = 'create'
  const poster = apiSuitCreate

  const pageName = `Création d'une suite`
  const seoDescription = `Créer une suite`
  const seoKeywords = [
    'créer',
    'creation',
    'suite',
    'hotels',
    siteName,
    pageName,
  ]

  const seodatas = { pageName, seoDescription, seoKeywords }

  const formOptions = { queryKey, querypParams, action, poster }
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

export default AccountGestionSuiteCreate
