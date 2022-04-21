const { user } = require('../../database/models')

const getUserService = async (uuid) => {
  try {
    const requestedUser = await user.findOne({ where: { uuid } })
    if (!requestedUser)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    return { user: requestedUser }
  } catch (error) {
    return { error }
  }
}

module.exports = getUserService
