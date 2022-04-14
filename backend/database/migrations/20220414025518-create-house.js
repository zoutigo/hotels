module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'houses',
        {
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
          name: {
            type: Sequelize.DataTypes.STRING(30),
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
            type: Sequelize.DataTypes.STRING(30),
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
          slug: {
            type: Sequelize.DataTypes.STRING(1000),
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
            type: Sequelize.DataTypes.STRING(200),
            allowNull: false,
            validate: {
              isUrl: {
                msg: 'la bannière est de format url',
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
      await queryInterface.dropTable('houses')
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}