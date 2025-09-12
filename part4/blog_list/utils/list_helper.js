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

module.exports = {
  dummy, totalLikes, favoriteBlog
}