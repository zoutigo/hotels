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
export const apiHouseGet = async (uuid) => {
  const URL = `${PREFIX}/api/houses/${uuid}`
  const response = await axios({
    method: 'get',
    url: URL,
  })
  return response
}

export const apiHouseCreate = async ({ token, datas }) => {
  const URL = `${PREFIX}/api/houses`
  const tokenHeader = { Authorization: 'Bearer ' + token }
  const formdata = new FormData()

  if (datas && datas.file) {
    formdata.append('file', datas.file)
  }
  if (datas && datas.name) {
    formdata.append('name', datas.name)
  }
  if (datas && datas.address) {
    formdata.append('address', datas.address)
  }
  if (datas && datas.city) {
    formdata.append('city', datas.city)
  }
  if (datas && datas.description) {
    formdata.append('description', datas.description)
  }

  const response = await axios({
    method: 'post',
    url: URL,
    data: formdata,
    headers: { ...commonHeaders, ...tokenHeader },
  })

  return response
}
export const apiHouseUpdate = async ({ token, uuid, datas }) => {
  const URL = `${PREFIX}/api/houses/${uuid}`
  const tokenHeader = { Authorization: 'Bearer ' + token }
  const response = await axios({
    method: 'put',
    url: URL,
    data: datas,
    headers: { ...commonHeaders, ...tokenHeader },
  })
  return response
}

export const apiHouseDelete = async ({ token, uuid }) => {
  const URL = `${PREFIX}/api/houses/${uuid}`
  const tokenHeader = { Authorization: 'Bearer ' + token }
  const response = await axios({
    method: 'delete',
    url: URL,
    headers: { ...commonHeaders, ...tokenHeader },
  })
  return response
}

export const apiSuitGet = async ({ uuid }) => {
  const URL = `${PREFIX}/api/suites/${uuid}`
  const response = await axios({
    method: 'get',
    url: URL,

    headers: { ...commonHeaders },
  })
  return response
}

export const apiSuitCreate = async ({ token, datas }) => {
  const URL = `${PREFIX}/api/suites`
  const tokenHeader = { Authorization: 'Bearer ' + token }
  const formdata = new FormData()

  // if (datas && datas.file) {
  //   formdata.append('file', datas.file)
  // }
  if (datas && datas.files) {
    for (let i = 0; i < datas.files.length; i += 1) {
      formdata.append('files', datas.files[i])
    }
  }
  if (datas && datas.title) {
    formdata.append('title', datas.title)
  }
  if (datas && datas.description) {
    formdata.append('description', datas.description)
  }
  if (datas && datas.price) {
    formdata.append('price', datas.price)
  }
  if (datas && datas.bookinglink) {
    formdata.append('bookinglink', datas.bookinglink)
  }
  if (datas && datas.houseUuid) {
    formdata.append('houseUuid', datas.houseUuid)
  }

  const response = await axios({
    method: 'post',
    url: URL,
    data: formdata,
    headers: { ...commonHeaders, ...tokenHeader },
  })

  return response
}

export const apiSuitUpdate = async ({ token, datas, uuid }) => {
  const URL = `${PREFIX}/api/suites/${uuid}`
  const tokenHeader = { Authorization: 'Bearer ' + token }
  const formdata = new FormData()

  if (datas && datas.files) {
    for (let i = 0; i < datas.files.length; i += 1) {
      formdata.append('files', datas.files[i])
    }
  }
  if (datas && datas.title) {
    formdata.append('title', datas.title)
  }
  if (datas && datas.description) {
    formdata.append('description', datas.description)
  }
  if (datas && datas.price) {
    formdata.append('price', datas.price)
  }
  if (datas && datas.bookinglink) {
    formdata.append('bookinglink', datas.bookinglink)
  }
  if (datas && datas.houseUuid) {
    formdata.append('houseUuid', datas.houseUuid)
  }

  const response = await axios({
    method: 'put',
    url: URL,
    data: formdata,
    headers: { ...commonHeaders, ...tokenHeader },
  })

  return response
}

export const apiSuitImageDelete = async ({ suiteUuid, imageUuid, token }) => {
  const URL = `${PREFIX}/api/suites/${suiteUuid}/${imageUuid}`
  const tokenHeader = { Authorization: 'Bearer ' + token }

  const response = await axios({
    method: 'delete',
    url: URL,
    headers: { ...commonHeaders, ...tokenHeader },
  })
  return response
}
export const apiSuitDelete = async ({ uuid, token }) => {
  const URL = `${PREFIX}/api/suites/${uuid}`
  const tokenHeader = { Authorization: 'Bearer ' + token }

  const response = await axios({
    method: 'delete',
    url: URL,
    headers: { ...commonHeaders, ...tokenHeader },
  })
  return response
}
export const apiBookingCreate = async ({ datas, token }) => {
  const URL = `${PREFIX}/api/bookings`
  const tokenHeader = { Authorization: 'Bearer ' + token }

  const response = await axios({
    method: 'post',
    url: URL,
    data: datas,
    headers: { ...commonHeaders, ...tokenHeader },
  })
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
export const apiContactCreate = async ({ datas }) => {
  const URL = `${PREFIX}/api/mails`

  const response = await axios({
    method: 'post',
    url: URL,
    data: datas,
    headers: { ...commonHeaders },
  })
  return response
}
export const apiContact = async (datas) => {
  const URL = `${PREFIX}/api/contact/post`

  const response = await axios.post(URL, datas)
  return response
}
