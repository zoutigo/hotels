const { house, user } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const updateHouseService = async (uuid, datas) => {
  try {
    const { managerUuid, ...rest } = datas
    console.log('-------------------------uuid:', uuid)
    const toUpdateHouse = await house.update({ ...rest }, { where: { uuid } })
    if (!toUpdateHouse)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }

    const updatedHouse = await house.findOne({ where: { uuid } })
    if (managerUuid) {
      const manager = await user.findOne({ where: { uuid: managerUuid } })
      await manager.setHouse(updatedHouse)
    }

    return { updatedHouse }
  } catch (error) {
    console.log(error)
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = updateHouseService
