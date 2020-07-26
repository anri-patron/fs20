import React from 'react'
import personService from '../services/persons'

const PhoneNumbers = ({ persons, filter, showAll, setPersons }) => {

    // kun showAll === false filteröi puhelinluettelo
    const numbersToShow = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter))
    const handleDelete = (name, id) => {
        // varmistetaan haluaako käyttäjä poistaa henkilön
        if (window.confirm(`Delete ${name}`)) {
            console.log("delete", name, "id", id)
            personService.deletePerson(id)
            .then(x => {
                console.log('Deleted', name)
                // päivitetään sisäinen tila
                const newPersons = persons.filter(person => person.name !== name)
                console.log('asetetaan sisäinen tila', newPersons)
                setPersons(newPersons)
            })
        } else console.log("cancel")

    }
    return (
        <ul>
            {numbersToShow.map((person, i) => <li key={i}>{`${person.name} ${person.number}`}<button onClick={() => handleDelete(person.name, i+1)}>delete</button></li>)}
        </ul>
    )
}

export default PhoneNumbers