require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
var morgan = require('morgan')

const app = express()

const requestLogger = (request, response, next)=>{
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

morgan.token('body', (request) => {
    return JSON.stringify(request.body)
})
//app.use(express.static('dist'))
app.use(express.json()) 
app.use(requestLogger)
app.use(morgan(':method :url :status :body :res[content-length] - :response-time ms'))


app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save().then( saveBlog => {
    response.json(saveBlog)
  })
  .catch(error=>next(error))
})

const unknownEndpoint = (request, response)=>{
  response.status(404).send({error: 'ruta desconocida'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})