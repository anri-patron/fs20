import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneNumbers from './components/PhoneNumbers'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  // haetaan numerot palvelimelta
  useEffect(() => {
    personService
    .getAll()
    .then(initialNumbers => {
      setPersons(initialNumbers)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setNewFilter={setNewFilter} setShowAll={setShowAll} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <PhoneNumbers persons={persons} filter={filter} showAll={showAll} setPersons={setPersons} />
    </div>
  )
}

export default App;
