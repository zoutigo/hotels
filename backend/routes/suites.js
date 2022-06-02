const router = require('express').Router()
const { body, check, param } = require('express-validator')
const multer = require('multer')
const fileMaxSize = require('../constants/filemaxsize')
const mimetypes = require('../constants/mimetypes')
const { urlPattern } = require('../constants/regex')

const {
  getSuiteList,
  postSuite,
  getSuite,
  putSuite,
  deleteSuite,
  deleteImage,
} = require('../controllers/suiteController')
const validate = require('../middlewares/validate')
const verifyTokenService = require('../services/usersServices/verifyTokenService')

const storage = multer.memoryStorage()

const uploadImages = multer({
  storage: storage,
  limits: {
    fileSize: fileMaxSize,
  },
})

/* GET suites listing. */
router.get('/', getSuiteList)

/* POST suites creating. */
router.post(
  '/',
  uploadImages.array('files', 20),
  validate([
    body('title')
      .exists()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer le titre de la suite`)
      .isLength({ min: 2, max: 100 })
      .withMessage(`le nom de la suite doit avoir entre 2 et 100 caractères`),
    body('description')
      .exists()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer la description de la suite`)
      .isLength({ min: 15, max: 1000 })
      .withMessage(
        `la description de la suite doit avoir entre 15 et 1000 caractères`
      ),
    body('price')
      .exists()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer le prix de la suite`)
      .isFloat()
      .withMessage(`le prix de la suite doit etre un décimal`)
      .custom((value, { req }) => {
        return value > 10
      })
      .withMessage('le prix doit etre supérieur ou égal à 10€')
      .trim()
      .escape(),
    body('bookinglink')
      .exists()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer lien booking de la suite`)
      .isURL()
      .withMessage(`le lien booking n'est pas au bon format`)
      .trim(),
    body('files')
      .custom((value, { req }) => {
        if (req.files && req.files.length > 0) {
          return true
        }
      })
      .withMessage('Veillez des photos de la suite')
      .custom((value, { req }) => {
        let isValid = true

        req.files.forEach((file) => {
          if (!mimetypes.includes(file.mimetype)) {
            isValid = false
          }
        })

        return isValid
      })
      .withMessage('seuls les fichiers de type image sont acceptés'),
  ]),
  verifyTokenService,
  postSuite
)

/* GET suite. */
router.get(
  '/:suiteUuid',
  validate([
    param('suiteUuid')
      .isUUID()
      .withMessage(`veillez indiquer la suite recherchée`),
  ]),
  getSuite
)

/* PUT suites updating. */
router.put(
  '/:suiteUuid',
  uploadImages.array('files', 20),
  validate([
    param('suiteUuid')
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer la suite à modifier`)
      .isUUID()
      .withMessage(`format de la suite incorrect`),
    body('title')
      .optional()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer le titre de la suite`)
      .isLength({ min: 2, max: 100 })
      .withMessage(`le nom de la suite doit avoir entre 2 et 100 caractères`),
    body('description')
      .optional()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer la description de la suite`)
      .isLength({ min: 15, max: 1000 })
      .withMessage(
        `la description de la suite doit avoir entre 15 et 1000 caractères`
      ),
    body('price')
      .optional()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer le prix de la suite`)
      .isFloat()
      .withMessage(`le prix de la suite doit etre un décimal`)
      .custom((value, { req }) => {
        return value > 10
      })
      .withMessage('le prix doit etre supérieur ou égal à 10€'),
    body('bookinglink')
      .optional()
      .not()
      .isEmpty()
      .withMessage(`Veillez indiquer lien booking de la suite`)
      .isURL()
      .withMessage(`le lien booking n'est pas au bon format`)
      .trim(),
  ]),
  verifyTokenService,
  putSuite
)

/* DELETE suites updating. */
router.delete(
  '/:suiteUuid',
  validate([
    param('suiteUuid')
      .isUUID()
      .withMessage(`veillez indiquer la suite à supprimer`),
  ]),
  verifyTokenService,
  deleteSuite
)

/* DELETE suite image. */
router.delete(
  '/:suiteUuid/:imageUuid',
  validate([
    param('suiteUuid')
      .exists()
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer la suite à laquelle appartient l'image`)
      .isUUID()
      .withMessage(`format dela suite incorrect`),
    param('imageUuid')
      .exists()
      .not()
      .isEmpty()
      .withMessage(`veillez indiquer l'image à supprimer`)
      .isUUID()
      .withMessage(`format de l'image incorrect`),
  ]),
  verifyTokenService,
  deleteImage
)

module.exports = router
