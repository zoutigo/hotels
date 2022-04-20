import axios from 'axios'
import UserDetais from '../customs/UserDetais'

const LOCALHOST = 'http://localhost:3500'

const PREFIX = process.env.NODE_ENV === 'production' ? '' : LOCALHOST

const commonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export const apiLogin = async (datas) => {
  const URL = `${PREFIX}/api/login`
  const response = await axios({
    method: 'post',
    url: URL,
    data: datas,
    headers: { ...commonHeaders },
  })
  return response
}
export const apiRegister = async (datas) => {
  const registerURL = `${PREFIX}/api/users`
  const response = await axios({
    method: 'post',
    url: registerURL,
    data: datas,
    headers: { ...commonHeaders },
  })
  return response
}
export const apiUsersList = async () => {
  const registerURL = `${PREFIX}/api/users`
  const response = await axios({
    method: 'get',
    url: registerURL,
    headers: { ...commonHeaders },
  })
  return response
}

export const apiUsersDelete = async ({ token, uuid }) => {
  const registerURL = `${PREFIX}/api/users/${uuid}`
  const tokenHeader = { Authorization: 'Bearer ' + token }
  const response = await axios({
    method: 'delete',
    url: registerURL,
    headers: { ...commonHeaders, ...tokenHeader },
  })
  return response
}
export const apiUsersUpdate = async ({ token, uuid, datas }) => {
  const registerURL = `${PREFIX}/api/users/${uuid}`

  const tokenHeader = { Authorization: 'Bearer ' + token }
  const response = await axios({
    method: 'put',
    url: registerURL,
    data: datas,
    headers: { ...commonHeaders, ...tokenHeader },
  })
  return response
}
export const apiHousesList = async () => {
  const registerURL = `${PREFIX}/api/houses`
  const { data } = await axios({
    method: 'get',
    url: registerURL,
    headers: { ...commonHeaders },
  })
  return data
}
export const apiHouseCreate = async (datas) => {
  const URL = `${PREFIX}/api/house/create`

  const response = await axios.post(URL, datas)
  return response
}
export const apiHouseUpdate = async ({ token, uuid, datas }) => {
  const URL = `${PREFIX}/api/users/${uuid}`

  const tokenHeader = { Authorization: 'Bearer ' + token }
  const response = await axios({
    method: 'put',
    url: URL,
    data: datas,
    headers: { ...commonHeaders, ...tokenHeader },
  })
  return response
}

export const apiHouseDelete = async (datas) => {
  const URL = `${PREFIX}/api/house/delete`

  const response = await axios.post(URL, datas)
  return response
}
export const apiSuitCreate = async (datas) => {
  const URL = `${PREFIX}/api/suit/create`

  const response = await axios.post(URL, datas)
  return response
}
export const apiSuitUpdate = async (datas) => {
  const URL = `${PREFIX}/api/suit/update`

  const response = await axios.post(URL, datas)
  return response
}
export const apiSuitDelete = async (datas) => {
  const URL = `${PREFIX}/api/suit/delete`

  const response = await axios.post(URL, datas)
  return response
}
export const apiBookingCreate = async (datas) => {
  const URL = `${PREFIX}/api/booking/create`

  const response = await axios.post(URL, datas)
  return response
}
export const apiBookingUpdate = async (datas) => {
  const URL = `${PREFIX}/api/booking/update`

  const response = await axios.post(URL, datas)
  return response
}
export const apiBookingDelete = async (datas) => {
  const URL = `${PREFIX}/api/booking/delete`

  const response = await axios.post(URL, datas)
  return response
}
export const apiContact = async (datas) => {
  const URL = `${PREFIX}/api/contact/post`

  const response = await axios.post(URL, datas)
  return response
}
