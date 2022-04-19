import axios from 'axios'

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
  const URL = `/api/users`
  const response = await axios({
    method: 'post',
    url: URL,
    data: datas,
    headers: { ...commonHeaders },
  })
  return response
}

export const apiHouseCreate = async (datas) => {
  const URL = `${PREFIX}/api/house/create`

  const response = await axios.post(URL, datas)
  return response
}
export const apiHouseUpdate = async (datas) => {
  const URL = `${PREFIX}/api/house/update`

  const response = await axios.post(URL, datas)
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
