const useStyles = (theme) => ({
  page: {
    paddingTop: '3.5rem',
    '&>:first-child': {
      paddingTop: '5.5rem !important',
    },
  },
  section: {
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
  hideUpMd: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none !important',
    },
  },
  hideDownMd: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none !important',
    },
  },
  textJustify: {
    textAlign: 'justify',
  },
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'letf',
  },
  formList: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    '& >button': {
      width: '100%',
    },
  },
  noclicksetting: {
    pointerEvents: 'none !important',
    background: `${theme.palette.secondary.main} !important`,
  },
})

export default useStyles
