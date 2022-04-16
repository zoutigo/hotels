const { User } = require('../../database/models')

const getUserService = async (uuid) => {
  try {
    const user = await User.findOne({ where: { uuid } })
    if (!user)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    return { user }
  } catch (error) {
    return { error }
  }
}

module.exports = getUserService
