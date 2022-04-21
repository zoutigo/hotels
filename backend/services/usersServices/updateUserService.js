const { user } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const updateUserService = async (uuid, datas) => {
  try {
    const newUser = await user.update(
      { ...datas },
      { where: { uuid }, returning: true }
    )
    if (!newUser)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }

    return { newUser }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = updateUserService
