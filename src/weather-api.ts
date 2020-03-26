import axios, { AxiosError } from "axios"

export type WeatherResponse = {
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  name: string
  cod: number
}

export const getApiCall = (baseUrl: string, params: any) => {
  const apiClient = axios.create({
    baseURL: baseUrl,
    responseType: "json",
    headers: {
      "Content-Type": "application/json"
    }
  })
  return apiClient
    .get("", { params })
    .then(response => {
      return response.data
    })
    .catch(err => {
      if (err && err.response) {
        const axiosError = err as AxiosError
        console.log("ERROR", axiosError)
      }
    })
}

const getWeatherFromZip = (zipcode: string, countryCode: string) => {
  const apiKey = "ad0d33a326c6e9e2b0a8c4f9cfe9adbc"
  return getApiCall("https://api.openweathermap.org/data/2.5/weather", {
    zip: `${zipcode},${countryCode}`,
    appid: apiKey
  }).then(response => response)
}

export default getWeatherFromZip
