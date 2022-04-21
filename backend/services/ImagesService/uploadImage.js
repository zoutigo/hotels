const dotenv = require('dotenv')
const multer = require('multer')
const fs = require('fs')
const { BadRequest } = require('../../utils/errors')

const uploadImage = (module, limit) => {
  const productionStorage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, directory)
    },
    filename: function (req, file, callback) {
      const fileName = `${Date.now()}_${module}_${file.originalname
        .toLocaleLowerCase()
        .split(' ')
        .join('-')}`
      callback(null, fileName)
    },
  })
  const ImageFilterProd = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/webp'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new BadRequest('Allowed only .png, .jpg, .jpeg and .gif'))
    }
  }

  return multer({
    storage: productionStorage,
    limits: {
      fileSize: limit * 1000000,
    },
    fileFilter: ImageFilterProd,
  }).single('file')
}

module.exports = uploadImage
