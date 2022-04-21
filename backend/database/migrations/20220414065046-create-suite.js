module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: {
        type: Sequelize.DataTypes.STRING(100),
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
        type: Sequelize.DataTypes.STRING(1000),
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
        type: Sequelize.DataTypes.FLOAT(2),
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
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'la bannière doit etre de format url',
          },
        },
      },
      bookinglink: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'le lien booking.com doit etre de format url',
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
    await queryInterface.dropTable('suites')
  },
}
