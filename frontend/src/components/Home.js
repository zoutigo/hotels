import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/styles'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'

const StyledHome = styled(Box)(({ theme }) => ({
  backgroundColor: 'yellow',
  minWidth: '300px',
  // [theme.breakpoints.up('lg')]: {
  //   padding: '0rem 17%',
  // },
  padding: '0rem 0rem',
}))

function Home() {
  // const theme = useTheme()
  // const isSmallScreen = !useMediaQuery(theme.breakpoints.down("lg"))
  return (
    <StyledHome>
      <Header />
      <Body />
      <Footer />
    </StyledHome>
  )
}

export default Home
