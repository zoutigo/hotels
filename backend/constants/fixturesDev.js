const { faker } = require('@faker-js/faker')
const { v4: uuidv4 } = require('uuid')
const { default: hashPassword } = require('../utils/hashPassword')
const slugify = require('../utils/slugify')
const mailTopics = require('./mailTopics')

const devManagers = []
for (let a = 0; a < 10; a++) {
  const devManager = {
    lastname: faker.name.lastName(),
    firstname: faker.name.firstName(),
    email: `manager${a}@test.com`,
    password: 'Password54',
    roles: JSON.stringify(['manager']),
    createdAt: new Date(),
    updatedAt: new Date(),
    uuid: uuidv4(),
  }
  devManagers.push(devManager)
}

const devAdmin = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: 'admin@test.com',
  password: 'Password54',
  roles: ['admin'],
  createdAt: new Date(),
  updatedAt: new Date(),
  uuid: uuidv4(),
}

const devClients = []
for (let i = 0; i < 10; i++) {
  const client = {
    lastname: faker.name.lastName(),
    firstname: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'Password54',
    roles: ['client'],
    createdAt: new Date(),
    updatedAt: new Date(),
    uuid: uuidv4(),
  }
  devClients.push(client)
}

const devHouses = []
for (let j = 0; j < 15; j++) {
  const name = faker.company.companyName()
  const house = {
    name,
    city: faker.address.cityName(),
    address: faker.address.streetAddress(),
    description: faker.lorem.paragraphs(2, '<br/>\n'),
    slug: slugify(name),
    bannerUrl: `img${Math.floor(Math.random() * 11)}.jpg`,
    createdAt: new Date(),
    updatedAt: new Date(),
    uuid: uuidv4(),
  }
  devHouses.push(house)
}

const devSuites = []
for (let k = 0; k < 60; k++) {
  const suite = {
    title: faker.company.companyName(),
    description: faker.lorem.paragraphs(2, '<br/>\n'),
    price: faker.commerce.price(10, 10000, 2),
    bannerUrl: `img${Math.floor(Math.random() * 11)}.jpg`,
    bookinglink: faker.internet.url(),
    createdAt: new Date(),
    updatedAt: new Date(),
    uuid: uuidv4(),
  }
  devSuites.push(suite)
}

const devMails = []
for (let l = 0; l < 20; l++) {
  const mail = {
    lastname: faker.name.lastName(),
    firstname: faker.name.firstName(),
    email: faker.internet.email(),
    content: faker.lorem.paragraphs(2, '<br/>\n'),
    topic: mailTopics[l % 2 === 0 ? 0 : 1],
    createdAt: new Date(),
    updatedAt: new Date(),
    uuid: uuidv4(),
  }
  devMails.push(mail)
}

const devImages = []

for (let m = 0; m < 600; m++) {
  const image = {
    filename: faker.company.catchPhrase(),
    filepath: `img${Math.floor(Math.random() * 11)}.jpg`,
    createdAt: new Date(),
    updatedAt: new Date(),
    uuid: uuidv4(),
  }

  devImages.push(image)
}

const devBookings = []
for (let n = 0; n < 10; n++) {
  const booking = {
    startdate: faker.date.recent().getTime(),
    enddate: faker.date.future().getTime(),
    price: faker.commerce.price(10, 10000, 2),
    createdAt: new Date(),
    updatedAt: new Date(),
    uuid: uuidv4(),
  }
  devBookings.push(booking)
}

module.exports = {
  devAdmin,
  devClients,
  devHouses,
  devSuites,
  devMails,
  devImages,
  devBookings,
  devManagers,
}
