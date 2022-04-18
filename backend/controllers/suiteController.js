const storeImageService = require('../services/ImagesService/storeImageService')
const CreateSuiteService = require('../services/suiteService/createSuiteService')
const deleteSuiteImageService = require('../services/suiteService/deleteSuiteImageService')
const deleteSuiteService = require('../services/suiteService/deleteSuiteService')
const getSuiteService = require('../services/suiteService/getSuiteService')
const listSuiteService = require('../services/suiteService/listSuiteService')
const updateSuiteService = require('../services/suiteService/updateSuiteService')
const isHouseManagerService = require('../services/usersServices/isHouseManagerService')
const isSuiteManagerService = require('../services/usersServices/isSuiteManagerService')

const { BadRequest, Forbidden } = require('../utils/errors')

module.exports.getSuiteList = async (req, res, next) => {
  const { suites, serverError, errors } = await listSuiteService()

  if (errors && errors.length > 0) return next(new BadRequest(errors.join()))
  if (serverError) return next(serverError)

  return res.status(200).send({
    datas: suites,
  })
}
module.exports.postSuite = async (req, res, next) => {
  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('veillez renseigner les champs de données'))

  const { roles, uuid: userUuid } = req.user
  const { houseUuid } = req.body
  if (!houseUuid)
    return next(new BadRequest("il manque l'établissement à votre requette"))

  const { userIsHouseManager } = await isHouseManagerService(
    houseUuid,
    userUuid
  )

  const isAllowedRole = roles.includes('manager') || roles.includes('admin')

  const isAllowed = isAllowedRole || userIsHouseManager

  if (!isAllowed) return next(new Forbidden('vous ne pouvez créer une suite'))

  // traiter les images

  if (!req.files || req.files.length < 1)
    return next(new BadRequest('les images ne sont pas telechargées'))

  const filesErrors = []

  const images = await Promise.all(
    req.files.map(async (file) => {
      const {
        filepath,
        filename,
        error: imgError,
      } = await storeImageService(file)
      if (imgError) {
        // await filesErrors.push(imgError)
      }
      return { filename, filepath }
    })
  )

  if (filesErrors && filesErrors.length > 0) return next(filesErrors.join())

  const [banner, ...rest] = images
  req.body.bannerUrl = banner.filepath
  req.body.images = rest

  const { serverError, errors, createdSuite } = await CreateSuiteService(
    req.body
  )

  if (errors && errors.length > 0) return next(new BadRequest(errors.join()))
  if (serverError) return next(serverError)

  return res.status(201).send({
    datas: createdSuite,
    message: 'La suite a bien été crée',
  })
}

/// details opérations
module.exports.getSuite = async (req, res, next) => {
  if (!req.params || !req.params.suiteUuid)
    return next(new BadRequest("veillez indiquer l'utilisateur recherché"))

  const { suiteUuid } = req.params
  const isAllowed = true

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez pas consulter cette information'))

  const { error, requestedSuite, serverError } = await getSuiteService(uuid)
  if (serverError) return next(serverError)
  if (error) return next(new BadRequest(error))

  return res.status(200).send(requestedSuite)
}

module.exports.putSuite = async (req, res, next) => {
  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('veillez renseigner les champs de données'))

  const { roles, uuid: userUuid } = req.user
  const { suiteUuid } = req.params
  if (!suiteUuid)
    return next(new BadRequest("il manque l'établissement à votre requette"))

  const { userIsHouseManager } = await isSuiteManagerService(
    suiteUuid,
    userUuid
  )

  const isAllowedRole = roles.includes('manager') || roles.includes('admin')

  const isAllowed = isAllowedRole || userIsHouseManager

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez créer modifier cette suite'))

  // on ne gère pas les images ici

  const { serverError, errors, updatedSuite } = await updateSuiteService(
    suiteUuid,
    req.body
  )

  if (serverError) return next(serverError)
  if (errors) return next(new BadRequest(errors.join(' ')))

  return res.status(200).send({
    message: 'la suite a bien été modifiée',
    datas: updatedSuite,
  })
}

module.exports.deleteSuite = async (req, res, next) => {
  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('veillez renseigner les champs de données'))

  if (!req.params || !req.params.suiteUuid)
    return next(new BadRequest("veillez indiquer l'image à supprimer'"))

  const { suiteUuid } = req.params

  const { roles, uuid: userUuid } = req.user

  const { userIsHouseManager } = await isSuiteManagerService(
    suiteUuid,
    userUuid
  )

  const isAllowedRole = roles.includes('admin')

  const isAllowed = isAllowedRole || userIsHouseManager

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez pas modifier cette information'))

  const { destroyed, error } = await deleteSuiteService(suiteUuid, req.body)

  if (error) return next(new BadRequest(error))

  return res.status(200).send({
    message: "L'établissement a été supprimé",
  })
}
module.exports.deleteImage = async (req, res, next) => {
  if (!req.params || !req.params.imageUuid || !req.params.imageUuid)
    return next(new BadRequest("veillez indiquer l'utilisateur recherché"))

  const { imageUuid, suiteUuid } = req.params

  const { roles, uuid: userUuid } = req.user

  const { userIsHouseManager } = await isSuiteManagerService(
    suiteUuid,
    userUuid
  )

  const isAllowedRole = roles.includes('admin')

  const isAllowed = isAllowedRole || userIsHouseManager

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez pas modifier cette information'))

  const { destroyed, error } = await deleteSuiteImageService(
    suiteUuid,
    imageUuid
  )

  if (error) return next(new BadRequest(error))

  return res.status(200).send({
    message: "l'image a bien été supprimée",
  })
}
