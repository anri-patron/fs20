import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weater from './components/Weather'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')
  const [hideAll, setHideAll] = useState(true)
  const [weather, setWeather] = useState([])
  
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = hideAll
    ? []
    : countries.filter(country => country.name.toLowerCase().includes(filter)) 

  const handleFilterChange = (event) => {
    console.log('filter: ', event.target.value)
    console.log(event.target.value.length)

    setNewFilter(event.target.value)

    if (event.target.value.length !== 0) {
      setHideAll(false)
    } else {
      setHideAll(true)
    }
  }

  const handleShowCountry = (a) => {

    console.log(a)
    setNewFilter(a.toLowerCase())
  }

  /*
  *
  *
  * Tee oma componentti ja hae siellä kaupungin sää.
  * 
  * 
  * 
  * 
  *
  const Weater = ({country}) => {
      useEffect(() => {
        if (weather.length === 0) {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${api_key}`)
          .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
            setWeather(response.data)
            console.log("sää:", response.data.weather[0].main)
          })
        }
      }, [])
    return (<p>weather in {country} is {}</p>)
  }*/

  const Countries = () => {
    const c = countries.filter(country => country.name.toLowerCase().includes(filter)) 

    if (c.length > 10) {
      if (hideAll) {return(<div>specify a filter to see country information</div>)}
      return (<div>Too many matches, specify another filter</div>
      )
    } else if (c.length === 1) {
      console.log(c)
      return (
        <div>
          <h2>{c[0].name}</h2>
          <p>{`Capita: ${c[0].capital}`}</p>
          <p>{`Population: ${c[0].population}`}</p>
          <h3>Languages</h3>
          <ul>
            {c[0].languages.map((country, i) => <li key={i}>{country.name}</li>)}
          </ul>
          <img src={c[0].flag} alt="country flag" width="10%" height="10%"></img>
          <Weater country={c[0].name} weather={weather} setWeather={setWeather} api_key={api_key}/>
        </div>
      )
    } else {
      return (
        <div>
          <ul>
            {countriesToShow.map((country, i) => <div key={i}>{country.name}
            <button onClick={() => handleShowCountry(country.name)}>show</button>
            </div>
            )}
          </ul>
        </div>
      )
      }
  }
  return (
    <div>
    <div>
        filter shown with: <input
        value={filter}
        onChange={handleFilterChange}
        />
    </div>
    <Countries/>
    </div>
  )
}

export default App;
