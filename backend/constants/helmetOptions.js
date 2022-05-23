const dotenv = require('dotenv')
dotenv.config()

const helmetOptions = {
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
      //   imgSrc: ["'http'"],
      //   styleSrc: ["'unsafe-inline'"],
    },
  },
  crossOriginResourcePolicy: {
    useDefaults: false,
    directives: {
      policy: 'cross-origin',
    },
  },
  xssFilter: true,
}

module.exports = helmetOptions

// {# <meta http-equiv="Content-Security-Policy"
// content="default-src 'self';img-src http:; child-src 'none';style-src 'self' 'unsafe-inline'"/>
