const { Op } = require('sequelize')
const { booking, suite } = require('../../database/models')
const getDatesInRange = require('../../utils/getDatesInRange')

const isSuiteAvailable = async (datas) => {
  const { suiteUuid, startdate, enddate } = datas

  const startRange = Number(startdate)
  const endRange = Number(enddate)
  const range = getDatesInRange(startdate, enddate)
  try {
    const currentSuite = await suite.findOne({
      where: { uuid: suiteUuid },
    })
    if (!currentSuite)
      return { suiteIsAvailable: false, error: 'la suite exite pas' }

    const bookings = await currentSuite.getBookings()
    if (!bookings) return { suiteIsAvailable: true, error: false }

    const matchBooking = bookings.find(
      (booking) =>
        range.includes(Number(booking.startdate)) ||
        range.includes(Number(booking.enddate))
    )

    if (matchBooking) return { suiteIsAvailable: false, error: false }

    return { suiteIsAvailable: true, error: false }
  } catch (error) {
    return { suiteIsAvailable: false, error }
  }
  return true
}

module.exports = isSuiteAvailable
