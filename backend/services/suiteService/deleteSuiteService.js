const { suite } = require('../../database/models')

const deleteSuiteService = async (uuid) => {
  try {
    await suite.destroy({ where: { uuid } })

    return { destroyed: true, error: null }
  } catch (error) {
    return { error, destroyed: false }
  }
}

module.exports = deleteSuiteService
