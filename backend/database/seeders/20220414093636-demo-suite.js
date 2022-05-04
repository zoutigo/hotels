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

      let countHouses = houses.length
      let increment = 0

      const suites = await devSuites.map((suit) => {
        increment += 1

        const house = houses[countHouses]

        const updatedSuite = {
          ...suit,
          houseId: house ? house.id : houses[0].id,
        }

        if (increment === 4) {
          increment = 0
          countHouses = countHouses - 1
        }

        return updatedSuite
      })

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
