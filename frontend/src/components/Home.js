import React from 'react'
import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'

const StyledHome = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  minWidth: '300px',
  padding: '0rem 0rem',

  ' .page': {
    paddingTop: '3.5rem',
    '&>:first-child': {
      paddingTop: '5.5rem !important',
    },
  },
  ' .section': {
    marginTop: '1rem',
    paddingBottom: '4rem',
    paddingTop: '1rem',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '9.5%',
      paddingRight: '9.5%',
    },
    [theme.breakpoints.down('lg')]: {
      padding: '0 1rem',
    },
  },
  ' .hideUpMd': {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none !important',
    },
  },
  ' .hideDownMd': {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none !important',
    },
  },
  ' .textJustify': {
    textAlign: 'justify',
  },
  ' .textCenter': {
    textAlign: 'center',
  },
  ' .formList': {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    '& >button': {
      width: '100%',
    },
  },
  ' .noclicksetting': {
    pointerEvents: 'none !important',
    background: `${theme.palette.secondary.main} !important`,
  },
}))

function Home() {
  return (
    <StyledHome>
      <Header />

      <Body />
      <Footer />
    </StyledHome>
  )
}

export default Home
