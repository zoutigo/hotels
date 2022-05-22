const bcrypt = require('bcrypt')
const { QueryTypes, Sequelize } = require('sequelize')
const { BadRequest } = require('../../utils/errors')
const { user, house, suite, sequelize } = require('../../database/models')
const generateToken = require('../../utils/generateToken')
const { userTokenInclude } = require('../../constants/includes')
const db = require('../../database/models')

const authenticate = async (req, res, next) => {
  const { username: email, password } = req.body

  try {
    const userVerified = await user.findOne({
      where: { email },
      include: userTokenInclude,
    })

    // const userVerified = await sequelize.query(
    //   'SELECT * FROM users WHERE email = ?',
    //   {
    //     type: QueryTypes.SELECT,
    //     model: user,
    //     replacements: [email],
    //     include: userTokenInclude,
    //   }
    // )

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
