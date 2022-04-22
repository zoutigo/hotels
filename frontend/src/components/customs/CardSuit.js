import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid, Tooltip, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Cookies from 'js-cookie'

import useImage from '../hook/useImage'
import StyledNavLink from './StyledNavLink'
import ButtonPrimary from './ButtonPrimary'
import ModalImage from './ModalImage'
import Image from './Image'
import ButtonUpdate from './ButtonUpdate'
import ButtonDelete from './ButtonDelete'
import getResponse from '../utils/getResponse'
import getError from '../utils/getError'
import useAppContext from '../hook/useAppContext'
import useMutate from '../hook/useMutate'
import { housesQueryKey } from '../constants/queryKeys'
import { apiSuitDelete, apiSuitImageDelete } from '../utils/api'
import { IMG_PREFIX } from '../constants/prefix'
import setUserDatas from '../utils/setUserDatas'

const StyledGrid = styled(Grid)(({ theme }) => ({
  '& .card-suit-media': {
    cursor: 'pointer',
    maxHeight: '30vh',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      objectFit: 'contain',
      borderRadius: '5px',
      '&:hover': {
        filter: 'opacity(.8)',
      },
    },
  },
}))

function CardSuit({ suite }) {
  const {
    dispatch,
    state: { userInfo },
  } = useAppContext()
  const token = userInfo?.token
  const { pathname } = useLocation()
  const history = useHistory()
  const managerLocation = '/mon-compte/gestion-suite/list'
  const update = managerLocation === pathname

  const { title, description, price, images, bannerUrl, bookinglink, uuid } =
    suite

  const [showAlbum, setShowAlbum] = useState(false)
  const [modal, setModal] = useState(false)
  const [tempImgSrc, setTempImgSrc] = useState(null)
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const { mutateAsync, isMutating } = useMutate(
    housesQueryKey,
    apiSuitImageDelete
  )
  const { mutateAsync: mutateAsyncDelete, isDeleteMutating } = useMutate(
    housesQueryKey,
    apiSuitDelete
  )

  const handleclick = useCallback(() => {
    setShowAlbum(!showAlbum)
  }, [showAlbum])

  const handleClickImage = useCallback(
    (picture) => {
      setTempImgSrc(picture)
      setModal(true)
    },
    [setTempImgSrc, setModal]
  )

  const handleUpdateSuit = useCallback(() => {
    history.push({
      pathname: '/mon-compte/gestion-suite/modification',
      state: {
        from: pathname,
        suite,
      },
    })
  }, [pathname, history, suite])

  const handleDeleteSuite = useCallback(async () => {
    closeSnackbar()
    try {
      await mutateAsyncDelete({
        uuid,
        token,
      }).then((response) => {
        if (response.status === 200) {
          const refreshedUserInfo = setUserDatas(response)
          dispatch({ type: 'USER_LOGIN', payload: refreshedUserInfo })
          Cookies.set('userInfo', JSON.stringify(refreshedUserInfo))
          enqueueSnackbar(getResponse(response), { variant: 'success' })
        }
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }, [token, mutateAsyncDelete, enqueueSnackbar, closeSnackbar, uuid, dispatch])

  const handleDeleteImage = useCallback(
    async (imageUuid) => {
      // supprimer l'image et rafraichir le token et l'enlever du dom

      closeSnackbar()
      try {
        await mutateAsync({
          suiteUuid: uuid,
          imageUuid,
          token,
        }).then((response) => {
          if (response.status === 200) {
            Cookies.remove('userInfo')
            const refreshedUserInfo = setUserDatas(response)
            dispatch({ type: 'USER_LOGIN', payload: refreshedUserInfo })
            Cookies.set('userInfo', JSON.stringify(refreshedUserInfo))
            enqueueSnackbar(getResponse(response), { variant: 'success' })
          }
        })
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: 'error' })
      }
    },
    [token, mutateAsync, enqueueSnackbar, closeSnackbar, uuid, dispatch]
  )

  return (
    <StyledGrid container>
      <Grid container>
        <Typography variant="h2">{title}</Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} className="card-suit-media">
          <img src={IMG_PREFIX + bannerUrl} alt={title} />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          container
          flexDirection="row"
          justifyContent="space-between"
        >
          <Grid item container className="textJustify">
            <Typography variant="body1">{description}</Typography>
          </Grid>
          <Grid item container>
            <Typography variant="body1">
              Lien booking.com : {bookinglink}
            </Typography>
          </Grid>
          <Grid item container alignItems="center">
            <Grid item xs={2}>
              <Tooltip title="album photo" arrow>
                <Button onClick={handleclick}>Plus de photos</Button>
              </Tooltip>
            </Grid>
            <Grid item xs={4} className="textCenter">
              <Typography variant="h3">{price} €</Typography>
            </Grid>
            <Grid item xs={6}>
              {update ? (
                <Grid item container justifyContent="space-between">
                  <ButtonUpdate
                    sx={{ width: '45%' }}
                    onClick={handleUpdateSuit}
                  >
                    Modifier
                  </ButtonUpdate>

                  <ButtonDelete
                    sx={{ width: '45%' }}
                    onClick={handleDeleteSuite}
                  >
                    Supprimer
                  </ButtonDelete>
                </Grid>
              ) : (
                <StyledNavLink
                  to={{
                    pathname: '/reservation',
                    state: { suite, from: pathname, origin: 'cardsuit' },
                  }}
                >
                  <ButtonPrimary fullWidth>Réserver maintenant</ButtonPrimary>
                </StyledNavLink>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {showAlbum && (
        <Grid container spacing={2}>
          <ModalImage
            modal={modal}
            setModal={setModal}
            setTempImgSrc={setTempImgSrc}
            tempImgSrc={tempImgSrc}
            setShowAlbum={setShowAlbum}
          />
          {images &&
            images.map((imge) => (
              <Grid
                key={imge.uuid}
                item
                sm={12}
                md={6}
                lg={3}
                className="card-suit-media"
                onClick={() =>
                  handleClickImage({
                    filepath: `${IMG_PREFIX + imge.filepath}`,
                    alt: title,
                  })
                }
              >
                <Image filepath={`${IMG_PREFIX + imge.filepath}`} alt={title} />
                {update && (
                  <ButtonDelete
                    onClick={() => handleDeleteImage(imge.uuid)}
                    sx={{ mt: 1 }}
                    fullWidth
                  >
                    Supprimer
                  </ButtonDelete>
                )}
              </Grid>
            ))}
        </Grid>
      )}
    </StyledGrid>
  )
}

CardSuit.defaultProps = {}

CardSuit.propTypes = {
  suite: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      bannerUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      bookinglink: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.exact({
          filename: PropTypes.string.isRequired,
          filepath: PropTypes.string.isRequired,
          uuid: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
}

export default React.memo(CardSuit)
