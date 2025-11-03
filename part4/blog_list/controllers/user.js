const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const errors = []
  if (password.length < 3) {
    errors.push('`password` it too short')
  }

  if (username.length < 3) {
    errors.push('`username` it too short')
  }

  if (errors.length != 0) {
    return response.status(400).send({'errors': errors})
  }

  const saltRounds = 10
  const passwordHashed = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    password: passwordHashed,
    name: name,
  })

  try {
    const userSaved = await user.save()
    return response.status(201).json(userSaved)
  } catch (err) {
    if (err.code === 11000) {
      return response.status(400).send({'errors': ['`username` if already claimed']})
    }
  }
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).select('-password').populate('blogs', { user: 0})
  return response.json(users)
})

module.exports = userRouter
