import React from 'react'
import { useTheme } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import HouseCreateForm from '../form/HouseCreateForm'
import { apiHouseCreate } from '../utils/api'

function AccountAdminHouseCreate() {
  const { palette } = useTheme()

  const queryKey = ['houses']
  const querypParams = ''
  const action = 'create'
  const poster = apiHouseCreate

  const formOptions = { queryKey, querypParams, action, poster }

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread title="Créer un établissement" />
        <PageTitle>Créer un établissement</PageTitle>
        <HouseCreateForm {...formOptions} />
      </StyledSection>
    </StyledPage>
  )
}

export default AccountAdminHouseCreate
