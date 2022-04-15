const router = require('express').Router()

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  getUser,
} = require('../controllers/userController')

/* GET users listing. */
router.get('/', getUsers)

/* POST users creating. */
router.get('/', postUsers)

/* GET user. */
router.get('/{uuid}', getUser)

/* PUT users updating. */
router.put('/{uuid}', putUsers)

/* PUT users updating. */
router.delete('/{uuid}', deleteUsers)

module.exports = router
