const { user, suite, booking } = require('../../database/models')
const getDatesInRange = require('../../utils/getDatesInRange')

const createBookingService = async (datas, userUuid) => {
  const { suiteUuid, startdate, enddate, price } = datas

  try {
    const createdAt = new Date()
    const {
      0: first,
      length,
      [length - 1]: last,
    } = getDatesInRange(startdate, enddate)

    // réserver
    const currentUser = await user.findOne({ where: { uuid: userUuid } })
    const currentSuite = await suite.findOne({ where: { uuid: suiteUuid } })

    const numberDays = getDatesInRange(startdate, enddate).length
    const totalPrice = currentSuite.price * numberDays
    const bookingDatas = {
      startdate: first,
      enddate: last,
      price: Number(totalPrice),
      createdAt,
    }

    const newbook = await currentUser.createBooking({
      ...bookingDatas,
      suiteId: currentSuite.id,
    })

    if (newbook) {
      const {
        dataValues: { id, suiteId, userId, ...others },
      } = newbook
      return { createdBooking: { ...others }, serverError: false }
    }

    return { serverError: "une erreur s'est produite", createdBooking: null }
  } catch (error) {
    return { serverError: error, createdBooking: null }
  }
}

module.exports = createBookingService
