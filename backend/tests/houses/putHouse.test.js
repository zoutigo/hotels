const request = require('supertest')
const { faker } = require('@faker-js/faker')
const path = require('path')
const app = require('../../app')
const { user } = require('../../database/models')
const truncate = require('../../utils/truncate')

const adminDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'karamba18',
  passwordConfirm: 'karamba18',
}
const userDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'karamba18',
  passwordConfirm: 'karamba18',
}

const newHouse = {
  name: faker.commerce.productName(),
  description: faker.lorem.paragraphs(2, '<br/>\n'),
  city: faker.address.city(),
  address: faker.address.streetAddress(false),
}

const image = path.resolve(__dirname, `../test_images/test_img1.jpg`)

describe('HOUSE -- PU: /api/houses/uuid', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should return status code 200 when updating house name', async () => {
    // create image
    const imagepath = path.resolve(__dirname, `../test_images/test_img1.jpg`)

    // create admin user
    const createAdminResp = await request(app)
      .post('/api/users')
      .send(adminDatas)

    // assign role admin to user
    await user.update(
      { roles: ['client', 'admin'] },
      { where: { uuid: createAdminResp.body.datas.uuid } }
    )

    // admin login
    const loginResp = await request(app).post('/api/login').send({
      username: adminDatas.email,
      password: adminDatas.password,
    })

    // create house
    const houseResp = await request(app)
      .post(`/api/houses`)
      .set('Authorization', `Bearer ${loginResp.body.token}`)
      .field('name', newHouse.name)
      .field('description', newHouse.description)
      .field('city', newHouse.city)
      .field('address', newHouse.address)
      .attach('file', imagepath)

    // put the created house
    const newName = faker.company.companyName()
    const putHouseResp = await request(app)
      .put(`/api/houses/${houseResp.body.datas.uuid}`)
      .set('Authorization', `Bearer ${loginResp.body.token}`)
      .send({ name: newName })

    expect(putHouseResp.statusCode).toEqual(200)
    // expect(getHouseResp.body.datas.length).toEqual(2)
  })
  it('should return status code 403 if not when updating house name', async () => {
    // create image
    const imagepath = path.resolve(__dirname, `../test_images/test_img1.jpg`)

    // create admin user
    const createAdminResp = await request(app)
      .post('/api/users')
      .send(adminDatas)

    // assign role admin to user
    await user.update(
      { roles: ['client', 'admin'] },
      { where: { uuid: createAdminResp.body.datas.uuid } }
    )

    // admin login
    const loginResp = await request(app).post('/api/login').send({
      username: adminDatas.email,
      password: adminDatas.password,
    })

    // create house
    const houseResp = await request(app)
      .post(`/api/houses`)
      .set('Authorization', `Bearer ${loginResp.body.token}`)
      .field('name', newHouse.name)
      .field('description', newHouse.description)
      .field('city', newHouse.city)
      .field('address', newHouse.address)
      .attach('file', imagepath)

    // create a user
    await request(app).post('/api/users').send(userDatas)

    // login user
    const loginUserResp = await request(app).post('/api/login').send({
      username: userDatas.email,
      password: userDatas.password,
    })

    // put the created house
    const newName = faker.company.companyName()
    const putHouseResp = await request(app)
      .put(`/api/houses/${houseResp.body.datas.uuid}`)
      .set('Authorization', `Bearer ${loginUserResp.body.token}`)
      .send({ name: newName })

    expect(putHouseResp.statusCode).toEqual(403)
  })
})
