const { Suite, user } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const updateSuiteService = async (uuid, datas) => {
  try {
    const toUpdateSuite = await Suite.update(datas, {
      where: { uuid },
      returning: true,
    })
    if (!toUpdateSuite)
      return {
        serverError:
          'un problème est survenu lors de la modification de la suite',
      }

    const updatedSuite = await Suite.findOne({ where: { uuid } })

    return { updatedSuite }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = updateSuiteService
