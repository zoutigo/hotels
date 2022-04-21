const { Op } = require('sequelize')
const { booking, suite } = require('../../database/models')
const getDatesInRange = require('../../utils/getDatesInRange')

const isSuiteAvailable = async (datas) => {
  const { suiteUuid, startdate, enddate } = datas

  const startRange = Number(startdate)
  const endRange = Number(enddate)
  const range = getDatesInRange(startdate, enddate)
  try {
    const currentSuite = await suite.findOne({ where: { uuid: suiteUuid } })

    // const existingBookings = await booking.findAll({
    //   where: {
    //     suiteId: currentSuite.id,
    //     [Op.or]: {
    //       startdate: { [Op.in]: range },
    //       enddate: { [Op.in]: range },
    //     },
    //   },
    // })
    const existingBookings = await booking.findAll({
      where: {
        suiteId: currentSuite.id,
      },
    })

    const booked1 = existingBookings.find(
      (booking) =>
        range.includes(Number(booking.startdate)) ||
        range.includes(Number(booking.enddate))
    )
    if (booked1) return { suiteIsAvailable: false }
    console.log('booked1--------------', booked1)

    console.log('------------------------checked: ', existingBookings)

    return { suiteIsAvailable: existingBookings && existingBookings.length < 1 }
  } catch (error) {
    console.log(error)
  }
  return true
}

module.exports = isSuiteAvailable

// const date = moment('2016-10-11 18:06:03').tz('Europe/Paris').format()
