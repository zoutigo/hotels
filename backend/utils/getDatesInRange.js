// const getDatesInRange = (startDate, endDate) => {
//   const date = new Date(startDate.getTime())

//   const dates = []

//   while (date <= endDate) {
//     dates.push(new Date(date))
//     date.setDate(date.getDate() + 1)
//   }

//   return dates
// }
const getDatesInRange = (startDate, endDate) => {
  // startdate and enddate are timestamp : 1656028800000
  const date = new Date(startDate)

  const dates = []

  while (date <= endDate) {
    dates.push(new Date(date).getTime())
    date.setDate(date.getDate() + 1)
  }

  return dates
}

module.exports = getDatesInRange
