const { Op } = require('sequelize')
const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)

const { booking } = require('../../database/models')
const { user, suite } = require('../../database/models')
const getDatesInRange = require('../../utils/getDatesInRange')

const createBookingService = async (datas) => {
  const { suiteUuid, userUuid, startdate, enddate, price } = datas
  const createdAt = new Date()
  try {
    // réserver
    const currentUser = await user.findOne({ where: { uuid: userUuid } })
    const currentSuite = await suite.findOne({ where: { uuid: suiteUuid } })

    const newBooking = await booking.create({
      startdate: startdate,
      enddate: enddate,
      // price: Number(
      //   currentSuite.price * getDatesInRange(startdate, enddate).count()
      // ),
      price: Number(price),
      suiteId: currentSuite.id,
      userId: currentUser.id,
      createdAt,
    })

    if (newBooking) {
      const createdBooking = await booking.findOne({
        where: {
          createdAt,
        },
      })
      return { createdBooking }
    }

    return { error: "une erreur s'est produite" }
  } catch (error) {
    return { error }
  }
}

module.exports = createBookingService
