import { useState, useEffect } from 'react'

import WeatherSerice from '../Services/WeatherSerice'

const Weather = ({city}) => {
  const [weather, setWeather] = useState(null)

  const loadWeather = () => {
    WeatherSerice.get(city).then(
      w => setWeather(w)
    ).catch(error => {console.log(error.message)})
  }
  useEffect(loadWeather, [])

  return (
    weather ?
    <div>
      <h2>Weather in {city}</h2>
      <span>{weather['description']} </span> <br/>
      <span>Temperature: {weather['temp']} C</span> <br/>
      <span>Wind: {weather['wind']}</span> <br/>
      <img src={weather['icon']}/>
    </div>
    :
    null
  )
}

export default Weather