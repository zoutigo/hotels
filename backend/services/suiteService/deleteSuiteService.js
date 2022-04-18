const { suite } = require('../../database/models')

const deleteSuiteService = async (uuid) => {
  try {
    await suite.destroy({ where: { uuid } })

    return { destroyed: true }
  } catch (error) {
    return { error, destroyed: false }
  }
}

module.exports = deleteSuiteService
