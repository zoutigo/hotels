module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      startdate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter: {
            args: [[new Date()]],
            msg: 'uen réservation ne se fait pas dans le passé',
          },
        },
      },
      enddate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter: {
            args: [[new Date()]],
            msg: 'uen réservation ne se fait pas dans le passé',
          },
          isGreaterThanStartdate(value) {
            if (value <= this.starddate) {
              throw new Error(
                'La date de fin doit etre postérieure à la date de début.'
              )
            }
          },
        },
      },
      price: {
        type: Sequelize.DataTypes.FLOAT(2),
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'le prix est un nombre décimal',
          },
          max: {
            value: 10000000,
            msg: 'le prix ne doit pas etre supérieur à 1000000€',
          },
          min: {
            value: 10,
            msg: 'le prix ne doit pas etre inférieur à 10€',
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings')
  },
}
