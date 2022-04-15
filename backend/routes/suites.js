const router = require('express').Router()

const {
  getSuiteList,
  postSuite,
  getSuite,
  putSuite,
  deleteSuite,
} = require('../controllers/suiteController')

/* GET suites listing. */
router.get('/', getSuiteList)

/* POST suites creating. */
router.get('/', postSuite)

/* GET suite. */
router.get('/{uuid}', getSuite)

/* PUT suites updating. */
router.put('/{uuid}', putSuite)

/* PUT suites updating. */
router.delete('/{uuid}', deleteSuite)

module.exports = router
