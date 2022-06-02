const request = require('supertest')
const { faker } = require('@faker-js/faker')
const { sequelize } = require('../../database/models/index.js')

const app = require('../../app')
const { user, house, suite, booking, image } = require('../../database/models')
const truncate = require('../../utils/truncate.js')

const sampeResponse = {
  datas: null,
  message: 'hello',
}

describe('USER REGISTER', () => {
  beforeEach(async () => {
    try {
      await truncate()
    } catch (error) {
      console.log('error', error)
    }
  })

  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').send({
      email: faker.internet.email(),
      password: 'Roberta678',
      passwordConfirm: 'Roberta678',
      lastname: 'robert',
      firstname: 'emilio',
    })

    expect(res.statusCode).toEqual(201)
    expect(Object.keys(res.body)).toEqual(Object.keys(sampeResponse))
    expect(res.body).toHaveProperty('datas')
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty(['datas', 'email'])
    // expect(res.body).toHaveProperty('datas.token')
    expect(res.body.datas).not.toHaveProperty('id')
    expect(res.body.datas).not.toHaveProperty('password')
  })
})
