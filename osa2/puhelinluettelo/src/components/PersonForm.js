import React from 'react'
import axios from 'axios'

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {

  const addPhoneNumber = (event) => {
    event.preventDefault()

    // tarkistetaan ettei lisättävä nimi ole jo puhelinluettelossa
    const i = persons.findIndex(person => person.name === newName)
    if (i !== -1) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newObject = {
        name: newName,
        number: newNumber
      }
      // upataan uusi entry serverille
      axios
        .post('http://localhost:3001/persons', newObject)
        .then(response => {
          console.log(response)
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