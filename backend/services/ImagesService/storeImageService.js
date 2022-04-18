const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const deleteFileStorage = require('./deleteImageStorage')

const storeImageService = async (file) => {
  try {
    const directory = path.join('.', 'public/images', '/')
    const timestamp = new Date().toISOString()

    fs.access(directory, (error) => {
      if (error) {
        fs.mkdirSync(directory)
      }
    })

    const { buffer, originalname } = file
    const ref = `${timestamp}-${originalname}.webp`
    const destination = path.join(directory, ref)

    await sharp(buffer).webp({ quality: 20 }).toFile(destination)

    const location =
      process.env.NODE_ENV === 'production'
        ? `${process.env.SERVER_ADRESS}/images/${ref}`
        : `http://localhost:3500/images/${ref}`

    return { filename: ref, filepath: location }
  } catch (error) {
    deleteFileStorage(file.path)

    return { error: error }
  }
}

module.exports = storeImageService
