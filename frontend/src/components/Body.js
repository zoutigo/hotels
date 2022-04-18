import React from 'react'

import { Redirect, Switch, Route, Link, withRouter } from 'react-router-dom'
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
          <Route key={getRandomKey(999999)} {...route} exact />
        ))}
      </Switch>
    </StyledBody>
  )
}

export default Body
