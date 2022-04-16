const router = require('express').Router()

const {
  getHouseList,
  putHouse,
  getHouse,
  deleteHouse,
} = require('../controllers/houseController')
const { postHouse } = require('../controllers/suiteController')

/* GET houses listing. */
// router.get('/', getHouseList)

/* POST houses creating. */
// router.post('/', postHouse)

/* GET house */
// router.get('/{uuid}', getHouse)

/* PUT houses updating. */
// router.put('/{uuid}', putHouse)

/* PUT houses updating. */
// router.delete('/houses/{id}', deleteHouse)

module.exports = router
