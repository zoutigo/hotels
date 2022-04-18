import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'

const StyledGrid = styled(Grid)(({ theme }) => ({
  paddingBottom: '4rem',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: '9.5%',
    paddingRight: '9.5%',
  },
}))

const StyledGridSection = styled(StyledGrid)(({ istopsection }) => ({
  paddingTop: istopsection === 'yes' ? '5.5rem' : '1rem',
}))

StyledGridSection.defaultPros = {
  istopsection: 'no',
}
StyledGridSection.propTypes = {
  istopsection: PropTypes.string,
}

export default StyledGridSection
