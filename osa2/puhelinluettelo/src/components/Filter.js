import React from 'react'

const Filter = ({filter, setNewFilter, setShowAll}) => {

    // jos filter palkkii on kirjoitettu niin asetetaan showAll = false
    // jos palkki tyhjenee niin asetetaan showAll = true
    const handleFilterChange = (event) => {
        console.log('filter: ', event.target.value)
        console.log(event.target.value.length)
        setNewFilter(event.target.value)
        if (event.target.value.length !== 0) {
          setShowAll(false)
        } else {
          setShowAll(true)
        }
      }

return (
    <div>
        filter shown with: <input
        value={filter}
        onChange={handleFilterChange}
        />
    </div>
  )
}

export default Filter