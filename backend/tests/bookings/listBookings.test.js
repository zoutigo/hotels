const request = require('supertest')
const moment = require('moment')
const { faker } = require('@faker-js/faker')
const path = require('path')
const app = require('../../app')
const { user } = require('../../database/models')
const truncate = require('../../utils/truncate')

const adminDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'Karamba45',
  passwordConfirm: 'Karamba45',
}
const ownerDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'Karamba45',
  passwordConfirm: 'Karamba45',
}
const userDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'Karamba45',
  passwordConfirm: 'Karamba45',
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

const bookingDatas = {
  startdate: faker.date.between('now', '+ 1 month'),
  enddate: faker.date.between('+2 month', '+3 month'),
}

const bookingDatas1 = {
  startdate: moment().add(1, 'days').valueOf(),
  enddate: moment().add(3, 'days').valueOf(),
}

const bookingDatas2 = {
  startdate: moment().add(5, 'days').valueOf(),
  enddate: moment().add(10, 'days').valueOf(),
}

const imagepath = path.resolve(__dirname, `../test_images/test_img1.jpg`)
const imagepath1 = path.resolve(__dirname, `../test_images/test_img1.jpg`)
const imagepath2 = path.resolve(__dirname, `../test_images/test_img2.jpg`)
const imagepath3 = path.resolve(__dirname, `../test_images/test_img3.jpg`)

describe('BOOKING -- GET: /api/bookings', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should return booking list length', async () => {
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

    // create user
    await request(app).post('/api/users').send(userDatas)

    // log user
    const loginUserResp = await request(app).post('/api/login').send({
      username: userDatas.email,
      password: userDatas.password,
    })

    // create booking1
    await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${loginUserResp.body.token}`)
      .send({
        ...bookingDatas1,
        suiteUuid: createSuiteResp.body.datas.uuid,
      })

    // create booking2
    const booking2 = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${loginUserResp.body.token}`)
      .send({
        ...bookingDatas2,
        suiteUuid: createSuiteResp.body.datas.uuid,
      })

    // get booking

    const getBookingResp = await request(app)
      .get(`/api/bookings`)
      .set('Authorization', `Bearer ${loginAdminResp.body.token}`)

    expect(getBookingResp.statusCode).toEqual(200)
    expect(getBookingResp.body.datas.length).toEqual(2)
    expect(getBookingResp.body.datas[0]).toHaveProperty('uuid')
    expect(getBookingResp.body.datas[0]).toHaveProperty('startdate')
    expect(getBookingResp.body.datas[0]).toHaveProperty('enddate')
    expect(getBookingResp.body.datas[0]).toHaveProperty('price')
    expect(getBookingResp.body.datas[0]).toHaveProperty('createdAt')
    expect(getBookingResp.body.datas[0]).not.toHaveProperty('id')
    expect(getBookingResp.body.datas[0]).not.toHaveProperty('suiteId')
    expect(getBookingResp.body.datas[0]).not.toHaveProperty('userId')
  })
})
