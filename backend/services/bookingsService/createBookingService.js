const { Op } = require('sequelize')
const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)

const { user, suite, booking } = require('../../database/models')
const getDatesInRange = require('../../utils/getDatesInRange')

const createBookingService = async (datas) => {
  const { suiteUuid, userUuid, startdate, enddate, price } = datas

  const {
    0: first,
    length,
    [length - 1]: last,
  } = getDatesInRange(startdate, enddate)

  const createdAt = new Date()
  try {
    // réserver
    const currentUser = await user.findOne({ where: { uuid: userUuid } })
    const currentSuite = await suite.findOne({ where: { uuid: suiteUuid } })
    const bookingDatas = {
      startdate: first,
      enddate: last,
      price: Number(price),
      createdAt,
    }

    const newbook = await currentUser.createBooking({
      ...bookingDatas,
      suiteId: currentSuite.id,
    })

    if (newbook) {
      return { createdBooking: newbook, error: false }
    }

    return { error: "une erreur s'est produite" }
  } catch (error) {
    return { error, createdBooking: null }
  }
}

module.exports = createBookingService
