const { booking, user, house, image, suite } = require('../../database/models')

const getUserBookingService = async (uuid) => {
  try {
    const requestedUser = await user.findOne({
      where: { uuid },
    })

    if (!requestedUser)
      return {
        bookings: null,
        error: "Cet utilisateur n'existe plus -- userBookingService",
      }

    const userBookings = await requestedUser.getBookings()

    if (!userBookings || userBookings.length < 1)
      return { bookings: [], error: false }

    const completeBookings = await Promise.all(
      userBookings.map(async (booking) => {
        const suite = await booking.getSuite()
        const house = await suite.getHouse()

        return {
          ...booking,
          suiteUuid: suite.uuid,
          suiteTitle: suite.title,
          suiteBanner: suite.bannerUrl,
          suiteDescription: suite.description,
          houseUuid: house.uuid,
          houseName: house.name,
          houseCity: house.city,
          houseAddress: house.address,
          houseDescription: house.description,
        }
      })
    )

    const bookings = completeBookings.map((booking) => {
      const {
        dataValues,
        houseAddress,
        houseCity,
        houseName,
        houseDescription,
        houseUuid,
        suiteBanner,
        suiteTitle,
        suiteDescription,
        suiteUuid,
      } = booking

      return {
        houseAddress,
        houseCity,
        houseName,
        houseDescription,
        houseUuid,
        suiteBanner,
        suiteTitle,
        suiteDescription,
        suiteUuid,
        uuid: dataValues.uuid,
        startdate: dataValues.startdate,
        enddate: dataValues.enddate,
        price: dataValues.price,
        createdAt: dataValues.createdAt,
      }
    })

    return { bookings: bookings, error: false }
  } catch (error) {
    return { error, bookings: null }
  }
}

module.exports = getUserBookingService
