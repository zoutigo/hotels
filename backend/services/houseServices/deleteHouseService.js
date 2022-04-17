const { House } = require('../../database/models')

const deleteHouseService = async (uuid) => {
  try {
    await House.destroy({ where: { uuid } })

    return { destroyed: true }
  } catch (error) {
    return { error, destroyed: false }
  }
}

module.exports = deleteHouseService
