const { validationResult, ValidationChain } = require('express-validator')
const { BadRequest } = require('../utils/errors')

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req)
      if (result.errors.length) break
    }

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    return next(new BadRequest(errors.array()[0].msg))

    // res.status(400).json({ errors: errors.array() })
  }
}

module.exports = validate
