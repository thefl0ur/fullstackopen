const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const saltRounds = 10
  const passwordHashed = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    password: passwordHashed,
    name: name,
  })

  const userSaved = await user.save()
  return response.status(201).json(userSaved)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).select('-password')
  return response.json(users)
})

module.exports = userRouter
