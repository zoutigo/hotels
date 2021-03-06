const router = require('express').Router()

const {
  getBookingList,
  postBooking,
  putBooking,
  deleteBooking,
  getBooking,
  getUserBookings,
} = require('../controllers/bookingController')
const verifyTokenService = require('../services/usersServices/verifyTokenService')

/* GET bookings listing. */
router.get('/', getBookingList)

/* POST bookings creating. */
router.post('/', verifyTokenService, postBooking)

/* GET bookings creating. */
router.get('/:bookingUuid', verifyTokenService, getBooking)

router.get('/:bookingUuid', verifyTokenService, getUserBookings)

/* PUT bookings updating. */
router.put('/:bookingUuid', verifyTokenService, putBooking)

/* PUT bookings updating. */
router.delete('/:bookingUuid', verifyTokenService, deleteBooking)

module.exports = router
