import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPhoneNumber = (event) => {
    event.preventDefault()
    console.log('addPhoneNro')

    const i = persons.findIndex(person => person.name === newName)
    if (i !== -1) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newObject = {
        name: newName
      }
      setPersons(persons.concat(newObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => <li key={i}>{person.name}</li>)}
      </ul>
    </div>
  )

}

export default App;
