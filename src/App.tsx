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
  useEffect(() => {
    getLocation
      .then((result: LocationResult) => {
        console.log("GET LOCATION")
        const city = `${result.city}, ${result.state_code}`
        setLocation(city)
        return result
      })
      .then(result => {
        // getWeatherFromZip(result.postcode, result.country_code)
      })
      .then((newWeather: any) => {
        console.log("NEW WEATHER", newWeather)
        setWeather(newWeather)
      })
  }, [])
  return (
    <div>
      <p id="weather">{weather?.weather[0].main || "Weathering!"}</p>
      <Location userCity={userCity} />
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Weather />
      </header>
    </div>
  )
}

export default App
