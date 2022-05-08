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
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IMG_PREFIX } from '../constants/prefix'

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
    createdAt,
    enddate,
    startdate,
    price,
    uuid,
    houseAddress,
    houseCity,
    houseName,
    houseDescription,
    houseUuid,
    suiteBanner,
    suiteTitle,
    suiteDescription,
    suiteUuid,
  } = booking
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ maxWidth: 345, width: '100%' }}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
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
        <Typography variant="h4" color="text.secondary">
          {suiteTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Du {moment(startdate).format('dddd DD MMMM YYYY')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Au {moment(enddate).format('dddd DD MMMM YYYY')}
        </Typography>
        <Typography paragraph>{houseAddress + '  ,  ' + houseCity}</Typography>
        {/* <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography> */}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="annuler la reservation">
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
