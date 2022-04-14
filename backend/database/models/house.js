'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  House.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le nom est obligatoire',
          },
          len: {
            args: [2, 30],
            msg: 'le nom doit avoir entre 2 et 30 caractères',
          },
        },
      },
      city: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'la ville est obligatoire',
          },
          len: {
            args: [2, 30],
            msg: 'la ville doit avoir entre 2 et 30 caractères',
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
      slug: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le slug est obligatoire',
          },
          len: {
            args: [2, 100],
            msg: 'le slug doit avoir entre 2 et 1000 caractères',
          },
        },
      },
      bannerUrl: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'la bannière est de format url',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'House',
      tableName: 'houses',
    }
  )
  return House
}