const csrf = require('csurf')
const dotenv = require('dotenv')

dotenv.config()

const csrfProtection = csrf({
  cookie: true,
  value: (req) => req.csrfToken(),
})

module.exports = csrfProtection
