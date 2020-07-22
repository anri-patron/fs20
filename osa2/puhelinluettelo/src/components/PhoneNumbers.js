import React from 'react'

const PhoneNumbers = ({persons, filter, showAll}) => {

    // kun showAll === false filteröi puhelinluettelo
    const numbersToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter)) 

    return (
    <ul>
        {numbersToShow.map((person, i) => <li key={i}>{`${person.name} ${person.number}`}</li>)}
    </ul>
    )
}

export default PhoneNumbers