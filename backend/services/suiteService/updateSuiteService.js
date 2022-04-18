const { suite, user } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const updateSuiteService = async (uuid, datas) => {
  try {
    const toUpdateSuite = await suite.update(datas, {
      where: { uuid },
      returning: true,
    })
    if (!toUpdateSuite)
      return {
        serverError:
          'un problème est survenu lors de la modification de la suite',
      }

    const updatedSuite = await suite.findOne({ where: { uuid } })

    return { updatedSuite }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = updateSuiteService
