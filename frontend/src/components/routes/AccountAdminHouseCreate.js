import React from 'react'
import { useTheme } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import HouseCreateForm from '../form/HouseCreateForm'
import { apiHouseCreate } from '../utils/api'
import { siteName } from '../constants/globals'
import CustomHelmet from '../elements/CustomHelmet'

function AccountAdminHouseCreate() {
  const { palette } = useTheme()

  const queryKey = ['houses']
  const querypParams = ''
  const action = 'create'
  const poster = apiHouseCreate

  const formOptions = { queryKey, querypParams, action, poster }

  const pageName = `Créer un établissement`
  const seoDescription = `Créer un établissement du groupe hotelier ${siteName}`
  const seoKeywords = [
    'créer',
    'creation',
    'hotels',
    'établissements',
    'suites de luxe',
    'environnement',
    'ecoresponsable',
    pageName,
    siteName,
  ]

  const seodatas = { pageName, seoDescription, seoKeywords }

  return (
    <StyledPage>
      <CustomHelmet {...seodatas} />
      <StyledSection background={palette.white.main}>
        <Bread>{pageName}</Bread>
        <PageTitle>{pageName}</PageTitle>

        <HouseCreateForm {...formOptions} />
      </StyledSection>
    </StyledPage>
  )
}

export default AccountAdminHouseCreate
