const Moment = require('moment'),
  MomentRange = require('moment-range'),
  moment = MomentRange.extendMoment(Moment)

const getDatesInRange = (startdate, enddate) => {
  const dateFormat = 'DD-MM-YYYY'
  try {
    const dates = [
      moment(new Date(startdate), dateFormat),
      moment(new Date(enddate), dateFormat),
    ]
    const range = moment.range(dates)

    const array = Array.from(range.by('days'))
    const timestamps = array.map((d) => d.valueOf())

    return timestamps
  } catch (error) {
    return []
  }
}

module.exports = getDatesInRange
