const { userTokenInclude } = require('../../constants/includes')
const { user, house, suite } = require('../../database/models')
const generateToken = require('../../utils/generateToken')

const refreshTokenService = async (uuid) => {
  const amendUser = await user.findOne({
    where: { uuid },
    include: userTokenInclude,
  })
  return generateToken(amendUser)
}

module.exports = refreshTokenService
