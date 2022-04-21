const { booking } = require('../../database/models')

const isBookingOwnerService = async (bookingUuid, userUuid) => {
  const checkedBooking = await booking.findOne({ where: { uuid: bookingUuid } })

  const owner = await checkedBooking.getUser()

  return { userIsBookingOwner: owner.uuid === userUuid }
}

module.exports = isBookingOwnerService
