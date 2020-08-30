const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // jos title tai url puuttuu, niin vastataan koodilla 400 ja lopetetaan
  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  } else {
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0 // jos likes kenttää ei ole annettu asetetaan se nollaksi
    })

    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog.toJSON())
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter