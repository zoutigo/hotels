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
const ownerDatas = {
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
const newSuite = {
  title: faker.commerce.productName(),
  description: faker.lorem.paragraphs(2, '<br/>\n'),
  bookinglink: 'https://www.booking.com/1',
  price: 500,
}

const imagepath = path.resolve(__dirname, `../test_images/test_img1.jpg`)
const imagepath1 = path.resolve(__dirname, `../test_images/test_img1.jpg`)
const imagepath2 = path.resolve(__dirname, `../test_images/test_img2.jpg`)
const imagepath3 = path.resolve(__dirname, `../test_images/test_img3.jpg`)

describe('SUITE -- GET: /api/suites/uuid', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should return status 200 and suite datas', async () => {
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
    const loginAdminResp = await request(app).post('/api/login').send({
      username: adminDatas.email,
      password: adminDatas.password,
    })

    // create house
    const createHouseResp = await request(app)
      .post(`/api/houses`)
      .set('Authorization', `Bearer ${loginAdminResp.body.token}`)
      .field('name', newHouse.name)
      .field('description', newHouse.description)
      .field('city', newHouse.city)
      .field('address', newHouse.address)
      .attach('file', imagepath)

    // create house owner
    const createOwnerResp = await request(app)
      .post('/api/users')
      .send(ownerDatas)

    // assign house to owner
    const assignHouseOwner = await request(app)
      .put(`/api/houses/${createHouseResp.body.datas.uuid}`)
      .set('Authorization', `Bearer ${loginAdminResp.body.token}`)
      .send({ managerUuid: createOwnerResp.body.datas.uuid })

    expect(assignHouseOwner.statusCode).toEqual(200)

    // login house owner
    const loginHouseOwnerResp = await request(app).post('/api/login').send({
      username: adminDatas.email,
      password: adminDatas.password,
    })
    expect(loginHouseOwnerResp.statusCode).toEqual(200)

    // create suite
    const createSuiteResp = await request(app)
      .post(`/api/suites`)
      .set('Authorization', `Bearer ${loginHouseOwnerResp.body.token}`)
      .field('title', newSuite.title)
      .field('description', newSuite.description)
      .field('bookinglink', newSuite.bookinglink)
      .field('price', newSuite.price)
      .field('houseUuid', createHouseResp.body.datas.uuid)
      .attach('files', imagepath1)
      .attach('files', imagepath2)
      .attach('files', imagepath3)

    // get suite request

    const getSuiteResp = await request(app).get(
      `/api/suites/${createSuiteResp.body.datas.uuid}`
    )

    expect(getSuiteResp.statusCode).toEqual(200)
    expect(getSuiteResp.body).toHaveProperty('uuid')
    expect(getSuiteResp.body).toHaveProperty('house.uuid')
    expect(getSuiteResp.body).toHaveProperty('images')
    expect(getSuiteResp.body).toHaveProperty('bannerUrl')
    expect(getSuiteResp.body).not.toHaveProperty('id')
  })
})