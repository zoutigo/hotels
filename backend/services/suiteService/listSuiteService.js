const { suite, house } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const listSuiteService = async () => {
  try {
    const suites = await suite.findAll({
      include: {
        model: house,
        attributes: { exclude: ['id', 'userId'] },
        include: { model: suite, attributes: { exclude: ['id'] } },
      },
      attributes: { exclude: ['id', 'houseId'] },
    })
    if (!suites)
      return {
        serverError:
          'un problème est survenu lors de la création de la liste des suites',
      }
    return { suites }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = listSuiteService
