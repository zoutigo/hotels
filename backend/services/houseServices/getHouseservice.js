const { house } = require('../../database/models')

const getHouseService = async (uuid) => {
  try {
    const requestedHouse = await house.findOne({ where: { uuid } })
    if (!requestedHouse)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    return { requestedHouse }
  } catch (error) {
    return { error }
  }
}

module.exports = getHouseService
