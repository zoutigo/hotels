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
  password: 'JoaoPinto67',
  passwordConfirm: 'JoaoPinto67',
}

const newHouse = {
  name: faker.commerce.productName(),
  description: faker.lorem.paragraphs(2, '<br/>\n'),
  city: faker.address.city(),
  address: faker.address.streetAddress(false),
}

const image = path.resolve(__dirname, `../test_images/test_img1.jpg`)

const imagepath = path.resolve(__dirname, `../test_images/test_img1.jpg`)

describe('HOUSE -- POST: /api/houses', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should return created house with admin profile', async () => {
    // create images

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

    expect(houseResp.statusCode).toEqual(201)
    expect(houseResp.body).toHaveProperty('datas.uuid')
  })
  it('should return error with not admin profile', async () => {
    // create user
    await request(app).post('/api/users').send(adminDatas)

    // user login
    const loginResp = await request(app).post('/api/login').send({
      username: adminDatas.email,
      password: adminDatas.password,
    })

    // create house
    const tokenHeader = { Authorization: 'Bearer ' + loginResp.body.token }
    const houseResp = await request(app)
      .post(`/api/houses`)
      .set('Authorization', `Bearer ${loginResp.body.token}`)
      .field('name', newHouse.name)
      .field('description', newHouse.description)
      .field('city', newHouse.city)
      .field('address', newHouse.address)
      .attach('file', imagepath)

    expect(houseResp.statusCode).toEqual(403)
  })
  it('should return error with no logged user', async () => {
    const houseResp = await request(app)
      .post(`/api/houses`)
      .field('name', newHouse.name)
      .field('description', newHouse.description)
      .field('city', newHouse.city)
      .field('address', newHouse.address)
      .attach('file', imagepath)
    expect(houseResp.statusCode).toEqual(401)
  })
})
