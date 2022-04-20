const { house, suite, image } = require('../../database/models')
const getValidationErrorsArray = require('../sequelize/getValidationErrorsArray')

const listHouseService = async () => {
  try {
    const houses = await house.findAll({
      attributes: [
        'uuid',
        'name',
        'address',
        'bannerUrl',
        'description',
        'city',
        'slug',
        'createdAt',
      ],
      include: [
        {
          model: suite,
          attributes: [
            'uuid',
            'price',
            'title',
            'bannerUrl',
            'description',
            'bookinglink',
            'createdAt',
          ],
          include: [
            { model: image, attributes: ['filename', 'filepath', 'uuid'] },
          ],
        },
      ],
    })
    if (!houses)
      return {
        serverError: 'un problème est survenu lors de la création utilisateur',
      }
    return { houses }
  } catch (error) {
    console.log(error)
    return { errors: getValidationErrorsArray(error) }
  }
}

module.exports = listHouseService
