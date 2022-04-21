import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import useAppContext from '../hook/useAppContext'
import { useHistory } from 'react-router-dom'

function LoggoutPage() {
  const { dispatch } = useAppContext()
  const history = useHistory()

  useEffect(() => {
    dispatch({ type: 'USER_LOGOUT' })
    Cookies.remove('userInfo')
    Cookies.remove('cartItems')
    history.push('/')
  }, [])

  return null
}

export default LoggoutPage
