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

blogRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
  }
  catch {
    console.log(`No record with id ${request.params.id}`)
  }
  
  return response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const newLikes = request.body.likes

  let blog
  try {
    blog = await Blog.findById(request.params.id)
  } catch {
    return response.status(404).end()
  }
 
  blog.likes = newLikes
  const updatedBlog = await blog.save()

  return response.json(updatedBlog)
})

module.exports = blogRouter