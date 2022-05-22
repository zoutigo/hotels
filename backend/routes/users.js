const router = require('express').Router()
const { user, sequelize } = require('../database/models')
const {
  check,
  oneOf,
  validationResult,
  body,
  param,
} = require('express-validator')

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  getUser,
  getUserBookings,
} = require('../controllers/userController')
const validate = require('../middlewares/validate')
const verifyTokenService = require('../services/usersServices/verifyTokenService')
const { passwordPattern } = require('../constants/regex')
const { QueryTypes } = require('sequelize')

/* GET users listing. */
router.get(
  '/',

  getUsers
)

/* POST users creating. */
router.post(
  '/',
  validate([
    body('lastname')
      .not()
      .isEmpty()
      .withMessage('indiquez le nom utilisateur')
      .isLength({ min: 2, max: 30 })
      .withMessage(`le nom doit avoir entre 2 et 30 caractères`)
      .trim()
      .escape(),
    body('firstname')
      .not()
      .isEmpty()
      .withMessage('indiquez le prénom utilisateur')
      .isLength({ min: 2, max: 30 })
      .withMessage(`le nom doit avoir entre 2 et 30 caractères`)
      .trim()
      .escape(),
    body('email')
      .not()
      .isEmpty()
      .withMessage('indiquez le mail utilisateur')
      .isEmail()
      .withMessage('format email non valide')
      .custom((value) => {
        return sequelize
          .query('SELECT uuid from users WHERE email = ?', {
            type: QueryTypes.SELECT,
            model: user,
            replacements: [value],
          })
          .then((usr) => {
            if (usr.length > 0) {
              return Promise.reject('E-mail déjà utilisé')
            }
          })
      }),
    body('passwordConfirm')
      .not()
      .isEmpty()
      .withMessage('confirmez le mot de pass'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('indiquez le mot de pass')
      .isString()
      .withMessage('format mot de pass invalide')
      .matches(passwordPattern)
      .withMessage('format mot de pass invalide')
      .custom((value, { req }) => {
        if (value !== req.body.passwordConfirm) {
          throw new Error('Confirmation mot de pass incorrecte')
        }
        return true
      }),
  ]),

  postUsers
)

/* GET user. */
router.get(
  '/:uuid',
  validate([
    param('uuid')
      .isUUID()
      .withMessage(`veillez indiquer l'utilisateur recherché'`),
  ]),

  verifyTokenService,
  getUser
)

router.get(
  '/:uuid/bookings',
  validate([
    param('uuid')
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer l'utilisateur recherché`)
      .isUUID()
      .withMessage(`format utilisateur incorrect`),
  ]),
  verifyTokenService,
  getUserBookings
)

/* PUT users updating. */
router.put(
  '/:uuid',
  validate([
    param('uuid')
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer l'utilisateur recherché`)
      .isUUID()
      .withMessage(`format utilisateur incorrect`),
    body('lastname')
      .optional()
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer le nom`)
      .isString()
      .withMessage(`format nom incorrect`)
      .isLength({ min: 2, max: 30 })
      .withMessage(`le nom doit avoir entre 2 et 30 caractères`)
      .trim()
      .escape(),

    body('firstname')
      .optional()
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer le prénom`)
      .isString()
      .withMessage(`format nom incorrect`)
      .isLength({ min: 2, max: 30 })
      .withMessage(`le nom doit avoir entre 2 et 30 caractères`)
      .trim()
      .escape(),
  ]),

  verifyTokenService,
  putUsers
)

/* PUT users deleting. */
router.delete(
  '/:uuid',
  validate([
    param('uuid')
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer l'utilisateur recherché`)
      .isUUID()
      .withMessage(`format utilisateur incorrect`),
  ]),
  verifyTokenService,
  deleteUsers
)

module.exports = router
