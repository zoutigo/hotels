const dotenv = require('dotenv')
const multer = require('multer')
const fs = require('fs')
const { BadRequest } = require('../../utils/errors')

const uploadImages = (isMulti) => {
  const productionStorage = multer.diskStorage({
    destination: function (req, file, callback) {
      const dir = './public/images'
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
      callback(null, dir)
    },
    filename: function (req, file, callback) {
      const fileName = `${Date.now()}_${file.originalname
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

  if (isMulti) {
    return multer({
      storage: productionStorage,
      limits: {
        fileSize: 6 * 1000000,
      },
      fileFilter: ImageFilterProd,
    }).array('files', 20)
  }
  return multer({
    storage: productionStorage,
    limits: {
      fileSize: 6 * 1000000,
    },
    fileFilter: ImageFilterProd,
  }).single('file')
}

module.exports = uploadImages
