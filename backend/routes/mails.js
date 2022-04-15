const router = require('express').Router()

const {
  getMailList,
  postMail,
  getMail,
  putMail,
  deleteMail,
} = require('../controllers/mailController')

/* GET mails listing. */
router.get('/', getMailList)

/* POST mails creating. */
router.post('/', postMail)

/* GET mail */
router.get('/{uuid}', getMail)

/* PUT mails updating. */
router.put('/{uuid}', putMail)

/* PUT mails updating. */
router.delete('/mails/{id}', deleteMail)

module.exports = router
