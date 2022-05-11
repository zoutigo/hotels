const { house } = require('../../database/models')

const isHouseManagerService = async (houseUuid, userUuid) => {
  let userIsHouseManager = false
  if (!userUuid) return { userIsHouseManager }
  const checkedHouse = await house.findOne({ where: { uuid: houseUuid } })
  if (!checkedHouse) {
    return { userIsHouseManager }
  }
  const manager = await checkedHouse.getUser()

  userIsHouseManager = manager?.uuid === userUuid

  return { userIsHouseManager }
}

module.exports = isHouseManagerService
