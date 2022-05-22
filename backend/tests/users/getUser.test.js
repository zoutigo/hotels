const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../app')
const { user } = require('../../database/models')
const truncate = require('../../utils/truncate')

const fakeEmail = faker.internet.email()

const sampeResponse = {
  datas: null,
  message: 'hello',
}

const adminDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'Karamba4567',
  passwordConfirm: 'Karamba4567',
}
const userDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'Karamba4567',
  passwordConfirm: 'Karamba4567',
}

describe('USER GET', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should return 401 code if user does not have role manager or admin', async () => {
    const res = await request(app).post('/api/users').send({
      email: fakeEmail,
      password: 'Valery54',
      passwordConfirm: 'Valery54',
      lastname: 'robert',
      firstname: 'emilio',
    })

    const res1 = await request(app).get(`/api/users/${res.body.datas.uuid}`)
    expect(res1.statusCode).toEqual(401)
  })
  it('should get user when admin  or manager request', async () => {
    // admin creation
    const adminResp = await request(app).post('/api/users').send(adminDatas)

    await user.update(
      { roles: ['client', 'admin'] },
      { where: { uuid: adminResp.body.datas.uuid } }
    )
    // user creation
    const userResp = await request(app).post('/api/users').send(userDatas)

    // admin login
    const adminLoginResp = await request(app).post('/api/login').send({
      username: adminDatas.email,
      password: adminDatas.password,
    })

    // admin get request
    // const tokenHeader = { Authorization: 'Bearer ' + res3.body.token }

    const res4 = await request(app)
      .get(`/api/users/${userResp.body.datas.uuid}`)
      .set('Authorization', `Bearer ${adminLoginResp.body.token}`)

    expect(res4.statusCode).toEqual(200)
  })
})
