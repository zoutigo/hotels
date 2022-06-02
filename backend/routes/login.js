const router = require('express').Router()
const { body, check, oneOf, validationResult } = require('express-validator')
const { passwordPattern } = require('../constants/regex')
const loginlimiter = require('../middlewares/loginLimiter')
const validate = require('../middlewares/validate')

const authenticate = require('../services/usersServices/authenticate')

/* post credentials */
// router.post('/', authenticate)
router.post(
  '/',
  loginlimiter,
  validate([
    body('username')
      .not()
      .isEmpty()
      .withMessage('indiquez le nom utilisateur')
      .isEmail()
      .withMessage('format utilisateur non valide'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('indiquez le mot de pass')
      .isString()
      .withMessage('format mot de pass invalide')
      .matches(passwordPattern)
      .withMessage('format mot de pass invalide'),
  ]),

  authenticate
)

module.exports = router
