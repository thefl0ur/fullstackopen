const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
  const {username, password} = request.body

  const user = await User.findOne({username})

  const passwordCheck = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && passwordCheck)) {
    return response.status(401).json({error: 'Invalid username or password'})
  }

  const userInfo = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userInfo, process.env.TOKEN_SIGN)

  return response.status(200).send(
    {token, username: user.username, name: user.name}
  )
})

module.exports = loginRouter
