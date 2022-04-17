const { Suite, house } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const CreateSuiteService = async (suite) => {
  const { images, houseUuid, ...rest } = suite
  console.log('rest:', rest)
  const createdAt = new Date()
  try {
    const requestedHouse = await house.findOne({ where: { uuid: houseUuid } })
    await requestedHouse.createSuite({ ...rest, createdAt })

    const createdSuite = await Suite.findOne({ where: { createdAt } })

    const filenames = await Promise.all(
      images.map(async (image) => {
        await createdSuite.createImage(image)
        return image.filename
      })
    )

    if (filenames.leght === images.lenght) {
      return { createdSuite }
    }
    return { error: "une erreur s'est produite" }
  } catch (error) {
    console.log('err', error)
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = CreateSuiteService
