const { suite, user } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const updateSuiteService = async (uuid, datas) => {
  const { images, ...rest } = datas
  try {
    const toUpdateSuite = await suite.update(rest, {
      where: { uuid },
      returning: true,
    })
    if (!toUpdateSuite)
      return {
        serverError:
          'un problème est survenu lors de la modification de la suite',
      }

    const updatedSuite = await suite.findOne({ where: { uuid } })
    if (images && images.length > 0) {
      const filenames = await Promise.all(
        images.map(async (image) => {
          await updatedSuite.createImage(image)
          return image.filename
        })
      )
      if (filenames.leght === images.lenght) {
        return { updatedSuite, error: null }
      }
    }

    return { updatedSuite, error: null }
  } catch (error) {
    console.log('error', error)
    return { errors: getValidationErrorsArray(error), updatedSuite: null }
  }
}

module.exports = updateSuiteService
