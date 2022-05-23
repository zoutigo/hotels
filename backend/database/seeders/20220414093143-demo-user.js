/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-extraneous-dependencies

const {
  devAdmin,
  devClients,
  devManagers,
} = require('../../constants/fixturesDev')
const hashPassword = require('../../utils/hashPassword')

module.exports = {
  async up(queryInterface, Sequelize) {
    // password hash

    const transaction = await queryInterface.sequelize.transaction()

    try {
      const adminPassword = await hashPassword(devAdmin.password)
      const admin = { ...devAdmin, password: adminPassword }

      const clients = devClients.map((client) => ({
        ...client,
        password: adminPassword,
      }))

      const managers = devManagers.map((manager) => ({
        ...manager,
        password: adminPassword,
      }))

      await queryInterface.bulkInsert('users', [admin, ...managers], {
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
