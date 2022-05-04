import React from 'react'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { PropTypes } from 'prop-types'

const StyledTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondarytext.main,
  textTransform: 'uppercase',
}))

const StyledGrid = styled(Grid)(() => ({
  alignItems: 'center',
}))

function Bread({ children }) {
  return (
    <StyledGrid container className="hideUpMd">
      <StyledTypo variant="h3"> --- {children} ---</StyledTypo>
    </StyledGrid>
  )
}
Bread.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Bread
