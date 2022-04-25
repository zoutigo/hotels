const { execute } = require('@getvim/execute')
const env = process.env.NODE_ENV || 'development'
// const config = require(__dirname + '/../config/config.js')[env]

const config = require(`${__dirname}/../backend/database/config.js`)[env]

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// )
// operatorsAliases: 0,
// pool: {
//   max: 5,
//   min: 0,
//   acquire: 30000,
//   idle: 10000,
// },
// const URL= `postgres://{{user}}:{{password-with-chars-like-#-&}}@{{aws-rds-url}}}/{{database}}',

//   DATABASE_URL="postgresql://symfony:ChangeMe@127.0.0.1:5432/app?serverVersion=13&charset=utf8"

const migrate = async () => {
  //   const URL = `postgres://${config.username}:${config.password}@127.0.0.1:5432/${config.database}`
  const URL =
    'postgres://kojy5082_zoutigo:kOjG1UZ%NcuE@127.0.0.1:5432/kojy5082_hotels'

  try {
    await execute(`npx sequelize-cli db:migrate --url ${URL}`)
  } catch (error) {
    console.log('our error:-------------------', error)
  }
}

migrate()
