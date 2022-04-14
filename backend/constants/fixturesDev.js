const { faker } = require('@faker-js/faker')
const slugify = require('../utils/slugify')

const devManager = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: 'manager@test.com',
  password: 'password',
  roles: ['manager'],
  createdAt: new Date(),
  updatedAt: new Date(),
}
const devAdmin = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: 'admin@test.com',
  password: 'password',
  roles: ['admin'],
  createdAt: new Date(),
  updatedAt: new Date(),
}

const devClients = []
for (let i = 0; i < 10; i++) {
  const client = {
    lastname: faker.name.lastName(),
    firstname: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'password',
    roles: ['client'],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  devClients.push(client)
}

const devHouses = []

for (let j = 0; j < 10; j++) {
  const name = faker.company.companyName()
  const house = {
    name,
    city: faker.address.cityName(),
    address: faker.address.streetAddress(),
    description: faker.lorem.paragraphs(2, '<br/>\n'),
    slug: slugify(name),
    bannerUrl: faker.internet.url(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  devHouses.push(house)
}

module.exports = {
  devManager,
  devAdmin,
  devClients,
  devHouses,
}
