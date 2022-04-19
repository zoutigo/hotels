const { house, suite } = require('../../database/models')

const isSuiteManagerService = async (suiteUuid, userUuid) => {
  try {
    let isHouseManager = false
    const checkedSuite = await suite.findOne({ where: { uuid: suiteUuid } })
    const checkedHouse = await checkedSuite.getHouse()
    const manager = await checkedHouse.getUser()

    isHouseManager = manager.uuid === userUuid

    return { isHouseManager }
  } catch (error) {
    console.log('error')
  }
}

module.exports = isSuiteManagerService