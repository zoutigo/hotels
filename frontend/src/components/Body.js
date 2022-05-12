import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { Grid, styled } from '@mui/material'
import pages from './constants/pages'
import getRandomKey from './utils/getRandomkey'

const StyledBody = styled(Grid)(() => ({
  minHeight: '92vh',
}))

function Body() {
  return (
    <StyledBody>
      <Switch>
        {/* <Redirect exact from="/" to="/users" /> */}

        {pages.map((route) => (
          <Route key={getRandomKey(9999999)} {...route} exact />
        ))}
      </Switch>
    </StyledBody>
  )
}

export default Body
