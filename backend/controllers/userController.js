const bcrypt = require('bcrypt')
const { uuidRegexExp } = require('../constants/regex')
const { user, house } = require('../database/models')
const authenticate = require('../services/usersServices/authenticate')
const createUserService = require('../services/usersServices/createUserService')
const deleteUserService = require('../services/usersServices/deleteUserService')
const getUserBookingService = require('../services/usersServices/getUserBookingsService')
const getUserService = require('../services/usersServices/getUserService')
const updateUserService = require('../services/usersServices/updateUserService')
const {
  BadRequest,
  Forbidden,
  Unauthorized,
  NotFound,
} = require('../utils/errors')

module.exports.login = authenticate

module.exports.getUsers = async (req, res, next) => {
  const users = await user.findAll({
    raw: true,
    order: [['lastname', 'ASC']],
    // include: { all: true, nested: true },
    // include: [
    //   {
    //     model: house,
    //     attributes: ['name', 'uuid'],
    //     as: 'house',
    //     right: true,
    //   },
    // ],
  })

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

  // password hash
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // default roles
  const roles = ['client']

  // email token

  const toCreateUser = {
    email,
    password: hashedPassword,
    lastname,
    firstname,
    roles,
  }

  const { errors, serverError, createdUser } = await createUserService(
    toCreateUser
  )
  if (errors && errors.length > 0) return next(new BadRequest(errors.join()))
  if (serverError) return next(serverError)

  return res.status(201).send({
    datas: createdUser,
    message: 'Votre compte client est correctement crée.',
  })
}

module.exports.getUser = async (req, res, next) => {
  if (!req.params || !req.params.uuid)
    return next(new BadRequest("veillez indiquer l'utilisateur recherché"))

  if (!uuidRegexExp.test(req.params.uuid))
    return next(new BadRequest("ceci n'est pas l'identifiant d'un utilisateur"))

  const { roles, uuid: userUuid } = req.user

  const isAllowedRole = roles.includes('manager') || roles.includes('admin')

  const isAllowedUser = userUuid === req.params.uuid

  const isAllowed = isAllowedUser || isAllowedRole

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez pas consulter cette information'))

  const { error, user, serverError } = await getUserService(req.params.uuid)
  if (serverError) return next(serverError)
  if (error) return next(new BadRequest(error))

  return res.status(200).send(user)
}
module.exports.getUserBookings = async (req, res, next) => {
  if (!req.params || !req.params.uuid)
    return next(new BadRequest("veillez indiquer l'utilisateur recherché"))

  const {
    dataValues: { uuid: userUuid, roles },
  } = req.user

  const isAllowedRole = roles.includes('manager') || roles.includes('admin')

  const isAllowedUser = userUuid === req.params.uuid

  const isAllowed = isAllowedUser || isAllowedRole

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez pas consulter cette information'))

  const { error, bookings } = await getUserBookingService(req.params.uuid)
  if (error) return next(error)
  if (!bookings)
    return next(new NotFound("vous n'avez pas de reservation actuellement"))

  return res.status(200).send(bookings)
}

module.exports.putUsers = async (req, res, next) => {
  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('veillez renseigner les champs de données'))

  if (!req.params || !req.params.uuid)
    return next(new BadRequest("veillez indiquer l'utilisateur recherché"))

  // if (!uuidRegexExp.test(req.params.uuid))
  //   return next(new BadRequest("ceci n'est pas l'identifiant d'un utilisateur"))

  const {
    dataValues: { uuid: userUuid, roles },
  } = req.user

  const isAllowedRole = roles.includes('manager') || roles.includes('admin')

  const isAllowedUser = userUuid === req.params.uuid

  const isAllowed = isAllowedUser || isAllowedRole

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez pas consulter cette information'))

  const { roles: toUpdateRoles, ...rest } = req.body

  if (toUpdateRoles) {
    const isAllowedToChangeRoles = roles.includes('admin')

    if (!isAllowedToChangeRoles)
      return next(
        new Unauthorized(
          "vous n'etes pas authorisés à changer les roles des utilisateurs"
        )
      )
  }

  const { errors, serverError, newUser } = await updateUserService(
    req.params.uuid,
    req.body
  )
  if (errors && errors.length > 0) return next(new BadRequest(errors.join()))
  if (serverError) return next(serverError)

  return res.status(200).send({
    datas: newUser,
    message: "L'utilisateur a été correctement modifié",
  })
}

module.exports.deleteUsers = async (req, res, next) => {
  if (!req.params || !req.params.uuid)
    return next(new BadRequest("veillez indiquer l'utilisateur recherché"))

  const {
    dataValues: { uuid: userUuid, roles },
  } = req.user

  const isAllowedRole = roles.includes('manager') || roles.includes('admin')

  const isAllowedUser = userUuid === req.params.uuid

  const isAllowed = isAllowedUser || isAllowedRole

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez pas consulter cette information'))

  const { error, destroyed } = await deleteUserService(req.params.uuid)

  if (error) return next(new BadRequest(error))
  return res.status(200).send({ message: 'utilisateur supprimé avec succès' })
}
