/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-extraneous-dependencies

const {
  devManager,
  devAdmin,
  devClients,
} = require('../../constants/fixturesDev')
const hashPassword = require('../../utils/hashPassword')

module.exports = {
  async up(queryInterface, Sequelize) {
    // password hash

    const transaction = await queryInterface.sequelize.transaction()

    try {
      const password = await hashPassword('password')
      devManager.password = password
      devAdmin.password = password
      const clients = devClients.map((client) => ({
        ...client,
        password: password,
      }))
      await queryInterface.bulkInsert('users', [devManager, devAdmin], {
        transaction,
      })
      await queryInterface.bulkInsert('users', clients, {
        transaction,
      })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkDelete('users', null, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
