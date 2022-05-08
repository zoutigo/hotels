import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useTheme } from '@mui/material/styles'
import useAppContext from '../hook/useAppContext'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import useFetch from '../hook/useFetch'
import { apiUserBookings } from '../utils/api'
import StyledSection from '../customs/StyledSection'
import { Grid } from '@mui/material'
import CardBooking from '../customs/CardBooking'

function BookingListPage() {
  const { palette } = useTheme()
  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { state } = useAppContext()
  if (!state.userInfo) {
    enqueueSnackbar('il faut vous connecter our accéder à cette page', {
      variant: 'error',
    })
    setTimeout(
      () =>
        history.push({
          pathname: '/login',
          state: {
            pagename: 'login',
          },
        }),
      1500
    )
  }

  // const bookings = state.userInfo?.bookings

  const querypParams = {
    uuid: state.userInfo?.uuid,
    token: state.userInfo?.token,
  }

  const queryKey = ['bookings', state.userInfo.uuid]

  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    querypParams,
    apiUserBookings
  )

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread>Mes réservations</Bread>
        <PageTitle>Mes réservations</PageTitle>

        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          // sx={{ background: palette.offwhite.main }}
        >
          {data &&
            Array.isArray(data.data) &&
            data.data.map((booking) => (
              <Grid
                item
                container
                key={booking.uuid}
                xs={12}
                md={6}
                lg={4}
                justifyContent="center"
              >
                <CardBooking booking={booking} />
              </Grid>
            ))}
        </Grid>
      </StyledSection>
    </StyledPage>
  )
}

export default BookingListPage
