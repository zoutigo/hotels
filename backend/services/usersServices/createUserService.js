const { User } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const createUserService = async (user) => {
  try {
    const newUser = await User.create(user)
    if (!newUser)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    return { newUser }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = createUserService
