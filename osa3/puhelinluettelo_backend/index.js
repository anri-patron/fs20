const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
var morgan = require('morgan')
morgan.token("request", (req, res) => {
    if (req.method === "POST") return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/api/info', (req, res) => {
    res.send(`
        <div>
        <p>Phonebook has info about ${persons.length} people</p>
        <p>${new Date()}</p>
        </div>
        `)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.send(`
        <div>
        <p>${person.name}</p>
        <p>${person.number}</p>
        </div>
        `)
    } else {
        res.status(404).end()
    }
})

// generoi idn väliltä 0 -> 9999
const generateId = () => {
    return Math.floor(Math.random() * Math.floor(10000))
}

app.post('/api/persons', (req, res) => {
    console.log('post sisältö:', req.body)
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

    const found = persons.find(p => p.name === body.name)
    if (found) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(newPerson)

    res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log('poistetaan id:llä:', id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})