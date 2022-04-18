const bcrypt = require('bcrypt')
const { BadRequest } = require('../../utils/errors')
const { user } = require('../../database/models')
const generateToken = require('../../utils/generateToken')
const { userInclude } = require('../../constants/includes')

const authenticate = async (req, res, next) => {
  const { username: email, password } = req.body
  if (!email || !password) {
    return next(new BadRequest('password or email missing'))
  }

  const userVerified = await user.findOne({
    where: { email },
    // include: userInclude,
  })

  if (!userVerified) {
    return next(new BadRequest('utilisateur inconnu'))
  }

  // check password
  const passwordVerified = await bcrypt.compare(password, userVerified.password)
  if (!passwordVerified)
    return next(new BadRequest('email ou mot de pass invalide'))

  const userInfos = {
    token: generateToken(userVerified),
    lastname: userVerified.lastname,
    firstname: userVerified.firstname,
    email: userVerified.email,
    roles: userVerified.roles,
    uuid: userVerified.uuid,
  }

  return res.status(200).send({
    message: 'connection effectuée avec succès',
    datas: userInfos,
  })
}

module.exports = authenticate
