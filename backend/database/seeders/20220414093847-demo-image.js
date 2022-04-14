/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-extraneous-dependencies
const { QueryTypes } = require('@sequelize/core')
const { devImages } = require('../../constants/fixturesDev')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const suites = await queryInterface.sequelize.query(
        ` SELECT * FROM suites`,
        {
          type: QueryTypes.SELECT,
        }
      )

      const images = devImages.map((image) => ({
        ...image,
        suiteId: suites[2].id,
      }))
      await queryInterface.bulkInsert('images', images, {
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
      await queryInterface.bulkDelete('images', null, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
