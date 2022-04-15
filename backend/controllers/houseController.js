const { House } = require('../database/models')
const { BadRequest } = require('../utils/errors')

module.exports.getHouseList = async (req, res, next) => {
  const houses = await House.findAll()

  if (!houses) {
    return BadRequest('houses')
  }

  return res.status(200).send(houses)
}
module.exports.postHouse = async (req, res, next) => {
  res.send('post house')
}

/// details opérations
module.exports.getHouse = async (req, res, next) => {
  res.send('get house')
}
module.exports.putHouse = async (req, res, next) => {
  res.send('put house')
}
module.exports.deleteHouse = async (req, res, next) => {
  res.send('delete house')
}
