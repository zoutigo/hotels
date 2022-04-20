import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Grid } from '@mui/material'

import { useTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'

import Image from './Image'

const useStyles = (theme) => ({
  modal: {
    width: '100%',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.border.main,
    transition:
      'opacity .4s ease, visibility .4s ease, transform .5s ease-in-out',
    visibility: 'hidden',
    opacity: 0,
    transform: 'scale(0)',
    overflow: 'hidden',
    zIndex: 999,

    '& >img': {
      width: 'auto',
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '100%',
      display: 'block',
      lineHeight: 0,
      boxSizing: 'border-box',
      padding: '20px 0 20px',
      margin: '0 auto',
    },
  },
  open: {
    visibility: 'visible',
    opacity: 1,
    transform: 'scale(1)',
  },
  avatar: {
    position: 'fixed',
    top: '-27rem',
    right: '3rem',
    width: '4rem',
    height: '4rem',
    cursor: 'pointer',
    background: theme.palette.tertiary.main,
    '& svg': {
      width: '4rem',
      height: '4rem',
      padding: '5px',
      color: theme.palette.secondary.main,
    },
  },
})

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     modal: {
//       width: '100%',
//       height: '100vh',
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       background: theme.palette.border.main,
//       transition:
//         'opacity .4s ease, visibility .4s ease, transform .5s ease-in-out',
//       visibility: 'hidden',
//       opacity: 0,
//       transform: 'scale(0)',
//       overflow: 'hidden',
//       zIndex: 999,

//       '& >img': {
//         width: 'auto',
//         maxWidth: '100%',
//         height: 'auto',
//         maxHeight: '100%',
//         display: 'block',
//         lineHeight: 0,
//         boxSizing: 'border-box',
//         padding: '20px 0 20px',
//         margin: '0 auto',
//       },
//     },
//     open: {
//       visibility: 'visible',
//       opacity: 1,
//       transform: 'scale(1)',
//     },
//     avatar: {
//       position: 'fixed',
//       top: '-27rem',
//       right: '3rem',
//       width: '4rem',
//       height: '4rem',
//       cursor: 'pointer',
//       background: theme.palette.tertiary.main,
//       '& svg': {
//         width: '4rem',
//         height: '4rem',
//         padding: '5px',
//         color: theme.palette.secondary.main,
//       },
//     },
//   })
// )

function ModalImage({ modal, setModal, tempImgSrc, setTempImgSrc }) {
  const classes = useStyles()
  const theme = useTheme()

  const handleClose = useCallback(() => {
    setModal(!modal)
  }, [setModal, modal])

  console.log(tempImgSrc)
  return (
    <Grid
      item
      container
      className={modal ? `${classes.modal} ${classes.open}` : classes.modal}
    >
      {tempImgSrc && <Image {...tempImgSrc} />}
      <Avatar
        onClick={handleClose}
        className={classes.avatar}
        sx={{ bgcolor: theme.palette.black.main }}
      >
        <CloseIcon />
      </Avatar>
    </Grid>
  )
}

ModalImage.defaultProps = {
  tempImgSrc: {
    alt: '',
    url: '',
  },
}

ModalImage.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  tempImgSrc: PropTypes.exact({
    alt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  setTempImgSrc: PropTypes.func.isRequired,
}

export default React.memo(ModalImage)
