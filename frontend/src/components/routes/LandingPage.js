import React from 'react'
import { Helmet } from 'react-helmet'
import { siteName } from '../constants/globals'

import StyledPage from '../customs/StyledPage'
import LandingBottom from '../elements/LandingBottom'
import LandingCenter from '../elements/LandingCenter'

function LandingPage(props) {
  return (
    <StyledPage>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="acceuil du site" />
        <meta
          name="keywords"
          content="hotels, suites de luxe, environnement , ecoresponsable"
        />
        <title>
          {props.location.state.pagename} : {siteName}
        </title>
      </Helmet>
      <LandingCenter />
      <LandingBottom />
    </StyledPage>
  )
}

export default LandingPage
