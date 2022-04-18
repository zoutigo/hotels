const { Op } = require('sequelize')
const { booking, suite } = require('../../database/models')
const getDatesInRange = require('../../utils/getDatesInRange')

const isSuiteAvailable = async (datas) => {
  const { suiteUuid, startdate, enddate } = datas
  try {
    const currentSuite = await suite.findOne({ where: { uuid: suiteUuid } })

    const existingBookings = await booking.findAll({
      where: {
        suiteId: currentSuite.id,
        [Op.or]: [
          { startdate: getDatesInRange(startdate, enddate) },
          { enddate: getDatesInRange(startdate, enddate) },
        ],
      },
    })

    return { suiteIsAvailable: existingBookings && existingBookings.length < 1 }
  } catch (error) {
    console.log(error)
  }
  return true
}

module.exports = isSuiteAvailable

// const date = moment('2016-10-11 18:06:03').tz('Europe/Paris').format()
