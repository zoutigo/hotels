const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ house, booking }) {
      house.belongsTo(this, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      this.hasOne(house, {
        foreignKey: 'userId',
      })

      this.hasMany(booking, {
        foreignKey: 'userId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      booking.belongsTo(this)
    }

    // toJSON() {
    //   return { ...this.get(), id: undefined }
    // }

    // async hashPass(value) {
    //   return await hashPassword(value)
    // }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      lastname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le prénom est obligatoire',
          },
          len: {
            args: [2, 30],
            msg: 'le prénom doit avoir entre 2 et 30 caractères',
          },
        },
      },
      firstname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le nom est obligatoire',
          },
          len: {
            args: [2, 30],
            msg: 'le nom doit avoir entre 5 et 30 caractères',
          },
        },
      },

      email: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          isEmail: {
            msg: "ce format mail n'est pas valide",
          },
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le mot de pass est obligatoire',
          },
        },
      },
      roles: {
        type: DataTypes.ARRAY(
          DataTypes.STRING(DataTypes.ENUM('admin', 'manager', 'client'))
        ),
      },
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'users',
    }
  )
  return User
}
