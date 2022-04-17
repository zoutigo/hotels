const { House } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const createHouseService = async (house) => {
  try {
    const newHouse = await House.create(house)
    if (!newHouse)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    console.log('new house:', newHouse)
    return { newHouse }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = createHouseService
