/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-extraneous-dependencies
const { QueryTypes } = require('@sequelize/core')

const { devSuites } = require('../../constants/fixturesDev')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const houses = await queryInterface.sequelize.query(
        ` SELECT * FROM houses`,
        {
          type: QueryTypes.SELECT,
        }
      )

      const suites = await devSuites.map((suit) => ({
        ...suit,
        houseId: houses[Math.floor(Math.random() * 5)].id,
      }))
      await queryInterface.bulkInsert('suites', suites, {
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
      await queryInterface.bulkDelete('suites', null, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
