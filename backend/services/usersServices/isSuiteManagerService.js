const { house, suite } = require('../../database/models')

const isSuiteManagerService = async (suiteUuid, userUuid) => {
  try {
    const checkedSuite = await suite.findOne({ where: { uuid: suiteUuid } })
    if (!checkedSuite)
      return { error: "la suite n'existe plus", isHouseManager: false }
    const checkedHouse = await checkedSuite.getHouse()
    const manager = await checkedHouse.getUser()

    return { isHouseManager: manager.uuid === userUuid }
  } catch (error) {
    return { error }
  }
}

module.exports = isSuiteManagerService
