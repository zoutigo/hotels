module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn(
        'images',
        'suiteId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'suites',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        },
        { transaction }
      )
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn('images', 'suiteId', { transaction })
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
