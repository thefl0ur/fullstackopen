const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((summ, blog) => summ + blog['likes'], 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (favorite, current) => favorite.likes < current.likes ? current : favorite
  )
}

const mostBlogs = (blogs) => {
  const [author,] = lodash.maxBy(
    lodash.toPairs(
      lodash.countBy(
        blogs, x => x.author
      )
    ),
    ([, cnt]) => cnt
  )

  return author
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}