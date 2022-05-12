const { booking } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const listBookingService = async () => {
  try {
    const bookings = await booking.findAll({
      attributes: { exclude: ['id', 'suiteId', 'userId'] },
    })
    if (!bookings)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    return { bookings }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = listBookingService
