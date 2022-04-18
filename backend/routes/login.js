const router = require('express').Router()

const authenticate = require('../services/usersServices/authenticate')

/* post credentials */
// router.post('/', authenticate)
router.post('/', authenticate)

module.exports = router
