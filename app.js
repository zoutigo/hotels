const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const handleErrors = require('./backend/middlewares/handleErrors')

const indexRouter = require('./backend/routes/index')
const usersRouter = require('./backend/routes/users')
const suitesRouter = require('./backend/routes/suites')
const housesRouter = require('./backend/routes/houses')
const bookingsRouter = require('./backend/routes/bookings')
const mailsRouter = require('./backend/routes/mails')
const loginRouter = require('./backend/routes/login')

dotenv.config()
const app = express()

const allowedOrigins = ['http://localhost:3000', process.env.SERVER_ADRESS]

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
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
    exposedHeaders: ['x-access-token'],
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

app.use(logger('dev'))
app.use(express.json({ limit: '10mb', extended: true, inflate: true }))
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
)
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/suites', suitesRouter)
app.use('/api/houses', housesRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/mails', mailsRouter)
app.use('/api/login', loginRouter)

app.use(handleErrors)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'))
})

module.exports = app
