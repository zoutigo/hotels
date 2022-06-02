const rateLimit = require('express-rate-limit')
const { MemoryStore } = require('express-rate-limit')
const dotenv = require('dotenv')

dotenv.config()

const allowlist = ['192.168.49.1']

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'test' ? 10000 : 5, // Limit each IP to 5 requests per `window` (here, per 10 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message:
    'Vous avez essayé trop de tentatives en un laps de temps, veillez re-essayer dans 15 minutes',
  skip: (request, response) => allowlist.includes(request.ip),
  store: new MemoryStore(),
})

module.exports = registerLimiter
