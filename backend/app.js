const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")

dotenv.config()
const app = express()

const allowedOrigins = ["http://localhost:3000", process.env.SERVER_ADRESS]

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin."
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true,
    exposedHeaders: ["x-access-token"],
  })
)

app.all("", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  next()
})

app.use(logger("dev"))
app.use(express.json({ limit: "10mb", extended: true, inflate: true }))
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
)
app.use(cookieParser())

app.use(express.static(path.join(__dirname, "..", "public")))
app.use(express.static(path.join(__dirname, "..", "public", "html")))

app.use("/", indexRouter)
app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "index.html"))
})

module.exports = app