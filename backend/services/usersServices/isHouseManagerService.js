const { house } = require('../../database/models')

const isHouseManagerService = async (houseUuid, userUuid) => {
  const checkedHouse = await house.findOne({ where: { uuid: houseUuid } })
  const manager = await checkedHouse.getUser()

  const userIsHouseManager = manager.uuid === userUuid

  return { userIsHouseManager }
}

module.exports = isHouseManagerService
