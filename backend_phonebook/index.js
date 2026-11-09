
const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')

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
app.use(cors())

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
    response.json(personas)
})

app.get('/info',(request, response)=>{
    const fecha = new Date()
    response.send(`<h1>${fecha}</h1>`)
})

app.get('/api/persons/:id', (request, response)=>{
  const id = request.params.id
  const person = personas.find(person=> person.id===id)
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response)=>{
  const id = request.params.id
  personas = personas.filter(person=>person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response)=>{
  const body = request.body
  const name = personas.filter(person => person.name === body.name)
  if(!body.name || !body.number){
    console.log(body)
    return response.status(400).json({
      error: 'contenido perdido'
    })
  }
  if(name){
    return response.status(400).json({
      error: 'ya hay un nombre igual'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: String(Math.max(...personas.map(p => Number(p.id))) + 1)
  }

  personas = personas.concat(person)
  response.json(person)
})

const unknownEndpoint = (request, response)=>{
  response.status(404).send({error: 'ruta desconocida'})
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})