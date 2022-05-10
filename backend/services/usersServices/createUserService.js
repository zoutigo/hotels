const { user } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const createUserService = async (usere) => {
  try {
    const newUser = await user.create(usere)
    if (!newUser)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    const {
      dataValues: { id, password, ...rest },
    } = newUser
    const createdUser = Object.assign({}, rest)

    return { createdUser }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = createUserService
