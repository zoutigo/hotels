/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-extraneous-dependencies
const { QueryTypes } = require('@sequelize/core')
const { devBookings } = require('../../constants/fixturesDev')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const users = await queryInterface.sequelize.query(
        ` SELECT * FROM users`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const suites = await queryInterface.sequelize.query(
        ` SELECT * FROM suites`,
        {
          type: QueryTypes.SELECT,
        }
      )

      const bookings = devBookings.map((booking) => ({
        ...booking,
        userId: users[2].id,
        suiteId: suites[3].id,
      }))
      await queryInterface.bulkInsert('bookings', bookings, {
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
      await queryInterface.bulkDelete('bookings', null, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
