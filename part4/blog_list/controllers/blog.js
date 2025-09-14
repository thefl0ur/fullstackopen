const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).send({'error': 'Missing required field'})
  }

  const blog = new Blog(request.body)
  const blogSaved = await blog.save()
  return response.status(201).json(blogSaved)
})

module.exports = blogRouter