import { useTheme } from '@mui/styles'
import React from 'react'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import StyledPage from '../customs/StyledPage'
import StyledSection from '../customs/StyledSection'

function NotFound() {
  const { palette } = useTheme()
  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread title="Page inexistante" />
        <PageTitle>Page inexistante</PageTitle>
      </StyledSection>
    </StyledPage>
  )
}

export default NotFound
