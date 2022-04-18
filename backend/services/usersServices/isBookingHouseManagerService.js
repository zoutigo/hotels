const { booking } = require('../../database/models')

const isBookingHouseManagerService = async (bookingUuid, userUuid) => {
  const checkedBooking = await booking.findOne({ where: { uuid: bookingUuid } })
  const suiteBooked = await checkedBooking.getSuite()
  const houseBooked = await suiteBooked.getHouse()
  const manager = await houseBooked.getUser()

  return { userIsBookingHouseManager: manager.uuid === userUuid }
}

module.exports = isBookingHouseManagerService
