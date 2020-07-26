import React from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {

  const addPhoneNumber = (event) => {
    event.preventDefault()

    // tarkistetaan ettei lisättävä nimi ole jo puhelinluettelossa
    const i = persons.findIndex(person => person.name === newName)
    if (i !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log('Replace number')
        const person = persons.find(p => p.name === newName)
        console.log('person:', person)
        const newPerson = { ...person, number: newNumber }
        console.log('uusi person:', newPerson)

      // päivitetään person
        personService
      .update(newPerson.id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== newPerson.id ? p : returnedPerson))
      })
      .catch(error => {
        alert(`The number was already deleted, sorry about that`)
        setPersons(persons.filter(p => p.id !== newPerson.id))
      })
      } else console.log('cancel replacing')

    } else {
      const newObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      // upataan uusi entry serverille
      personService
      .create(newObject)
      .then(returnedPerson => {
        console.log('luotiin', returnedPerson)
        setPersons(persons.concat(newObject))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    console.log('nimi: ', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('numero: ', event.target.value)
    setNewNumber(event.target.value)
  }

  return (
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
  )
}

export default PersonForm