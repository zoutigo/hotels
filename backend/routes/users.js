const router = require('express').Router()

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  getUser,
} = require('../controllers/userController')
const verifyTokenService = require('../services/usersServices/verifyTokenService')

/* GET users listing. */
router.get('/', getUsers)

/* POST users creating. */
router.post('/', postUsers)

/* GET user. */
router.get('/:uuid', verifyTokenService, getUser)

/* PUT users updating. */
router.put('/:uuid', verifyTokenService, putUsers)

/* PUT users deleting. */
router.delete('/:uuid', verifyTokenService, deleteUsers)

module.exports = router
