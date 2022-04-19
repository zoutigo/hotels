import React from 'react'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'

const StyledTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondarytext.main,
  textTransform: 'uppercase',
}))

const StyledGrid = styled(Grid)(() => ({
  alignItems: 'center',
  '& span': {
    width: '3rem',
    height: '2px',
    background: 'blue',
    marginRight: '2rem',
  },
}))

function Bread() {
  const { state } = useLocation()

  const { pagename } = state
  return (
    <StyledGrid container className="hideDownMd">
      <span>&nbsp;</span>
      <StyledTypo variant="body1">{pagename}</StyledTypo>
    </StyledGrid>
  )
}

export default Bread
