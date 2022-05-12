// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import { Store } from '../utils/Store'

const useAppContext = () => {
  const { state, dispatch } = useContext(Store)
  return { state, dispatch }
}

export default useAppContext
