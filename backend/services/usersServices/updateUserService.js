const { User } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const updateUserService = async (uuid, datas) => {
  try {
    // const user = await User.findOne({ where: { uuid } })
    // const updatedUser = { ...user, ...datas }
    // const savedUser = await updatedUser.save()

    const newUser = await User.update(
      { ...datas },
      { where: { uuid }, returning: true }
    )
    if (!newUser)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    console.log('new', newUser)
    return { newUser }
  } catch (error) {
    console.log('err', error)
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = updateUserService
