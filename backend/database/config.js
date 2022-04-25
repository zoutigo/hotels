require('dotenv').config()

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: true,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOSTNAME,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
    ssl: true,
    dialectOptions: {
      bigNumberStrings: true,
      ssl: { require: true, rejectUnauthorized: false },
    },
  },
}
