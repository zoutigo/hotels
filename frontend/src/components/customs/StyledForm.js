import { styled } from '@mui/styles'

const StyledForm = styled('form')(() => ({
  width: '100%',
  margin: '1rem 0px',
  '& >div': {
    padding: ' 0 1rem',
  },
}))

export default StyledForm
