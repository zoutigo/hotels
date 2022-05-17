import React from 'react'
import { useTheme } from '@mui/material/styles'
import StyledSection from '../customs/StyledSection'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import { apiContact } from '../utils/api'
import ContactForm from '../form/ContactForm'
import { siteName } from '../constants/globals'
import CustomHelmet from '../elements/CustomHelmet'

function ContactPage() {
  const { palette } = useTheme()

  const queryKey = ['contact']
  const querypParams = ''

  const poster = apiContact

  const formOptions = { queryKey, querypParams, poster }

  const pageName = `Contact`
  const seoDescription = `Contacter le groupe hotelier ${siteName}`
  const seoKeywords = ['contact', 'contacter', pageName, siteName]

  const seodatas = { pageName, seoDescription, seoKeywords, nofollow: false }
  return (
    <StyledPage>
      <CustomHelmet {...seodatas} />

      <StyledSection background={palette.white.main}>
        <Bread>{pageName}</Bread>
        <PageTitle>{pageName}</PageTitle>
        <ContactForm {...formOptions} />
      </StyledSection>
    </StyledPage>
  )
}

export default ContactPage
