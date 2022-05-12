const { booking, house, suite, image } = require('../database/models')

module.exports.userInclude = [
  { model: house },
  {
    // model: Booking,
    // include: [
    //   {
    //     model: Suite,
    //     attributes: ['uuid', 'name'],
    //   },
    // ],
  },
]

module.exports.userTokenInclude = [
  {
    model: house,
    attributes: ['uuid', 'name', 'bannerUrl', 'description', 'address'],
    // include: {
    //   model: suite,
    //   include: { model: image },
    //   attributes: ['uuid', 'title', 'description', 'price'],
    // },
  },
  {
    model: booking,
    // include: { model: suite },
  },
]
module.exports.suiteInclude = [
  {
    model: house,
    attributes: { exclude: ['id', 'userId'] },
    include: { model: suite, attributes: { exclude: ['id'] } },
  },
  { model: image, attributes: ['uuid', 'filename', 'filepath'] },
]
