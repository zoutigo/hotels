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
    include: { model: suite, include: { model: image } },
  },
  {
    model: booking,
    include: { model: suite },
  },
]
