const { booking } = require('../../database/models')

const checkExistBookingService = async (bookingUuid) => {
  const checkedBooking = await booking.findOne({ where: { uuid: bookingUuid } })

  if (!checkedBooking) return { bookingExists: false }
  return { bookingExists: true }
}

module.exports = checkExistBookingService
