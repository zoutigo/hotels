/* eslint-disable dot-notation */
const jwt = require('jsonwebtoken')

const { Unauthorized, BadRequest, TokenInvalid } = require('../../utils/errors')
const { user } = require('../../database/models')
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

    const verifiedUser = await user.findOne({ where: { uuid } })
    if (!verifiedUser)
      return next(new BadRequest("Cet utilisateur n'existe plus"))

    req.user = { ...verifiedUser, roles: verifiedUser.getDataValue('roles') }

    next()
  } catch (err) {
    return next(
      new TokenInvalid(
        'Veillez vous connecter ou vous incrire pour obtenir cette ressource'
      )
    )
  }
  return null
}

module.exports = verifyTokenService
