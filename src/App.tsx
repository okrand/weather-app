import React, { useState, useEffect } from "react"
import getLocation, { LocationResult } from "./location-api"
import "./App.css"
import getWeatherFromZip, { WeatherResponse } from "./weather-api"

type LocationProps = {
  userCity: string
}

export const kToF = (kelvin: number) => ((kelvin - 273.15) * 1.8 + 32).toFixed()

const Location = (userLocation: LocationProps) => {
  const { userCity } = userLocation
  return <p id="location">{userCity}</p>
}

const Weather = () => {
  const [userCity, setLocation] = useState("")
  const [weather, setWeather] = useState<string | undefined>(undefined)
  const [weatherIconLink, setWeatherIconLink] = useState("")
  useEffect(() => {
    getLocation
      .then((result: LocationResult) => {
        const city = `${result.city}, ${result.state_code}`
        setLocation(city)
        return result
      })
      .then(result => getWeatherFromZip(result.postcode, result.country_code))
      .then((newWeather: WeatherResponse) => {
        newWeather && setWeather(kToF(newWeather.main.temp))
        setWeatherIconLink(
          `http://openweathermap.org/img/wn/${newWeather.weather[0].icon}@2x.png`
        )
      })
  }, [])
  return weather ? (
    <div>
      <img src={weatherIconLink} alt="weather-icon" />
      <p id="weather">{weather && `${weather}°F`}</p>
      <Location userCity={userCity} />
    </div>
  ) : (
    <p>Loading!</p>
  )
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Weather />
      </header>
    </div>
  )
}

export default App
