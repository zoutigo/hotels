const { house, suite } = require('../../database/models')

const getHouseService = async (uuid) => {
  try {
    const requestedHouse = await house.findOne({
      where: { uuid },
      // include: { model: suite },
      include: { all: true, nested: true },
    })

    return { requestedHouse }
  } catch (error) {
    return { error }
  }
}

module.exports = getHouseService
