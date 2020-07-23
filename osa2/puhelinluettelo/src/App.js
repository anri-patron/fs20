import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneNumbers from './components/PhoneNumbers'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  // haetaan numeroita palvelimelta
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setNewFilter={setNewFilter} setShowAll={setShowAll}/>
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <PhoneNumbers persons={persons} filter={filter} showAll={showAll}/>
    </div>
  )
}

export default App;
