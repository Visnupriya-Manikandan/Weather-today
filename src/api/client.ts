import { API_BASE_URL } from './config'

export type Place = {
  id: string
  name: string
  country: string
  admin1?: string
  lat: number
  lon: number
}

export type CurrentWeather = {
  temp: number
  feelsLike: number
  condition: 'clear' | 'cloudy' | 'rain' | 'storm' | 'snow' | 'fog'
  isDay: boolean
  humidity: number
  windSpeed: number
  windDirection: number
  pressure: number
}

export type DailyForecast = {
  date: string
  tempMax: number
  tempMin: number
  condition: CurrentWeather['condition']
  precipitationChance: number | null
}

export type WeatherResponse = {
  location: { name: string; country: string }
  current: CurrentWeather
  daily: DailyForecast[]
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`)
  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch {
      /* ignore parse errors, use default message */
    }
    throw new Error(message)
  }
  return res.json()
}

export function searchLocations(query: string): Promise<Place[]> {
  return request(`/geocode?query=${encodeURIComponent(query)}`)
}

export function fetchWeather(params: {
  lat: number
  lon: number
  units: 'metric' | 'imperial'
}): Promise<WeatherResponse> {
  return request(`/weather?lat=${params.lat}&lon=${params.lon}&units=${params.units}`)
}
