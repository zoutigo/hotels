import * as React from 'react'
import moment from 'moment'
import { styled } from '@mui/material/styles'
import CancelIcon from '@mui/icons-material/Cancel'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { IMG_PREFIX } from '../constants/prefix'
import useAppContext from '../hook/useAppContext'
import useMutate from '../hook/useMutate'
import { apiBookingDelete } from '../utils/api'
import { useSnackbar } from 'notistack'
import getError from '../utils/getError'
import getResponse from '../utils/getResponse'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function CardBooking({ booking }) {
  const {
    enddate,
    startdate,
    price,
    uuid,
    houseAddress,
    houseCity,
    houseName,
    houseDescription,

    suiteBanner,
    suiteTitle,
    suiteDescription,
  } = booking
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const {
    state: {
      userInfo: { token, uuid: userUuid },
    },
  } = useAppContext()

  const queryKey = ['bookings', userUuid]
  const { mutateAsync } = useMutate(queryKey, apiBookingDelete)

  const handleDelete = React.useCallback(async () => {
    closeSnackbar()
    try {
      await mutateAsync({
        uuid,
        token,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
      })
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: 'error' })
    }
  }, [closeSnackbar, enqueueSnackbar, mutateAsync, token, uuid])

  return (
    <Card sx={{ maxWidth: 345, width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={houseName + '  , ' + houseCity}
        // subheader="September 14, 2016"
        subheader={price + ' €'}
      />
      <CardMedia
        component="img"
        height="194"
        image={IMG_PREFIX + suiteBanner}
        alt={suiteTitle}
      />
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {suiteTitle}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Du {moment(startdate).format('dddd DD MMMM YYYY')}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Au {moment(enddate).format('dddd DD MMMM YYYY')}
        </Typography>
        <Typography paragraph color="text.secondary">
          {houseAddress + '  ,  ' + houseCity}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="annuler la reservation" onClick={handleDelete}>
          <CancelIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description de la suite:</Typography>
          <Typography paragraph>{suiteDescription}</Typography>
          <Typography paragraph>Description l'établissement</Typography>
          <Typography paragraph>{houseDescription}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
