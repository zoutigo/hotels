const jwt = require('jsonwebtoken')
require('dotenv').config()

// eslint-disable-next-line import/prefer-default-export
const generateToken = (user) => {
  // console.log('user', user)
  const {
    dataValues: {
      uuid,
      roles,
      lastname,
      firstname,
      house,
      booking,
      email,
      createdAt,
    },
  } = user
  return jwt.sign(
    {
<<<<<<< HEAD
      uuid: user.uuid,
      roles: user.getDataValue('roles'),
      lastname: user.lastname,
      firstname: user.firstname,
      house: user.house,
      bookings: user.bookings,
      email: user.email,
      createdAt: user.createdAt,
=======
      // uuid: user.uuid,
      // roles: user.getDataValue('roles'),
      // lastname: user.lastname,
      // firstname: user.firstname,
      // house: user.house,
      // bookings: user.bookings,
      // email: user.email,
      // createdAt: user.createdAt,
      uuid,
      roles,
      lastname,
      firstname,
      house,
      booking,
      email,
      createdAt,
>>>>>>> c3c8835f9cd4ed180d1fe9094bdca03e5eb80360
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_LOGIN_DURATION }
  )
}

module.exports = generateToken
