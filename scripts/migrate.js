const { execute } = require('@getvim/execute')

// "migrate": "npx sequelize-cli db:migrate --url postgres://kojy5082_secondary:ValeryMBELE1979@127.0.0.1:5432/kojy5082_hotels_secondary/"

const migrate = async () => {
  //   const URL = `postgres://${config.username}:${config.password}@127.0.0.1:5432/${config.database}`
  const URL =
    'postgres://kojy5082_zoutigo:ValeryMBELE1979@127.0.0.1:5432/kojy5082_hotels'

  try {
    await execute(`npx sequelize-cli db:migrate --url ${URL}`)
  } catch (error) {
    console.log('our error:-------------------', error)
  }
}

migrate()
