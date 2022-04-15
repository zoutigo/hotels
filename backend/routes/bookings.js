const router = require('express').Router()

const {
  getBookingList,
  postBooking,
  putBooking,
  deleteBooking,
  getBooking,
} = require('../controllers/bookingController')

/* GET bookings listing. */
router.get('/', getBookingList)

/* POST bookings creating. */
router.post('/', postBooking)

/* GET bookings creating. */
router.get('/{uuid}', getBooking)

/* PUT bookings updating. */
router.put('/{uuid}', putBooking)

/* PUT bookings updating. */
router.delete('/{uuid}', deleteBooking)

module.exports = router
