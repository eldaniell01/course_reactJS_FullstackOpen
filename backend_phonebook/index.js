require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Phonebook = require('./models/phonebook')
const app = express()
var morgan = require('morgan')
const phonebook = require('./models/phonebook')

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

app.use(express.json()) 
app.use(requestLogger)
app.use(morgan(':method :url :status :body :res[content-length] - :response-time ms'))
app.use(express.static('dist'))

let personas = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response)=>{
    phonebook.find({}).then(result=>{
        response.json(result)
    })
})

app.get('/info',(request, response)=>{
    const fecha = new Date()
    response.send(`<h1>${fecha}</h1>`)
})

app.get('/api/persons/:id', (request, response)=>{
  Phonebook.findById(request.params.id).then(person=>{
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response)=>{
  const id = request.params.id
  Phonebook.findByIdAndDelete(id).then(result=>{
    response.json(result)
  })
})

app.post('/api/persons', (request, response)=>{
  const body = request.body
  const person = new Phonebook({
    name: body.name,
    number: body.number,
  })
  person.save().then(savePerson=>{
    response.json(savePerson)
  })
})

const unknownEndpoint = (request, response)=>{
  response.status(404).send({error: 'ruta desconocida'})
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})