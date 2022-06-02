const express = require('express')

const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const moment = require('moment')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const suitesRouter = require('./routes/suites')
const housesRouter = require('./routes/houses')
const bookingsRouter = require('./routes/bookings')
const mailsRouter = require('./routes/mails')
const loginRouter = require('./routes/login')
const handleErrors = require('./middlewares/handleErrors')
const helmetOptions = require('./constants/helmetOptions')
const csrfProtection = require('./middlewares/csrfProtection')

dotenv.config()
moment.locale('fr')
moment.suppressDeprecationWarnings = true

const app = express()

const allowedOrigins = [
  'http://localhost:3500',
  'http://localhost:3000',
  'http://localhost:3001',
  'hotels.artsi.fr',
  'http://hotels.artsi.fr',
  'http://www.hotels.artsi.fr',
  process.env.SERVER_ADRESS,
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true,
    exposedHeaders: ['authorization', 'X-CSRF-Token'],
  })
)

app.all('', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})
app.disable('x-powered-by')
app.use(helmet(helmetOptions))

app.use(logger('dev'))
app.use(express.json({ limit: '10mb', extended: true, inflate: true }))
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
)
app.use(cookieParser())

if (process.NODE_ENV === 'production') {
  app.use(csrfProtection)
}

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, '..', 'public/images')))

// app.use('/', indexRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/suites', suitesRouter)
app.use('/api/houses', housesRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/mails', mailsRouter)

app.use(handleErrors)

// render react index html

const root = require('path').join(__dirname, '..', 'frontend', 'build')
app.use(express.static(root))
app.get('*', (req, res) => {
  res.sendFile('index.html', { root })
})

module.exports = app
