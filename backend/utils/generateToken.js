const jwt = require('jsonwebtoken')
require('dotenv').config()

// eslint-disable-next-line import/prefer-default-export
const generateToken = (user) =>
  jwt.sign(
    {
      uuid: user.uuid,
      roles: user.roles,
      lastname: user.lastname,
      firstname: user.firstname,
      house: user.house,
      bookings: user.bookings,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_LOGIN_DURATION }
  )

module.exports = generateToken
