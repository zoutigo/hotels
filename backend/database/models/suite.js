const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Suite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Booking, Image }) {
      // define association here
      this.hasMany(Booking, {
        foreignKey: 'suiteId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      Booking.belongsTo(this)

      this.hasMany(Image, {
        foreignKey: 'suiteId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      Booking.belongsTo(this)
    }
  }
  Suite.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le titre est obligatoire',
          },
          len: {
            args: [2, 100],
            msg: 'le titre doit avoir entre 2 et 100 caractères',
          },
        },
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'la description est obligatoire',
          },
          len: {
            args: [15, 1000],
            msg: 'la description doit avoir entre 15 et 1000 caractères',
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
            value: 10000,
            msg: 'le prix ne doit pas etre supérieur à 10000€',
          },
          min: {
            value: 10,
            msg: 'le prix ne doit pas etre inférieur à 10€',
          },
        },
      },
      bannerUrl: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'la bannière doit etre de format url',
          },
        },
      },
      bookinglink: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'le lien booking.com doit etre de format url',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Suite',
      tableName: 'suites',
    }
  )
  return Suite
}
