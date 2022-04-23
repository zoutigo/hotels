const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      startdate: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: 'la date de début ne doit pas etre nulle',
        //   },
        //   isGreaterThanToday(value) {
        //     if (value <= new Date().getTime()) {
        //       throw new Error(
        //         'La date de fin doit etre supérieure ou égale à today.'
        //       )
        //     }
        //   },
        // },
      },
      enddate: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: 'la date de fin ne doit pas etre nulle',
        //   },
        //   isGreaterThanStartdate(value) {
        //     if (value <= this.starddate) {
        //       throw new Error(
        //         'La date de fin doit etre postérieure à la date de début.'
        //       )
        //     }
        //   },
        // },
      },
      price: {
        type: DataTypes.FLOAT(2),
        allowNull: false,
        // validate: {
        //   isDecimal: {
        //     msg: 'le prix est un nombre décimal',
        //   },
        //   max: {
        //     args: 10000000,
        //     msg: 'le prix ne doit pas etre supérieur à 1000000€',
        //   },
        //   min: {
        //     args: 10,
        //     msg: 'le prix ne doit pas etre inférieur à 10€',
        //   },
        // },
      },
    },
    {
      sequelize,
      modelName: 'booking',
      tableName: 'bookings',
    }
  )
  return Booking
}
