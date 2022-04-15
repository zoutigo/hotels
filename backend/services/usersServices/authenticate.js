const bcrypt = require('bcrypt')
const { BadRequest } = require('../../utils/errors')
const { User } = require('../../database/models')
const generateToken = require('../../utils/generateToken')

const authenticate = async (req, res, next) => {
  const { username: email, password } = req.body
  if (!email || !password) {
    return next(new BadRequest('password or email missing'))
  }

  const userVerified = await User.findOne({
    where: { email },
  })

  // check password
  const passwordVerified = await bcrypt.compare(password, userVerified.password)
  if (!passwordVerified)
    return next(new BadRequest('email ou mot de pass invalide'))

  return res.status(200).send({
    message: 'connection effectuée avec succès',
    datas: {
      token: generateToken(userVerified),
      userVerified,
    },
  })
}

module.exports = authenticate
