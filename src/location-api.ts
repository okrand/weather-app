import { getApiCall } from "./weather-api"

type GeoPosition = {
  coords: {
    latitude: number
    longitude: number
  }
}

type Position = {
  lat: number
  lon: number
}

export type LocationResult = {
  city: string
  country_code: string
  postcode: string
  road: string
  state: string
  state_code: string
}

const getLatLon = new Promise<Position>((resolve, reject) => {
  const success = (position: GeoPosition) => {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    resolve({ lat, lon })
  }

  const error = () => {
    console.error("Couldn't Retrieve Location")
  }

  if (!navigator.geolocation) {
    reject(error())
  } else {
    navigator.geolocation.getCurrentPosition(success, error)
  }
})

const getLocationFromCoordinates = (lat: number, lon: number) =>
  getApiCall("https://api.opencagedata.com/geocode/v1/json?no_annotations=1", {
    q: `${lat},${lon}`,
    key: "0264db5477fe4b1c9ee9ae23b3ec59e5"
  }).then(response => response.results[0].components)

const getUsableLocation = new Promise<LocationResult>(resolve =>
  getLatLon
    .then((result: Position) => {
      resolve(getLocationFromCoordinates(result.lat, result.lon))
    })
    .catch(() => console.error("Couldn't Get Your Location, Check Coordinates"))
)

export default getUsableLocation
