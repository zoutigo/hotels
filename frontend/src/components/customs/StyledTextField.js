import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFormControl-root ': {
    background: 'transparent',
    width: '50%',
    '& .MuiInput-root': {
      height: '2.2rem',
      width: '50%',
      paddingTop: '0.6rem',
      fontSize: '1rem',
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.secondary.main,
      fontSize: '0.8rem',
    },
    '& label.Mui-focused ': {
      color: 'green',
      textTransform: 'uppercase',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.info.dark,
    },
    '& .MuiFormHelperText-root': {
      color: theme.palette.info.dark,
      fontSize: '0.6rem',
      fontStyle: 'italic',
    },
  },
}))

export default StyledTextField
