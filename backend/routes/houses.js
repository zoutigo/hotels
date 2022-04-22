const router = require('express').Router()

const multer = require('multer')

const {
  getHouseList,
  putHouse,
  getHouse,
  deleteHouse,
  postHouse,
} = require('../controllers/houseController')
const verifyTokenService = require('../services/usersServices/verifyTokenService')

const storage = multer.memoryStorage()

const uploadImages = multer({
  storage: storage,
})

/* GET houses listing. */
router.get('/', getHouseList)

/* POST houses creating. */
router.post('/', verifyTokenService, uploadImages.single('file'), postHouse)

/* GET house */
router.get('/:uuid', getHouse)

/* GET house */
// router.get('/:houseUuid/suites', getHouseSuites)


/* PUT houses updating. */
router.put('/:uuid', verifyTokenService, putHouse)

/* PUT houses updating. */
router.delete('/:uuid', verifyTokenService, deleteHouse)

module.exports = router
