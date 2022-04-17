const { user } = require('../../database/models')

const existUserService = async (uuid) => {
  const existUser = await user.findOne({ where: { uuid } })
  if (!existUser) return { error: 'cet utilisateur est un inconnu' }

  return { existUser }
}

module.exports = existUserService
