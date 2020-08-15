require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
var morgan = require('morgan')
morgan.token('request', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request'))

app.get('/api/info', (req, res, next) => {
  Person.find({}).then(persons => {
    res.send(`
        <div>
        <p>Phonebook has info about ${persons.length} people</p>
        <p>${new Date()}</p>
        </div>
        `)
  }).catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.send(person) // aiemmin tässä oli alla oleva html. Since 3.18 palautetaan jsonia
      /*
            `
                <div>
                <p>${person.name}</p>
                <p>${person.number}</p>
                </div>
                `
            */
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  /*
    // tarkistetaan että nimi on annettu
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    // tarkistetaan samoin että numero on annettu
    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
*/
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log('poistetaan ID:llä', request.params.id)
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    }).catch(error => next(error))
})

//app.put('api')

app.put('/api/persons/:id', (request, response) => {

  const body = request.body
  console.log('body:', body)
  const newPerson = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
    .then(updatedPerson => {
      console.log('updatedPerson:', updatedPerson)
      response.json(updatedPerson)
    })
})

// tuntemattomattomien osoitteiden käsittely
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// virheiden käsittely
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send('<p>error: bad ID formatting</p>')
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})