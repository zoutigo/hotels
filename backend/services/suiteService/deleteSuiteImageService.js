const { suite, image } = require('../../database/models')
const deleteFileStorage = require('../ImagesService/deleteImageStorage')

const deleteSuiteImageService = async (suiteUuid, imageUuid) => {
  try {
    const toDeleteImage = await image.findOne({ where: { uuid: imageUuid } })
    if (!toDeleteImage) return { error: "l'image n'existe plus" }

    const { filepath } = toDeleteImage

    await deleteFileStorage(filepath)

    const toDestroyImage = await toDeleteImage.destroy()

    if (!toDestroyImage) {
      return {
        error: "une erreur s'est produite lors de la destruction de l'image",
      }
    }

    return { destroyed: true }
  } catch (error) {
    console.log(error)
    return { error, destroyed: false }
  }
}

module.exports = deleteSuiteImageService
