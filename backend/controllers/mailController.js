const { Mail } = require('../database/models')
const { BadRequest } = require('../utils/errors')

module.exports.getMailList = async (req, res, next) => {
  const mails = await Mail.findAll()

  if (!mails) {
    return BadRequest('mails')
  }

  return res.status(200).send(mails)
}
module.exports.postMail = async (req, res, next) => {
  res.send('post mail')
}

/// details opérations
module.exports.getMail = async (req, res, next) => {
  res.send('get mail')
}
module.exports.putMail = async (req, res, next) => {
  res.send('put mail')
}
module.exports.deleteMail = async (req, res, next) => {
  res.send('delete mail')
}
