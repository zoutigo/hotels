const { booking } = require('../../database/models')

const checkBookingOwnerService = async (userUuid, bookingUuid) => {
  try {
    const checkedBooking = await booking.findOne({
      where: { uuid: bookingUuid },
    })

    const owner = await checkedBooking.getUser()

    if (!owner) return { isOwner: false, error: false }

    return { isOwner: owner.uuid === userUuid, error: false }
  } catch (error) {
    return { isOwner: false, error }
  }
}

module.exports = checkBookingOwnerService
