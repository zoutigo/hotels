const { booking } = require('../../database/models')

const deleteBookingService = async (uuid) => {
  try {
    await booking.destroy({ where: { uuid } })

    return { destroyed: true }
  } catch (error) {
    return { error, destroyed: false }
  }
}

module.exports = deleteBookingService
