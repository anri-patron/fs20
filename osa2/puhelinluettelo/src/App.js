import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-2123211'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  const handleNameChange = (event) => {
    console.log('nimi: ', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('numero: ', event.target.value)
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((person, i) => <li key={i}>{`${person.name} ${person.number}`}</li>)}
      </ul>
    </div>
  )

}

export default App;
