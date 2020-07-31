import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneNumbers from './components/PhoneNumbers'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

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
      <Notification message={notificationMsg}/>
      <Error message={errorMsg}/>
      <h2>Phonebook</h2>
      <Filter filter={filter} setNewFilter={setNewFilter} setShowAll={setShowAll} />
      <h2>Add a new</h2>
      <PersonForm
      persons={persons}
      setPersons={setPersons}
      newName={newName}
      setNewName={setNewName}
      newNumber={newNumber}
      setNewNumber={setNewNumber}
      setNotificationMsg={setNotificationMsg}
      setErrorMsg={setErrorMsg}
      />
      <h2>Numbers</h2>
      <PhoneNumbers persons={persons} filter={filter} showAll={showAll} setPersons={setPersons} setNotificationMsg={setNotificationMsg}/>
    </div>
  )
}

export default App;
