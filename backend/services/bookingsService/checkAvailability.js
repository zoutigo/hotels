const { Op } = require('sequelize')
const { booking, suite } = require('../../database/models')
const getDatesInRange = require('../../utils/getDatesInRange')

const isSuiteAvailable = async (datas) => {
  const { suiteUuid, startdate, enddate } = datas

  const range = getDatesInRange(startdate, enddate)

  try {
    const currentSuite = await suite.findOne({
      where: { uuid: suiteUuid },
    })

    if (!currentSuite)
      return {
        suiteIsAvailable: false,
        msg: 'la suite exite pas',
        error: false,
      }

    const bookings = await currentSuite.getBookings()
    if (!bookings) return { suiteIsAvailable: true, error: false, msg: '' }

    const matchBooking = bookings.find(
      (booking) =>
        range.includes(Number(booking.startdate)) ||
        range.includes(Number(booking.enddate))
    )

    if (matchBooking)
      return {
        suiteIsAvailable: false,
        error: false,
        msg: 'Ces dates ne sont pas disponibles à la réservation',
      }

    return { suiteIsAvailable: true, error: false, msg: '' }
  } catch (error) {
    return { suiteIsAvailable: false, error, msg: '' }
  }
}

module.exports = isSuiteAvailable
