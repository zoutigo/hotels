const { Suite } = require('../database/models')
const { BadRequest } = require('../utils/errors')

module.exports.getSuiteList = async (req, res, next) => {
  const suites = await Suite.findAll()

  if (!suites) {
    return BadRequest('suites')
  }

  return res.status(200).send(suites)
}
module.exports.postSuite = async (req, res, next) => {
  res.send('post suite')
}

/// details opérations
module.exports.getSuite = async (req, res, next) => {
  res.send('get suite')
}

module.exports.putSuite = async (req, res, next) => {
  res.send('put suite')
}

module.exports.deleteSuite = async (req, res, next) => {
  res.send('delete suite')
}
