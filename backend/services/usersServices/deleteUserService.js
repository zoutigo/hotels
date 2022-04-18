const { user } = require('../../database/models')

const deleteUserService = async (uuid) => {
  try {
    await user.destroy({ where: { uuid } })

    return { destroyed: true }
  } catch (error) {
    return { error, destroyed: false }
  }
}

module.exports = deleteUserService
