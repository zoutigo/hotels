const router = require('express').Router()
const multer = require('multer')

const {
  getSuiteList,
  postSuite,
  getSuite,
  putSuite,
  deleteSuite,
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
router.put('/:suiteUuid', verifyTokenService, putSuite)

/* PUT suites updating. */
router.delete('/:suiteUuid', verifyTokenService, deleteSuite)

module.exports = router
