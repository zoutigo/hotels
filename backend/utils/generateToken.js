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
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_LOGIN_DURATION }
  )
}

module.exports = generateToken
