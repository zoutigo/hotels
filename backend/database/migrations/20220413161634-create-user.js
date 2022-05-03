module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'users',
        {
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
          lastname: {
            type: Sequelize.STRING(30),
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
            type: Sequelize.STRING(30),
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
            type: Sequelize.STRING(50),
            unique: true,
            validate: {
              isEmail: {
                msg: "ce format mail n'est pas valide",
              },
            },
          },
          password: {
            type: Sequelize.STRING(64),
          },
          roles: {
            type: Sequelize.JSON(
              Sequelize.STRING(Sequelize.ENUM('admin', 'manager', 'client'))
            ),
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
        },
        { transaction }
      )
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.dropTable('users', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
