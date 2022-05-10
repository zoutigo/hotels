const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../app')
const { user } = require('../../database/models')
const truncate = require('../../utils/truncate')

const fakeEmail = 'user@test.com'

describe('USER LOGIN', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should log in a new user', async () => {
    const res = await request(app).post('/api/users').send({
      email: fakeEmail,
      password: 'valery54',
      passwordConfirm: 'valery54',
      lastname: 'robert',
      firstname: 'emilio',
    })

    const res1 = await request(app).post('/api/login').send({
      username: fakeEmail,
      password: 'valery54',
    })

    const sampeResponse = {
      datas: null,
      message: 'hello',
    }
    const sampeResponse1 = {
      message: 'hello',
      token: null,
    }
    expect(res.statusCode).toEqual(201)
    expect(Object.keys(res.body)).toEqual(Object.keys(sampeResponse))
    expect(res1.statusCode).toEqual(200)
    expect(Object.keys(res1.body)).toEqual(Object.keys(sampeResponse1))
  })
})
