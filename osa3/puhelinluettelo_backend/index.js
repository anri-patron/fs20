require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
var morgan = require('morgan')
morgan.token("request", (req, res) => {
    if (req.method === "POST") return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request'))

app.get('/api/info', (req, res) => {
    res.send(`
        <div>
        <p>Phonebook has info about ${persons.length} people</p>
        <p>${new Date()}</p>
        </div>
        `)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
      })
})

app.get('/api/persons/:id', (req, res) => {

    Person.findById(req.params.id).then(person => {
        res.send(`
        <div>
        <p>${person.name}</p>
        <p>${person.number}</p>
        </div>
        `)
    }).catch(error => {
        res.status(404).end()
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
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

    const person = new Person({
        name: body.name,
        number: body.number
      })
    
      person.save().then(savedPerson => {
        res.json(savedPerson)
      })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})