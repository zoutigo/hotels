const jwt = require('jsonwebtoken')
const { userInclude } = require('../constants/includes')
const { User } = require('../database/models')
const { Unauthorized, BadRequest, TokenInvalid } = require('../utils/errors')

module.exports.tokenVerify = async (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return next(new Unauthorized('veillez vous connecter au site'))
  }
  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET)
    if (!verified) return next(new BadRequest('Invalid Token'))
    const { uuid } = verified

    const user = await User.findOne({ where: { uuid }, include: userInclude })
    if (!user) return next(new BadRequest("Cet utilisateur n'existe plus"))

    req.user = user
    next()
  } catch (err) {
    return next(new TokenInvalid(err))
  }
}
