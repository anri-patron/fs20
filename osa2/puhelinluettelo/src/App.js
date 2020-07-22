import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  const addPhoneNumber = (event) => {
    event.preventDefault()
    console.log('addPhoneNro')

    const i = persons.findIndex(person => person.name === newName)
    if (i !== -1) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const numbersToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter)) //person.name === filter)

  const handleNameChange = (event) => {
    console.log('nimi: ', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('numero: ', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('filter: ', event.target.value)
    console.log(event.target.value.length)
    setNewFilter(event.target.value)
    if (event.target.value.length !== 0) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input
        value={filter}
        onChange={handleFilterChange}
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPhoneNumber}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {numbersToShow.map((person, i) => <li key={i}>{`${person.name} ${person.number}`}</li>)}
      </ul>
    </div>

  )

}

export default App;
