const { test, after, beforeEach, describe } = require('node:test')
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

test('create blog', async () => {
  const dbDataBefore = await test_hepers.dataInDb()
  assert.strictEqual(dbDataBefore.length, test_hepers.initialData.length)

  const blog = {
    title: 'test',
    author: 'test',
    url: 'localhost.com/1',
    likes: 3,
  }

  const response = await api.post('/api/blogs').send(blog).expect(201)
  
  assert.notStrictEqual(response.body.id, undefined, 'Expected id to be defined')
  assert.strictEqual(blog.title, response.body.title)
  assert.strictEqual(blog.author, response.body.author)
  assert.strictEqual(blog.url, response.body.url)
  assert.strictEqual(blog.likes, response.body.likes)
  
  const dbDataAfter = await test_hepers.dataInDb()
  assert.strictEqual(dbDataAfter.length, dbDataBefore.length+1)
})

test('default likes value', async () => {
  const blog = {
    title: 'test',
    author: 'test',
    url: 'localhost.com/1',
  }

  const response = await api.post('/api/blogs').send(blog).expect(201)
  assert.notStrictEqual(response.body.likes, undefined, 'Expectes "likes" property')
  assert.strictEqual(response.body.likes, 0)
})

describe('missing required params', async () => {
  test('Missing title', async () => {
    const blog = {
      author: 'test',
      url: 'localhost.com/1',
    }

    await api.post('/api/blogs').send(blog).expect(400)
  })

  test('Missing url', async () => {
    const blog = {
      title: 'test',
      author: 'test',
    }

    await api.post('/api/blogs').send(blog).expect(400)
  })

  test('Missing title and url', async () => {
    const blog = {
      author: 'test',
    }

    await api.post('/api/blogs').send(blog).expect(400)
  })

})

describe('delete blog post', async () => {
  test('delete existing blog', async () => {
    const dataBeforeDelete = await test_hepers.dataInDb()
    const idToDelete = dataBeforeDelete[0].id
    await api.delete(`/api/blogs/${idToDelete}`).expect(204)

    const dataAfterDelete = await test_hepers.dataInDb()
    assert.strictEqual(dataAfterDelete.length, dataBeforeDelete.length - 1)
    assert.strictEqual(dataAfterDelete.filter(x=>x.id == idToDelete).length, 0)
  })

  test('delete unexisting blog', async () => {
    const dataBeforeDelete = await test_hepers.dataInDb()
    const removeId = '1234567890'
    await api.delete(`/api/blogs/${removeId}`).expect(204)

    const dataAfterDelete = await test_hepers.dataInDb()
    assert.strictEqual(dataAfterDelete.length, dataBeforeDelete.length)
  })
})


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(test_hepers.initialData)
})

after(async () => {
  await mongoose.connection.close()
})