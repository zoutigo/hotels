import React from 'react'
import { useTheme } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import { apiContact } from '../utils/api'
import ContactForm from '../form/ContactForm'

function ContactPage() {
  const { palette } = useTheme()

  const queryKey = ['contact']
  const querypParams = ''

  const poster = apiContact

  const formOptions = { queryKey, querypParams, poster }

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread>Contact</Bread>
        <PageTitle>Contact</PageTitle>
        <ContactForm {...formOptions} />
      </StyledSection>
    </StyledPage>
  )
}

export default ContactPage
