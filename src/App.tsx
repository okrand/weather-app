import React, { useState, useEffect } from "react"
import logo from "./logo.svg"
import getLocation, { LocationResult } from "./location-api"
import "./App.css"
import getWeatherFromZip, { WeatherResponse } from "./weather-api"

type LocationProps = {
  userCity: string
}

const Location = (userLocation: LocationProps) => {
  const { userCity } = userLocation
  return <p id="location">{userCity}</p>
}

const Weather = () => {
  const [userCity, setLocation] = useState("Locating!")
  const [weather, setWeather] = useState<WeatherResponse | undefined>(undefined)
  const [weatherIconLink, setWeatherIconLink] = useState("")
  useEffect(() => {
    getLocation
      .then((result: LocationResult) => {
        const city = `${result.city}, ${result.state_code}`
        setLocation(city)
        return result
      })
      .then(result => getWeatherFromZip(result.postcode, result.country_code))
      .then((newWeather: any) => {
        console.log("NEW WEATHER", newWeather)
        setWeather(newWeather)
        setWeatherIconLink(
          `http://openweathermap.org/img/wn/${newWeather.weather[0].icon}@2x.png`
        )
      })
  }, [])
  return (
    <div>
      <img src={weatherIconLink} alt="weather-icon" />
      <p id="weather">{weather?.weather[0].main || "Weathering!"}</p>
      <Location userCity={userCity} />
    </div>
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
