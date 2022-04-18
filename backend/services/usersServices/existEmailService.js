const { user } = require('../../database/models')

const existEmailService = async (email) => {
  const checkedUser = await user.findOne({ where: { email } })
  if (!checkedUser) return { error: 'cet utilisateur est un inconnu' }

  return { checkedUser }
}

module.exports = existEmailService
