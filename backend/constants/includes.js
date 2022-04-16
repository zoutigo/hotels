const { Booking, House, Suite } = require('../database/models')

module.exports.userInclude = [
  { model: House },
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
