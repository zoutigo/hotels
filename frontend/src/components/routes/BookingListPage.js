import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import useAppContext from '../hook/useAppContext'
import StyledPage from '../customs/StyledPage'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import useFetch from '../hook/useFetch'
import { apiUserBookings } from '../utils/api'

function BookingListPage() {
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

  const queryKey = ['bookings', state.userInfo.uuid, 'user1']

  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    querypParams,
    apiUserBookings
  )

  console.log('bookings', data)

  return (
    <StyledPage>
      <Bread>Mes réservations</Bread>
      <PageTitle>Mes réservations</PageTitle>
    </StyledPage>
  )
}

export default BookingListPage
