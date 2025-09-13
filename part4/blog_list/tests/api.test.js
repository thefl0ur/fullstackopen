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

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of test_hepers.initialData){
    let obj = new Blog(blog)
    await obj.save()
  }
})

after(async () => {
  await mongoose.connection.close()
})