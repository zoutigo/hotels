const authenticate = require('./authenticate')
const generateToken = require('./generateToken')

const userService = () => {}

userService.auth = authenticate
userService.setToken = generateToken

module.exports = userService
