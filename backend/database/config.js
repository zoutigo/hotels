require('dotenv').config()

module.exports = {
  // development: {
  //   username: process.env.POSTGRES_USER,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: process.env.POSTGRES_DB,
  //   host: '127.0.0.1',
  //   port: 5432,
  //   dialect: 'postgres',
  //   logging: true,
  //   dialectOptions: {
  //     bigNumberStrings: true,
  //   },
  // },
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    // logging: true,
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
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false,
  },
}
