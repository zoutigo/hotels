const { User } = require('../database/models')
const { BadRequest } = require('../utils/errors')

module.exports.login = async (req, res, next) => {}
module.exports.getUsers = async (req, res, next) => {
  const users = await User.findAll()

  if (!users) {
    return BadRequest('no users')
  }

  return res.status(200).send(users)
}
module.exports.postUsers = async (req, res, next) => {
  res.send('post user')
}

module.exports.getUser = async (req, res, next) => {
  res.send('get user')
}
module.exports.putUsers = async (req, res, next) => {
  res.send('put user')
}
module.exports.deleteUsers = async (req, res, next) => {
  res.send('delete user')
}
