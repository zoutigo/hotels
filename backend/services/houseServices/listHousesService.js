const { House } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const listHouseService = async () => {
  try {
    const houses = await House.findAll()
    if (!houses)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    return { houses }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = listHouseService
