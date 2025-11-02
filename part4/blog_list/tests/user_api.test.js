const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const test_hepers = require('../utils/test_helper')
const assert = require('node:assert')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(test_hepers.initialUsersData)
})


describe('create user', async() => {
  test('create user', async () => {
    const dbDataBefore = await test_hepers.usersInDb()
    assert.strictEqual(dbDataBefore.length, test_hepers.initialUsersData.length)

    const newUser = {
      username: 'test_user',
      password: 'password',
      name: 'John Doe',
    }

    const response = await api.post('/api/users').send(newUser).expect(201)
    assert.notStrictEqual(response.body.id, undefined, 'Expected id to be defined')
    assert.notEqual(newUser.password, response.body.password)
    assert.strictEqual(newUser.username, response.body.username)
    assert.strictEqual(newUser.name, response.body.name)

    const dbDataAfter = await test_hepers.usersInDb()
    assert.strictEqual(dbDataAfter.length, dbDataBefore.length+1)
  })
})

test('list user', async () => {
  const response = await api.get('/api/users').expect(200)

  assert.strictEqual(response.body.length, test_hepers.initialUsersData.length)
})


after(async () => {
  await mongoose.connection.close()
})