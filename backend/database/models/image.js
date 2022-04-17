const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Image.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      filename: {
        type: DataTypes.STRING(100),
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
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: "le chemin de l'image est obligatoire",
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'images',
    }
  )
  return Image
}
