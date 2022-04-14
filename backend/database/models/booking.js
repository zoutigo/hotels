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
      starddate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter: {
            args: [[new Date()]],
            msg: 'uen réservation ne se fait pas dans le passé',
          },
        },
      },
      endate: {
        type: DataTypes.DATE,
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
        type: DataTypes.FLOAT(2),
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
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'bookings',
    }
  )
  return Booking
}
