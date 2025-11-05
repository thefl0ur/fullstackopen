const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {'username': 1, 'name': 1})
  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.TOKEN_SIGN)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'Invalid user' })
  }

  const {title, author, url, likes} = request.body
  
  if (!title || !url) {
    return response.status(400).send({'error': 'Missing required field'})
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes ?? 0,
    user: user.id,
  })

  const blogSaved = await blog.save()

  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()

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