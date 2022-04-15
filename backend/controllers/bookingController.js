const { Booking } = require('../database/models')
const { BadRequest } = require('../utils/errors')

module.exports.getBookingList = async (req, res, next) => {
  const bookings = await Booking.findAll()

  if (!bookings) {
    return BadRequest('bookings')
  }

  return res.status(200).send(bookings)
}
module.exports.postBooking = async (req, res, next) => {
  res.send('postbooking')
}

/// details opérations
module.exports.getBooking = async (req, res, next) => {
  res.send('get booking')
}
module.exports.putBooking = async (req, res, next) => {
  res.send('put booking')
}
module.exports.deleteBooking = async (req, res, next) => {
  res.send('delete booking')
}
