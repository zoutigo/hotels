const mailTopics = require('../../constants/mailTopics')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mails', {
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
      lastname: {
        type: Sequelize.DataTypes.STRING(30),
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
        type: Sequelize.DataTypes.STRING(30),
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
        type: Sequelize.DataTypes.STRING(50),
        unique: true,
        validate: {
          isEmail: {
            msg: "ce format mail n'est pas valide",
          },
        },
      },
      content: {
        type: Sequelize.DataTypes.STRING(5000),
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
        type: Sequelize.DataTypes.STRING(
          Sequelize.DataTypes.ENUM([...mailTopics])
        ),
      },
      isSent: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('mails')
  },
}
