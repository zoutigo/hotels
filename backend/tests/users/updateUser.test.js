const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../app')
const { user } = require('../../database/models')
const truncate = require('../../utils/truncate')

const sampeResponse = {
  datas: null,
  message: 'hello',
}

const adminDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email().toLocaleLowerCase(),
  password: 'karamba18',
  passwordConfirm: 'karamba18',
}
const userDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: 'user1@test.com',
  password: 'karamba18',
  passwordConfirm: 'karamba18',
}

describe('USER PUT', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should update user request comes from admin', async () => {
    // admin creation
    const res1 = await request(app).post('/api/users').send(adminDatas)
    await user.update(
      { roles: ['client', 'admin'] },
      { where: { uuid: res1.body.datas.uuid } }
    )

    // user creation
    const res2 = await request(app).post('/api/users').send(userDatas)

    // admin login
    const res3 = await request(app).post('/api/login').send({
      username: adminDatas.email,
      password: adminDatas.password,
    })

    // admin put request
    const tokenHeader = { Authorization: 'Bearer ' + res3.body.token }

    const res4 = await request(app)
      .put(`/api/users/${res2.body.datas.uuid}`)
      .send({ lastname: 'valeria' })
      .set(tokenHeader)

    expect(res4.statusCode).toEqual(200)
    expect(Object.keys(res4.body)).toEqual(Object.keys(sampeResponse))
    expect(res4.body.datas.lastname).toEqual('valeria')
  })
})
