
const { mail } = require('../database/models')
const { BadRequest } = require('../utils/errors')

module.exports.getMailList = async (req, res, next) => {
  const mails = await mail.findAll()


  if (!mails) {
    return BadRequest('mails')
  }

  return res.status(200).send(mails)
}
module.exports.postMail = async (req, res, next) => {

  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('veillez renseigner les champs de données'))

  try {
    const createdMail = await mail.create(req.body)

    if (createdMail)
      return res.status(200).send({
        message: 'votre message a bien été adressé à notre administrateur',
      })
  } catch (error) {
    return next(error)
  }

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
