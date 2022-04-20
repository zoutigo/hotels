const { house } = require('../../database/models')
const slugify = require('../../utils/slugify')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const createHouseService = async (data) => {
  try {
    const newHouse = await house.create({ ...data, slug: slugify(data.name) })
    if (!newHouse)
      return {
        serverError: 'un problème est survenu lors de la création de la suite',
      }

    return { newHouse }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = createHouseService
