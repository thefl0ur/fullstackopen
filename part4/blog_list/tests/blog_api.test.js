const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const test_hepers = require('../utils/test_helper')
const Blog = require('../models/blog')
const assert = require('node:assert')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)
let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogs = await Blog.insertMany(test_hepers.initialBlogsData)

  await User.deleteMany()
  const saltRounds = 10
  const passwordHashed = await bcrypt.hash('password', saltRounds)
  const user = new User({
    username: 'username',
    password: passwordHashed,
    name: 'name',
  })

  const userSaved = await user.save()
  const userForToken = {
    username: userSaved.username,
    id: userSaved._id,
  }

  token = jwt.sign(userForToken, process.env.TOKEN_SIGN)

  for (const blog of blogs) {
    blog.user = userSaved._id
    await blog.save()
  }
})


test('list blogs', async () => {
  const response = await api.get('/api/blogs').expect(200)

  assert.strictEqual(response.body.length, test_hepers.initialBlogsData.length)
})

test('identifier name is id', async () => {
  const response = await api.get('/api/blogs')
  assert.notStrictEqual(response.body[0].id, undefined, 'Expected id to be defined')
})

describe('create blog', async () => {
  test('create blog normal', async () => {
    const dbDataBefore = await test_hepers.blogsInDb()
    assert.strictEqual(dbDataBefore.length, test_hepers.initialBlogsData.length)
  
    const blog = {
      title: 'test',
      author: 'test',
      url: 'localhost.com/1',
      likes: 3,
    }
  
    const response = await api.post('/api/blogs').send(blog).set('Authorization', `Bearer ${token}`).expect(201)
    
    assert.notStrictEqual(response.body.id, undefined, 'Expected id to be defined')
    assert.strictEqual(blog.title, response.body.title)
    assert.strictEqual(blog.author, response.body.author)
    assert.strictEqual(blog.url, response.body.url)
    assert.strictEqual(blog.likes, response.body.likes)
    
    const dbDataAfter = await test_hepers.blogsInDb()
    assert.strictEqual(dbDataAfter.length, dbDataBefore.length+1)
  })

  test('create blog by anon', async () => {
    const dbDataBefore = await test_hepers.blogsInDb()
    assert.strictEqual(dbDataBefore.length, test_hepers.initialBlogsData.length)
  
    const blog = {
      title: 'test',
      author: 'test',
      url: 'localhost.com/1',
      likes: 3,
    }
  
    await api.post('/api/blogs').send(blog).expect(401)

    const dbDataAfter = await test_hepers.blogsInDb()
    assert.strictEqual(dbDataAfter.length, dbDataBefore.length)
  })
})


test('default likes value', async () => {
  const blog = {
    title: 'test',
    author: 'test',
    url: 'localhost.com/1',
  }

  const response = await api.post('/api/blogs').send(blog).set('Authorization', `Bearer ${token}`).expect(201)
  assert.notStrictEqual(response.body.likes, undefined, 'Expectes "likes" property')
  assert.strictEqual(response.body.likes, 0)
})

describe('missing required params', async () => {
  test('Missing title', async () => {
    const blog = {
      author: 'test',
      url: 'localhost.com/1',
    }

    await api.post('/api/blogs').send(blog).set('Authorization', `Bearer ${token}`).expect(400)
  })

  test('Missing url', async () => {
    const blog = {
      title: 'test',
      author: 'test',
    }

    await api.post('/api/blogs').send(blog).set('Authorization', `Bearer ${token}`).expect(400)
  })

  test('Missing title and url', async () => {
    const blog = {
      author: 'test',
    }

    await api.post('/api/blogs').send(blog).set('Authorization', `Bearer ${token}`).expect(400)
  })

})

describe('delete blog post', async () => {
  test('delete existing blog', async () => {
    const dataBeforeDelete = await test_hepers.blogsInDb()
    const idToDelete = dataBeforeDelete[0].id
    await api.delete(`/api/blogs/${idToDelete}`).set('Authorization', `Bearer ${token}`).expect(204)

    const dataAfterDelete = await test_hepers.blogsInDb()
    assert.strictEqual(dataAfterDelete.length, dataBeforeDelete.length - 1)
    assert.strictEqual(dataAfterDelete.filter(x=>x.id == idToDelete).length, 0)
  })

  test('delete unexisting blog', async () => {
    const dataBeforeDelete = await test_hepers.blogsInDb()
    const removeId = '1234567890'
    await api.delete(`/api/blogs/${removeId}`).expect(204)

    const dataAfterDelete = await test_hepers.blogsInDb()
    assert.strictEqual(dataAfterDelete.length, dataBeforeDelete.length)
  })
})

describe('update likes', async () => {
  test('update existing blog', async () => {
    const dataBeforeUpdate = await test_hepers.blogsInDb()
    const idToUpdate = dataBeforeUpdate[0].id
    const likesBefore = dataBeforeUpdate[0].likes
    const response = await api.put(`/api/blogs/${idToUpdate}`).send({likes: likesBefore + 1}).expect(200)
    assert.strictEqual(response.body.likes, likesBefore + 1)

    const dataAfterUpdate = await test_hepers.blogsInDb()
    const updatedDbRecord = dataAfterUpdate.filter(x=>x.id == idToUpdate)
    assert.strictEqual(updatedDbRecord[0].likes, response.body.likes)
  })

  test('update existing blog', async () => {
    const idToUpdate = '1234567890'
    await api.put(`/api/blogs/${idToUpdate}`).send({likes: 777}).expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})