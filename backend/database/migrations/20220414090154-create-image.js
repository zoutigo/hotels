module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
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
      filename: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le nom est obligatoire',
          },
          len: {
            args: [2, 100],
            msg: 'le nom doit avoir entre 2 et 100 caractères',
          },
        },
      },
      filepath: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'le file path est de format url',
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
    await queryInterface.dropTable('images')
  },
}
