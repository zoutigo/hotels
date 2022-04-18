const { user } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const createUserService = async (usere) => {
  try {
    const newUser = await user.create(usere)
    if (!newUser)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    return { newUser }
  } catch (error) {
    console.log(error)
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = createUserService
