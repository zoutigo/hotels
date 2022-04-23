const isSuiteAvailable = require('../services/bookingsService/checkAvailability')
const checkExistBookingService = require('../services/bookingsService/checkExistBookingService')
const createBookingService = require('../services/bookingsService/createBookingService')
const deleteBookingService = require('../services/bookingsService/deleteBookingService')
const getBookingService = require('../services/bookingsService/getBooking')
const listBookingService = require('../services/bookingsService/listBookingService')
const threeDaysBeforeEndservice = require('../services/bookingsService/threeDaysBeforeEndService')
const isBookingHouseManagerService = require('../services/usersServices/isBookingHouseManagerService')
const isBookingOwnerService = require('../services/usersServices/isBookingOwnerService')
const refreshTokenService = require('../services/usersServices/refreshTokenService')
const {
  BadRequest,
  Forbidden,
  Conflit,
  Unauthorized,
  NotFound,
} = require('../utils/errors')

module.exports.getBookingList = async (req, res, next) => {
  const { bookings, serverError, errors } = await listBookingService()

  if (errors && errors.length > 0) return next(new BadRequest(errors.join()))
  if (serverError) return next(serverError)

  return res.status(200).send({
    datas: bookings,
  })
}
module.exports.postBooking = async (req, res, next) => {
  if (Object.keys(req.body).length < 1)
    return next(
      new BadRequest('veillez renseigner les informations de reservation')
    )

  const { roles, uuid: userUuid } = req.user
  const { suiteUuid } = req.body

  if (!suiteUuid) return next(new BadRequest('veillez indiquer la suite'))

  // On peut vérifier si la suite exite encore

  req.body.userUuid = userUuid

  const { suiteIsAvailable, error } = await isSuiteAvailable(req.body)

  if (error) {
    return next(error)
  }

  if (!suiteIsAvailable)
    return next(
      new Conflit('Ces dates ne sont pas disponibles pour cette suite')
    )

  const { createdBooking, errors, serverError } = await createBookingService(
    req.body
  )

  if (serverError) return next(serverError)
  if (errors) return next(new BadRequest(errors.join(' ')))
  const token = await refreshTokenService(userUuid)

  return res.status(200).send({
    message: 'la reservation a bien été effectuée',
    datas: createdBooking,
    token,
  })
}

/// details opérations
module.exports.getBooking = async (req, res, next) => {
  if (!req.params || !req.params.bookingUuid)
    return next(new BadRequest('veillez indiquer la suite recherchée'))

  const { bookingUuid } = req.params
  const { roles, uuid: userUuid } = req.user

  const isAllowedRole = roles.includes('admin')

  // on peut aussi donner l'acces au manager et au propiétaire

  const isAllowed = isAllowedRole

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez pas consulter cette information'))

  const { error, requestedBooking, serverError } = await getBookingService(
    bookingUuid
  )
  if (serverError) return next(serverError)
  if (error) return next(new BadRequest(error))

  return res.status(200).send(requestedBooking)
}
module.exports.putBooking = async (req, res, next) => {
  res.send('put booking')
}
module.exports.deleteBooking = async (req, res, next) => {
  if (!req.params || !req.params.bookingUuid)
    return next(new BadRequest('veillez indiquer la suite recherchée'))

  const { bookingUuid } = req.params
  const { roles, uuid: userUuid } = req.user
  const isAllowedRole = roles.includes('admin')

  const { bookingExists } = await checkExistBookingService(bookingUuid)
  if (!bookingExists) return next(new NotFound("la reservation n'exitse plus"))

  const { userIsBookingOwner } = await isBookingOwnerService(
    bookingUuid,
    userUuid
  )
  const { userIsBookingHouseManager } = await isBookingHouseManagerService(
    bookingUuid,
    userUuid
  )
  const userIsAllowed = userIsBookingOwner || userIsBookingHouseManager

  const isAllowed = isAllowedRole || userIsAllowed

  if (!isAllowed)
    return next(
      new Unauthorized(
        "vous n'avez pas les droits pour supprimer cette reservation"
      )
    )

  const { isThreeDaysbefore } = await threeDaysBeforeEndservice(bookingUuid)

  if (isThreeDaysbefore)
    return next(
      new Forbidden(
        'Annulation impossible 3 jours avant la date de debut de la reservation. Veillez contacter le manager de cet etablissement '
      )
    )

  const { error, destroyed } = await deleteBookingService(bookingUuid)

  if (error && !destroyed) return next(error)

  return res.status(200).send({ message: 'la reservationa bien été supprimée' })
}
