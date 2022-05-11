const { suiteAttributes } = require('../../constants/attributes')
const { suiteInclude } = require('../../constants/includes')
const { suite, house, image } = require('../../database/models')

const getSuiteService = async (uuid) => {
  try {
    const requestedSuite = await suite.findOne({
      where: { uuid },
      include: suiteInclude,
      attributes: suiteAttributes,
    })
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
