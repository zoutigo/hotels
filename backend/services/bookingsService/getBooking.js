const { booking } = require('../../database/models')

const getBookingService = async (uuid) => {
  try {
    const requestedBooking = await booking.findOne({ where: { uuid } })
    if (!requestedBooking)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    return { requestedBooking }
  } catch (error) {
    return { error }
  }
}

module.exports = getBookingService
