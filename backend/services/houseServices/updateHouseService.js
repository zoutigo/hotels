const { House, user } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const updateHouseService = async (uuid, datas) => {
  try {
    const { managerUuid, ...rest } = datas

    const toUpdateHouse = await House.update(
      { ...rest },
      { where: { uuid }, returning: true }
    )
    if (!toUpdateHouse)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }

    const updatedHouse = await House.findOne({ where: { uuid } })
    const manager = await user.findOne({ where: { uuid: managerUuid } })
    await manager.setHouse(updatedHouse)

    return { updatedHouse }
  } catch (error) {
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = updateHouseService
