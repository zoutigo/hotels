const { suite } = require('../../database/models')

const getSuiteService = async (uuid) => {
  try {
    const requestedSuite = await suite.findOne({ where: { uuid } })
    if (!requestedSuite)
      return {
        serverError: 'un problème est survenu lors de la création de la suite',
      }
    return { requestedSuite }
  } catch (error) {
    return { error }
  }
}

module.exports = getSuiteService
