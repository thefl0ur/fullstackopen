const jwt = require('jsonwebtoken')
const User = require('./models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const tokenExtractor = (request, response, next) => {
  request.token=getTokenFrom(request)

  next()
}

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return next()
  }

  const decodedToken = jwt.verify(request.token, process.env.TOKEN_SIGN)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'Invalid user' })
  }

  request.user = user

  next()
}


module.exports = {tokenExtractor, userExtractor}

