const createHouseService = require('../services/houseServices/createHouseService')
const getHouseService = require('../services/houseServices/getHouseservice')
const listHouseService = require('../services/houseServices/listHousesService')
const updateHouseService = require('../services/houseServices/updateHouseService')
const storeImageService = require('../services/ImagesService/storeImageService')
const deleteUserService = require('../services/usersServices/deleteUserService')
const existUserService = require('../services/usersServices/existUserService')
const { BadRequest, Forbidden } = require('../utils/errors')

module.exports.getHouseList = async (req, res, next) => {
  const { houses, serverError, errors } = await listHouseService()

  if (errors && errors.length > 0) return next(new BadRequest(errors.join()))
  if (serverError) return next(serverError)

  return res.status(200).send({
    datas: houses,
  })
}
module.exports.postHouse = async (req, res, next) => {
  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('veillez renseigner les champs de données'))

  const { roles, uuid: userUuid } = req.user

  const isAllowedRole = roles.includes('admin')

  const isAllowed = isAllowedRole

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez créer un etablissement'))

  // traiter l'image et recupérer l'url

  if (!req.file) return next(new BadRequest('Veillez ajouter la bannière'))

  const { filepath, errors: imgErrors } = await storeImageService(req.file)

  if (imgErrors) return next(imgErrors.join())

  req.body.bannerUrl = filepath

  const { serverError, errors, newHouse } = await createHouseService(req.body)

  if (errors && errors.length > 0) return next(new BadRequest(errors.join()))
  if (serverError) return next(serverError)

  return res.status(201).send({
    datas: newHouse,
    message: "L'établissement a bien été crée",
  })
}

/// details opérations
module.exports.getHouse = async (req, res, next) => {
  if (!req.params || !req.params.uuid)
    return next(new BadRequest("veillez indiquer l'utilisateur recherché"))

  const { uuid } = req.params
  const isAllowed = true

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez pas consulter cette information'))

  const { error, requestedHouse, serverError } = await getHouseService(uuid)
  if (serverError) return next(serverError)
  if (error) return next(new BadRequest(error))

  return res.status(200).send(requestedHouse)
}
module.exports.putHouse = async (req, res, next) => {
  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('veillez renseigner les champs de données'))

  if (!req.params || !req.params.uuid)
    return next(new BadRequest("veillez indiquer l'utilisateur recherché"))

  const { uuid: houseUuid } = req.params

  const { roles, uuid: userUuid } = req.user

  const isAllowedRole = roles.includes('admin')

  const isAllowed = isAllowedRole

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez pas consulter cette information'))

  const { managerUuid } = req.body

  if (managerUuid) {
    const { error } = existUserService(managerUuid)
    if (error) return next(new BadRequest(error))
  }
  const { errors, serverError, updatedHouse } = await updateHouseService(
    houseUuid,
    req.body
  )
  if (errors && errors.length > 0) return next(new BadRequest(errors.join()))
  if (serverError) return next(serverError)

  return res.status(200).send({
    datas: updatedHouse,
    message: "L'établissement a été modifié",
  })
}
module.exports.deleteHouse = async (req, res, next) => {
  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('veillez renseigner les champs de données'))

  if (!req.params || !req.params.uuid)
    return next(new BadRequest("veillez indiquer l'utilisateur recherché"))

  const { uuid: houseUuid } = req.params

  const { roles, uuid: userUuid } = req.user

  const isAllowedRole = roles.includes('admin')

  const isAllowed = isAllowedRole

  if (!isAllowed)
    return next(new Forbidden('vous ne pouvez pas modifier cette information'))

  const { destroyed, error } = await deleteUserService(houseUuid, req.body)

  if (error) return next(new BadRequest(error))

  return res.status(200).send({
    message: "L'établissement a été supprimé",
  })
}
