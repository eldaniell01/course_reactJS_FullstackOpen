require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/note')
const app = express()
const http = require('http')

app.use(express.static('dist'))
app.use(express.json())



/*const password = process.argv[2]
const url = `mongodb://eldaniell01:${password}@ac-vqfb2by-shard-00-00.0sh3cuj.mongodb.net:27017,ac-vqfb2by-shard-00-01.0sh3cuj.mongodb.net:27017,ac-vqfb2by-shard-00-02.0sh3cuj.mongodb.net:27017/notes?ssl=true&replicaSet=atlas-10pb4k-shard-0&authSource=admin`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  } 
})

const Note = mongoose.model('Note', noteSchema)*/

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length>0
    ? Math.max(...notes.map(n=>Number(n.id)))
    : 0
  return String(maxId +1)
}

app.get('/api/notes', (request, response)=>{
  Note.find({}).then(notes=>{
    response.json(notes)
  })
})


app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note=>{
    if(note){
      response.json(note)
    }else{
      response.status(404).end()
    }
  })
  .catch(error=> next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findByIdAndDelete(id).then(result=>{
    response.status(204).end()
  })
  .catch(error=> next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body
  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }
      note.content = content
      note.important = important
      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body
  if(!body.content){
    return response.status(400).json({
      error: 'contenido perdido'
    })
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(saveNote => {
    response.json(saveNote)
  })
  .catch(error=> next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name==='ValidationError'){
    return response.status(400).json({error: error.message})
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

/*
app.get('/', (request, response)=>{
  response.send('<h1>HOLA MUNDO</h1>')
})

app.get('/api/notes', (request, response)=>{
  response.json(notes)
})
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(JSON.stringify(notes))
})*/

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})