const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const test_hepers = require('../utils/test_helper')
const Blog = require('../models/blog')
const assert = require('node:assert')

const api = supertest(app)

test('list blogs', async () => {
  const response = await api.get('/api/blogs').expect(200)

  assert.strictEqual(response.body.length, test_hepers.initialData.length)
})

test('identifier name is id', async () => {
    const response = await api.get('/api/blogs')
    assert.notStrictEqual(response.body[0].id, undefined, 'Expected id to be defined')
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(test_hepers.initialData)
})

after(async () => {
  await mongoose.connection.close()
})