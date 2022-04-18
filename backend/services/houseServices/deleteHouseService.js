const { house } = require('../../database/models')

const deleteHouseService = async (uuid) => {
  try {
    await house.destroy({ where: { uuid } })

    return { destroyed: true }
  } catch (error) {
    return { error, destroyed: false }
  }
}

module.exports = deleteHouseService
