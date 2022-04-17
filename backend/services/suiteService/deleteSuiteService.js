const { Suite } = require('../../database/models')

const deleteSuiteService = async (uuid) => {
  try {
    await Suite.destroy({ where: { uuid } })

    return { destroyed: true }
  } catch (error) {
    return { error, destroyed: false }
  }
}

module.exports = deleteSuiteService
