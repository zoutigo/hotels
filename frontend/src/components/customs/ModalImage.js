import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import CloseIcon from '@mui/icons-material/Close'

import Image from './Image'

const StyledModal = styled(Grid)(({ theme }) => ({
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

  '& .open': {
    visibility: 'visible',
    opacity: 1,
    transform: 'scale(1)',
  },
  '& .avatar': {
    position: 'fixed',
    top: '5rem',
    right: '4rem',
    width: '4rem',
    height: '4rem',
    cursor: 'pointer',
    background: theme.palette.black.main,
    zIndex: 30,
    '& svg': {
      width: '4rem',
      height: '4rem',
      padding: '5px',
      color: theme.palette.primary.main,
    },
  },
}))

// const styles = (theme) => ({
//   modal: {
//     width: '100%',
//     height: '100vh',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     background: theme.palette.border.main,
//     transition:
//       'opacity .4s ease, visibility .4s ease, transform .5s ease-in-out',
//     visibility: 'hidden',
//     opacity: 0,
//     transform: 'scale(0)',
//     overflow: 'hidden',
//     zIndex: 999,

//     '& >img': {
//       width: 'auto',
//       maxWidth: '100%',
//       height: 'auto',
//       maxHeight: '100%',
//       display: 'block',
//       lineHeight: 0,
//       boxSizing: 'border-box',
//       padding: '20px 0 20px',
//       margin: '0 auto',
//     },
//   },
//   // open: {
//   //   visibility: 'visible',
//   //   opacity: 1,
//   //   transform: 'scale(1)',
//   // },
//   avatar: {
//     position: 'fixed',
//     top: '-27rem',
//     right: '10rem',
//     width: '4rem',
//     height: '4rem',
//     cursor: 'pointer',
//     background: 'red',
//     '& svg': {
//       width: '30rem',
//       height: '4rem',
//       padding: '5px',
//       color: 'pink',
//     },
//   },
// })

// const styles = makeStyles((theme) =>
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

// sx={
//   modal
//     ? { visibility: 'visible', opacity: 1, transform: 'scale(1)' }
//     : ''
// }

function ModalImage({ modal, setModal, tempImgSrc, setTempImgSrc }) {
  const handleClose = useCallback(() => {
    setModal(!modal)
  }, [setModal, modal])

  console.log(tempImgSrc)
  return (
    <StyledModal
      item
      container
      sx={
        modal
          ? { visibility: 'visible', opacity: 1, transform: 'scale(1)' }
          : ''
      }
    >
      {tempImgSrc && <Image {...tempImgSrc} />}
      <Avatar onClick={handleClose} className="avatar">
        <CloseIcon />
      </Avatar>
    </StyledModal>
  )
}

ModalImage.defaultProps = {
  tempImgSrc: {
    filename: '',
    filepath: '',
  },
}

ModalImage.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  tempImgSrc: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    filepath: PropTypes.string.isRequired,
  }),
  setTempImgSrc: PropTypes.func.isRequired,
}

export default React.memo(ModalImage)
