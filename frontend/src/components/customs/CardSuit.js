import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid, Tooltip, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import useImage from '../hook/useImage'
import StyledNavLink from './StyledNavLink'
import ButtonPrimary from './ButtonPrimary'
import getRandomKey from '../utils/getRandomkey'
import ModalImage from './ModalImage'
import Image from './Image'
import StyledSection from './StyledSection'
import ButtonUpdate from './ButtonUpdate'
import ButtonDelete from './ButtonDelete'

const StyledGrid = styled(Grid)(({ theme }) => ({
  '& .card-suit-media': {
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

function CardSuit({ suit }) {
  const { pathname } = useLocation()
  const history = useHistory()
  const managerLocation = '/mon-compte/gestion-suite/list'
  const update = managerLocation === pathname

  const { name, description, price, images, banner, booking } = suit
  const { palette } = useTheme()
  const { image: pic } = useImage(banner)
  const [showAlbum, setShowAlbum] = useState(false)
  const [modal, setModal] = useState(false)
  const [tempImgSrc, setTempImgSrc] = useState(null)

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
        suit,
      },
    })
  }, [pathname, history])

  const handleDeleteSuit = useCallback(() => {
    history.push({
      pathname: '/mon-compte/gestion-suite/suppression',
      state: {
        from: pathname,
        suit,
      },
    })
  }, [pathname, history])

  const handleDeleteImage = useCallback(() => {
    console.log('delete image')
  }, [])

  return (
    <StyledGrid container>
      <Grid container>
        <Typography variant="h2">{name}</Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} className="card-suit-media">
          <img src={pic} alt={name} />
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
              Lien booking.com : {booking}
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
                    onClick={handleDeleteSuit}
                  >
                    {' '}
                    Supprimer
                  </ButtonDelete>
                </Grid>
              ) : (
                <StyledNavLink
                  to={{
                    pathname: '/reserver',
                    state: { suit },
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
                key={getRandomKey(99999)}
                item
                sm={12}
                md={6}
                lg={3}
                className="card-suit-media"
                sx={{ cursor: 'pointer' }}
                onClick={() => handleClickImage(imge)}
              >
                <Image {...imge} />
                {update && (
                  <ButtonDelete
                    onClick={handleDeleteImage}
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
  suit: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    booking: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.exact({
        alt: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
}

export default React.memo(CardSuit)
