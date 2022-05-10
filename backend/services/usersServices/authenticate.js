const bcrypt = require('bcrypt')
const { BadRequest } = require('../../utils/errors')
const { user, house, suite } = require('../../database/models')
const generateToken = require('../../utils/generateToken')
const { userTokenInclude } = require('../../constants/includes')

const authenticate = async (req, res, next) => {
  const { username: email, password } = req.body
  if (!email || !password) {
    return next(new BadRequest('password or email missing'))
  }

  try {
    const userVerified = await user.findOne({
      where: { email },
      include: userTokenInclude,
    })

    if (!userVerified) {
      return next(new BadRequest('utilisateur inconnu'))
    }

    // check password
    const passwordVerified = await bcrypt.compare(
      password,
      userVerified.dataValues.password
    )
    if (!passwordVerified)
      return next(new BadRequest('email ou mot de pass invalide'))

    return res.status(200).send({
      message: 'connection effectuée avec succès',
      token: generateToken(userVerified),
    })
  } catch (error) {
    console.log('err', error)
    return next(error)
  }
}

module.exports = authenticate
