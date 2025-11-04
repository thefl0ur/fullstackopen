const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const app = express()

logger.info('Connecting to: ', config.MONGO_URI)

mongoose.connect(config.MONGO_URI).then(
  () => {
    logger.info('Connected')
  }
).catch(
  error => {
    logger.error('Connection failed: ', error.message)
  }
)

app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/login', loginRouter)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

module.exports = app