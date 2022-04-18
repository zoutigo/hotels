const fs = require('fs')

const deleteFileStorage = (filepath = null, error = null) => {
  if (filepath) {
    fs.unlink(filepath, (err) => {
      if (err) return err
    })
  }
  if (error) return error
  return null
}

module.exports = deleteFileStorage
