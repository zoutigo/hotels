const { Model, Sequelize } = require('sequelize')
const mailTopics = require('../../constants/mailTopics')

module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mail.init(
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
      content: {
        type: DataTypes.STRING(5000),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le contenu du mail est obligatoire',
          },
          len: {
            args: [5, 5000],
            msg: 'le contenu du mail doit avoir entre 5 et 5000 caractères',
          },
        },
      },
      topic: {
        type: DataTypes.STRING(DataTypes.ENUM([...mailTopics])),
      },
      isSent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'mail',
      tableName: 'mails',
    }
  )
  return Mail
}
