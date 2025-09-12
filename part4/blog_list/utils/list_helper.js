const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((summ, blog) => summ + blog['likes'], 0)
}

module.exports = {
  dummy, totalLikes
}