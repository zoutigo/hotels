import React from 'react'
import { useLocation } from 'react-router-dom'

function AccountGestionSuiteDelete() {
  const {
    state: { suit, from },
  } = useLocation()

  return <div>AccountGestionSuiteDelete</div>
}

export default AccountGestionSuiteDelete
