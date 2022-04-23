const { booking, user, house, image, suite } = require('../../database/models')

const getUserBookingService = async (uuid) => {
  try {
    const requestedUser = await user.findOne({
      where: { uuid },
      includes: {
        model: booking,
        // attributes: ['startdate', 'enddate', 'price'],
        includes: [
          {
            model: suite,
            attributes: ['title'],
            includes: [
              { model: house, attributes: ['name', 'city', 'address'] },
              { model: image, attributes: ['startdate', 'enddate'] },
            ],
          },
        ],
      },
    })

    const userBookings = await requestedUser.getBookings()

    if (!requestedUser) return { bookings: null, error: false }

    return { bookings: userBookings, error: false }
  } catch (error) {
    console.log('error', error)
    return { error, bookings: null }
  }
}

module.exports = getUserBookingService
