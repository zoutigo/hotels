import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import useStyles from '../../style'

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

function Bread({ title }) {
  const classes = useStyles()
  return (
    <StyledGrid container className={classes.hideDownMd}>
      <span>&nbsp;</span>
      <StyledTypo variant="body1">{title}</StyledTypo>
    </StyledGrid>
  )
}

Bread.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Bread
