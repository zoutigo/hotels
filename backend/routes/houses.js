const router = require('express').Router()
const { user, sequelize } = require('../database/models')
const {
  check,
  oneOf,
  validationResult,
  body,
  param,
} = require('express-validator')

const multer = require('multer')

const {
  getHouseList,
  putHouse,
  getHouse,
  deleteHouse,
  postHouse,
} = require('../controllers/houseController')
const verifyTokenService = require('../services/usersServices/verifyTokenService')
const validate = require('../middlewares/validate')
const mimetypes = require('../constants/mimetypes')

const storage = multer.memoryStorage()

const uploadImages = multer({
  storage: storage,
})

/* GET houses listing. */
router.get('/', getHouseList)

/* POST houses creating. */
router.post(
  '/',
  uploadImages.single('file'),
  validate([
    body('name')
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer le nom de l'établissement`)
      .isLength({ min: 2, max: 100 })
      .withMessage(
        `le nom de l'établissement doit avoir entre 2 et 100 caractères`
      )
      .trim()
      .escape(),
    body('city')
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer la ville l'établissement`)
      .isLength({ min: 2, max: 100 })
      .withMessage(
        `la ville de l'établissement doit avoir entre 2 et 100 caractères`
      )
      .trim()
      .escape(),
    body('address')
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer l'adresse de l'établissement`)
      .isLength({ min: 2, max: 200 })
      .withMessage(
        `l'adresse de l'établissement doit avoir entre 2 et 200 caractères`
      )
      .trim()
      .escape(),
    body('description')
      .not()
      .isEmpty()
      .withMessage(`Veillez décrire l'établissement`)
      .isLength({ min: 15, max: 1000 })
      .withMessage(
        `la description de l'établissement doit avoir entre 15 et 1000 caractères`
      )
      .trim()
      .escape(),
    check('file')
      .custom((value, { req }) => {
        if (mimetypes.includes(req.file.mimetype)) {
          return true
        }
        return false
      })
      .withMessage('Veillez telecharger la bannière '),
  ]),

  verifyTokenService,

  postHouse
)

/* GET house */
router.get(
  '/:uuid',
  validate([
    param('uuid')
      .isUUID()
      .withMessage(`veillez indiquer l'établissement recherché`),
  ]),
  getHouse
)

/* GET house */
// router.get('/:houseUuid/suites', getHouseSuites)

/* PUT houses updating. */
router.put(
  '/:uuid',
  validate([
    param('uuid')
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer l'établissement recherché`)
      .isUUID()
      .withMessage(`format établissement incorrect`),
    body('name')
      .optional()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer le nom de l'établissement`)
      .isLength({ min: 2, max: 100 })
      .withMessage(
        `le nom de l'établissement doit avoir entre 2 et 100 caractères`
      )
      .trim()
      .escape(),
    body('city')
      .optional()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer la ville l'établissement`)
      .isLength({ min: 2, max: 100 })
      .withMessage(
        `la ville de l'établissement doit avoir entre 2 et 100 caractères`
      )
      .trim()
      .escape(),
    body('address')
      .optional()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer l'adresse de l'établissement`)
      .isLength({ min: 2, max: 200 })
      .withMessage(
        `l'adresse de l'établissement doit avoir entre 2 et 200 caractères`
      )
      .trim()
      .escape(),
    body('description')
      .optional()
      .not()
      .isEmpty()
      .withMessage(`Veillez décrire l'établissement`)
      .isLength({ min: 15, max: 1000 })
      .withMessage(
        `la description de l'établissement doit avoir entre 15 et 1000 caractères`
      )
      .trim()
      .escape(),
  ]),
  verifyTokenService,
  putHouse
)

/* PUT houses updating. */
router.delete(
  '/:uuid',
  validate([
    param('uuid')
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer l'établissement recherché`)
      .isUUID()
      .withMessage(`format établissement incorrect`),
  ]),

  verifyTokenService,
  deleteHouse
)

module.exports = router
