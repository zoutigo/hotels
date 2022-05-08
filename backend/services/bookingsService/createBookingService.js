const { Op } = require('sequelize')
const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)

const { user, suite, booking } = require('../../database/models')
const getDatesInRange = require('../../utils/getDatesInRange')

const createBookingService = async (datas, userUuid) => {
  const { suiteUuid, startdate, enddate, price } = datas
  console.log('datas:', datas)

  try {
    const createdAt = new Date()
    const {
      0: first,
      length,
      [length - 1]: last,
    } = getDatesInRange(startdate, enddate)

    console.log('after range creation ----------------------')
    console.log('first ----', first)
    // réserver
    const currentUser = await user.findOne({ where: { uuid: userUuid } })
    const currentSuite = await suite.findOne({ where: { uuid: suiteUuid } })

    console.log('start booking creation ----------------------')
    const bookingDatas = {
      startdate: first,
      enddate: last,
      price: Number(price),
      createdAt,
    }
    console.log('before booking creation ----------------------')

    const newbook = await currentUser.createBooking({
      ...bookingDatas,
      suiteId: currentSuite.id,
    })

    console.log('after booking creation ----------------------')

    if (newbook) {
      return { createdBooking: newbook, serverError: false }
    }

    return { serverError: "une erreur s'est produite", createdBooking: null }
  } catch (error) {
    console.log('error:', error)
    return { serverError: error, createdBooking: null }
  }
}

module.exports = createBookingService
