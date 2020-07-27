import React, { useEffect } from 'react'
import axios from 'axios'

const Weather = ({country, weather, setWeather, api_key}) => {

    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${api_key}`)
        .then(response => {
          console.log('promise fulfilled')
          console.log(response.data)
          setWeather(response.data)
          console.log("sää:", response.data.weather[0].main)
        })
      
    }, [])
  return (<p>weather in {country} is {}</p>)
}


export default Weather