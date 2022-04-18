const getValidationErrorsArray = (error) => {
  const errorsList = []
  error.errors.map((er) => {
    errorsList.push(er.message)
    return null
  })
  return errorsList
}

module.exports = getValidationErrorsArray
