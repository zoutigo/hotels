import React from 'react'

import { siteName } from '../constants/globals'

import StyledPage from '../customs/StyledPage'
import CustomHelmet from '../elements/CustomHelmet'
import LandingBottom from '../elements/LandingBottom'
import LandingCenter from '../elements/LandingCenter'

function LandingPage() {
  const pageName = `Acceuil`
  const seoDescription = `Le groupe hotelier ${siteName} met à votre disposition des suites ecoresponsables luxieuses dans de nombreuses villes à travers le monde`
  const seoKeywords = [
    pageName,
    'hotels',
    'suites',
    'luxe',
    'ecologie',
    'ecoresponsable',
    'voyages',
  ]

  const seodatas = { pageName, seoDescription, seoKeywords, nofollow: false }

  return (
    <StyledPage>
      <CustomHelmet {...seodatas} />

      <LandingCenter />
      <LandingBottom />
    </StyledPage>
  )
}

export default LandingPage
