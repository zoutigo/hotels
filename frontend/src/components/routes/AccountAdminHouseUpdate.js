import React from 'react'
import { useTheme } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import HouseCreateForm from '../form/HouseCreateForm'
import { apiHouseUpdate } from '../utils/api'
import { housesQueryKey } from '../constants/queryKeys'
import { siteName } from '../constants/globals'
import CustomHelmet from '../elements/CustomHelmet'

function AccountAdminHouseUpdate() {
  const { palette } = useTheme()

  const queryKey = housesQueryKey
  const querypParams = ''
  const action = 'update'
  const poster = apiHouseUpdate

  const formOptions = { queryKey, querypParams, action, poster }

  const pageName = `Mise à jour établissement`
  const seoDescription = `Mettre à jour un établissement du groupe hotelier ${siteName}`
  const seoKeywords = [
    'maj',
    'etablissement',
    'hotels',
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

export default AccountAdminHouseUpdate
