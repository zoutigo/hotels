import React from 'react'
import { useTheme } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import HouseCreateForm from '../form/HouseCreateForm'
import { apiHouseUpdate } from '../utils/api'
import { housesQueryKey } from '../constants/queryKeys'

function AccountAdminHouseUpdate() {
  const { palette } = useTheme()

  const queryKey = housesQueryKey
  const querypParams = ''
  const action = 'update'
  const poster = apiHouseUpdate

  const formOptions = { queryKey, querypParams, action, poster }

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread />
        <PageTitle />
        <HouseCreateForm {...formOptions} />
      </StyledSection>
    </StyledPage>
  )
}

export default AccountAdminHouseUpdate
