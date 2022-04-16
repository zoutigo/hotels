/* eslint-disable dot-notation */
const jwt = require('jsonwebtoken')

const { Unauthorized, BadRequest, TokenInvalid } = require('../../utils/errors')
const { User } = require('../../database/models')
const { userInclude } = require('../../constants/includes')

const verifyTokenService = async (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader === 'undefined') {
    return next(
      new Unauthorized(
        'veillez vous connecter au site pour acceder à cette ressource'
      )
    )
  }

  const bearer = bearerHeader.split(' ')
  const bearerToken = bearer[1]
  try {
    const verified = await jwt.verify(bearerToken, process.env.TOKEN_SECRET)
    if (!verified) return next(new BadRequest('Invalid Token'))
    const { uuid } = verified

    const user = await User.findOne({ where: { uuid } })
    if (!user) return next(new BadRequest("Cet utilisateur n'existe plus"))

    req.user = user
    next()
  } catch (err) {
    console.log(err)
    return next(new TokenInvalid(err))
  }
  return null
}

module.exports = verifyTokenService
