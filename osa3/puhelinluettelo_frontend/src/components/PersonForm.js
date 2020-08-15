import React from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setNotificationMsg, setErrorMsg}) => {

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
        personService
      .update(newPerson.id, newPerson)
      .then(returnedPerson => {
        setNotificationMsg(`Updated ${newName}`)
        setTimeout(() => {
          setNotificationMsg(null)
        }, 2000)
        setPersons(persons.map(p => p.id !== newPerson.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMsg(`${newName} has already been deleted from server.`)
        setTimeout(() => {
          setErrorMsg(null)
        }, 4000)
        setPersons(persons.filter(p => p.id !== newPerson.id))
      })
      } else console.log('cancel replacing')

    } else {
      const newObject = {
        name: newName,
        number: newNumber,
        //id: persons.length + 1,
      }
      // upataan uusi entry serverille
      personService
      .create(newObject)
      .then(returnedPerson => {
        console.log('luotiin', returnedPerson)
        setNotificationMsg(`Added ${newObject.name}`)
        setTimeout(() => {
          setNotificationMsg(null)
        }, 2000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMsg(error.response.data.error)
        setTimeout(() => {
          setErrorMsg(null)
        }, 6000)
        console.log(error.response.data)
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