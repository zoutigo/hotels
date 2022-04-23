const Moment = require('moment'),
  MomentRange = require('moment-range'),
  moment = MomentRange.extendMoment(Moment)

const getDatesInRange = (startdate, enddate) => {
  const dates = [moment(startdate).format('L'), moment(enddate).format('L')]
  const range = moment.range(dates)
  const array = Array.from(range.by('days'))
  const timestamps = array.map((d) => d.valueOf())

  return timestamps
}

module.exports = getDatesInRange
