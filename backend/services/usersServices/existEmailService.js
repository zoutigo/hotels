const { User } = require('../../database/models')

const existEmailService = async (email) => {
  const checkedUser = await User.findOne({ where: { email } })
  if (!checkedUser) return { error: 'cet utilisateur est un inconnu' }

  return { checkedUser }
}

module.exports = existEmailService
