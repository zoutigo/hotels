const { booking } = require('../../database/models')

const threeDaysBeforeEndservice = async (bookingUuid) => {
  const checkedBooking = await booking.findOne({
    where: { uuid: bookingUuid },
  })

  if (!booking) return { error: "cette reservation n'existe plus" }

  const { startdate } = checkedBooking

  const limit = 3600 * 24 * 3 * 1000 // 3 days in miliseconds

  const isThreeDaysBefore = startdate - limit > new Date().getTime()

  return { isThreeDaysBefore }
}

module.exports = threeDaysBeforeEndservice
