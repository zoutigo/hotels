import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useAppContext from './useAppContext'

function useIslogged() {
  const [isLogged, setIsLogged] = useState(false)
  const { state } = useAppContext()
  const { userInfo } = state

  useEffect(() => {
    if (userInfo && userInfo?.exp > new Date().getTime() / 1000) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }

    return () => {
      setIsLogged(false)
    }
  }, [userInfo])

  return isLogged
}

export default useIslogged
