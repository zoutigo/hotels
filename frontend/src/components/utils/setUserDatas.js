// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

const setUserDatas = (response) => {
  const {
    data: { token },
  } = response
  const datas = jwt_decode(token)

  return {
    token,
    ...datas,
  }
}

export default setUserDatas
