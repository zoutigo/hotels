const { suite, house } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const CreateSuiteService = async (data) => {
  const { images, houseUuid, ...rest } = data
  const createdAt = new Date()
  try {
    const requestedHouse = await house.findOne({ where: { uuid: houseUuid } })
    if (!requestedHouse) {
      return { error: "l'établissement n'existe pas" }
    }

    await requestedHouse.createSuite({ ...rest, createdAt })

    const createdSuite = await suite.findOne({ where: { createdAt } })

    const filenames = await Promise.all(
      images.map(async (image) => {
        await createdSuite.createImage(image)
        return image.filename
      })
    )

    const {
      dataValues: { id, ...others },
    } = createdSuite

    if (filenames.leght === images.lenght) {
      return { createdSuite: { ...others } }
    }
    return { error: "une erreur s'est produite" }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = CreateSuiteService
