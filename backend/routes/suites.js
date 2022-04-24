const router = require('express').Router()
const multer = require('multer')

const {
  getSuiteList,
  postSuite,
  getSuite,
  putSuite,
  deleteSuite,
  deleteImage,
} = require('../controllers/suiteController')
const verifyTokenService = require('../services/usersServices/verifyTokenService')

const storage = multer.memoryStorage()

const uploadImages = multer({
  storage: storage,
})

/* GET suites listing. */
router.get('/', getSuiteList)

/* POST suites creating. */
router.post('/', verifyTokenService, uploadImages.array('files', 20), postSuite)

/* GET suite. */
router.get('/:suiteUuid', getSuite)

/* PUT suites updating. */
router.put(
  '/:suiteUuid',
  uploadImages.array('files', 20),
  verifyTokenService,
  putSuite
)

/* DELETE suites updating. */
router.delete('/:suiteUuid', verifyTokenService, deleteSuite)

/* DELETE suite image. */
router.delete('/:suiteUuid/:imageUuid', verifyTokenService, deleteImage)

module.exports = router
