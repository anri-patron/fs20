import React from 'react'
import personService from '../services/persons'

const PhoneNumbers = ({ persons, filter, showAll, setPersons, setNotificationMsg }) => {
    

    // kun showAll === false filteröi puhelinluettelo
    const numbersToShow = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter))
    const handleDelete = (name) => {
        
        // varmistetaan haluaako käyttäjä poistaa henkilön
        if (window.confirm(`Delete ${name}`)) {
            const personToDelete = persons.filter(person => person.name === name).pop()
            console.log('deleting:', personToDelete)
            personService.deletePerson(personToDelete.id)
            .then(x => {
                console.log('Deleted', name)
                setNotificationMsg(`Deleted ${name}`)
                setTimeout(() => {
                    setNotificationMsg(null)
                }, 2000)
                // päivitetään sisäinen tila
                const newPersons = persons.filter(person => person.name !== name)
                console.log('asetetaan sisäinen tila', newPersons)
                setPersons(newPersons)
            })
            .catch(error => {
                alert(`Something went wrong, sorry about that`)
              })
        } else console.log("cancel")

    }
    return (
        <ul>
            {numbersToShow.map((person, i) => <li key={i}>{`${person.name} ${person.number}`}<button onClick={() => handleDelete(person.name)}>delete</button></li>)}
        </ul>
    )
}

export default PhoneNumbers