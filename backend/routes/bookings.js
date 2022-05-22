const router = require('express').Router()
const { check, body, param } = require('express-validator')
const { QueryTypes } = require('sequelize')

const { suite, sequelize } = require('../database/models')

const {
  getBookingList,
  postBooking,
  putBooking,
  deleteBooking,
  getBooking,
  getUserBookings,
} = require('../controllers/bookingController')
const validate = require('../middlewares/validate')
const verifyTokenService = require('../services/usersServices/verifyTokenService')

/* GET bookings listing. */
router.get('/', getBookingList)

/* POST bookings creating. */
router.post(
  '/',
  validate([
    body('suiteUuid')
      .exists()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer la suite`)
      .isUUID()
      .withMessage(`format de la suite incorrect`)
      .custom((value) => {
        return sequelize
          .query('SELECT uuid from suites WHERE uuid = ? LIMIT 1', {
            type: QueryTypes.SELECT,
            model: suite,
            replacements: [value],
          })
          .then((suit) => {
            // console.log('suit', suit)
            if (!suit.length > 0) {
              return Promise.reject(`la suite n'existe plus`)
            }
          })
      }),
    body('startdate')
      .exists()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer la date de début`)
      .custom((value, { req }) => {
        return new Date(value).getTime() > 0
      })
      .withMessage(`format invalide pour la date de début`),
    body('enddate')
      .exists()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer la date de fin`)
      .custom((value, { req }) => {
        return new Date(value).getTime() > 0
      })
      .withMessage(`format invalide pour la date de début`),
    check('greather')
      .custom((value, { req }) => {
        return Number(req.body.enddate) > Number(req.body.startdate)
      })
      .withMessage(`La date de fin doit etre supérieure à la date de début`),
  ]),
  verifyTokenService,
  postBooking
)

/* GET bookings creating. */
router.get('/:bookingUuid', verifyTokenService, getBooking)

router.get(
  '/:bookingUuid',
  validate([
    param('bookingUuid')
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer la reservation recherchée`)
      .isUUID()
      .withMessage(`format de reservation  incorrect`),
  ]),
  verifyTokenService,
  getUserBookings
)

/* PUT bookings updating. */
router.put(
  '/:bookingUuid',
  validate([
    param('bookingUuid')
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer la reservation recherchée`)
      .isUUID()
      .withMessage(`format de reservation  incorrect`),
  ]),
  verifyTokenService,
  putBooking
)

/* PUT bookings updating. */
router.delete(
  '/:bookingUuid',
  validate([
    param('bookingUuid')
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer la reservation recherchée`)
      .isUUID()
      .withMessage(`format de reservation  incorrect`),
  ]),
  verifyTokenService,
  deleteBooking
)

module.exports = router
