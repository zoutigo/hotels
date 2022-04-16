const bcrypt = require('bcrypt')
const { User } = require('../database/models')
const authenticate = require('../services/usersServices/authenticate')
const createUserService = require('../services/usersServices/createUserService')
const { BadRequest } = require('../utils/errors')

module.exports.login = authenticate

module.exports.getUsers = async (req, res, next) => {
  const users = await User.findAll()

  if (!users) {
    return BadRequest('no users')
  }

  return res.status(200).send(users)
}
module.exports.postUsers = async (req, res, next) => {
  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('veillez renseigner les champs de données'))

  const mandatorydFields = [
    'email',
    'password',
    'passwordConfirm',
    'lastname',
    'firstname',
  ]

  const submittedFields = mandatorydFields.filter(
    (field) => Object.keys(req.body).includes(field) === true
  )
  if (!(submittedFields.length === mandatorydFields.length))
    return next(new BadRequest('Une ou plusieurs données manquent'))

  const { password, passwordConfirm, email, lastname, firstname } = req.body
  if (!(password === passwordConfirm))
    return next(new BadRequest('Les mots de pass saisis sont différents'))

  // check if email exist in database
  // const checkedEmail = await User.findOne({ where: { email } })
  // if (checkedEmail)
  //   return next(new BadRequest(`cet email est deja détenu par un utilisateur`))

  // password hash
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // default roles
  const roles = ['client']

  // email token

  const user = {
    email,
    password: hashedPassword,
    lastname,
    firstname,
    roles,
  }

  const { errors, serverError, newUser } = await createUserService(user)
  if (errors && errors.length > 0) return next(new BadRequest(errors.join()))
  if (serverError) return next(serverError)

  return res.status(201).send({
    datas: newUser,
    message: 'Votre compte client est correctement crée.',
  })
}

module.exports.getUser = async (req, res, next) => {
  res.send('get user')
}
module.exports.putUsers = async (req, res, next) => {
  res.send('put user')
}
module.exports.deleteUsers = async (req, res, next) => {
  res.send('delete user')
}
