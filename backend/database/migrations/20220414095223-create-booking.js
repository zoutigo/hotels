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
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      startdate: {
        type: Sequelize.DataTypes.BIGINT(13),
        allowNull: false,
        validate: {
          notNul: {
            msg: 'la date de début ne doit pas etre nulle',
          },
          isGreaterThanToday(value) {
            if (value >= new Date().getTime()) {
              throw new Error(
                'La date de fin doit etre supérieure ou égale à today.'
              )
            }
          },
        },
      },
      enddate: {
        type: Sequelize.DataTypes.BIGINT(13),
        allowNull: false,
        validate: {
          notNul: {
            msg: 'la date de fin ne doit pas etre nulle',
          },
          isGreaterThanToday(value) {
            if (value >= new Date().getTime()) {
              throw new Error(
                'La date de fin doit etre supérieure ou égale à today.'
              )
            }
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
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings')
  },
}
