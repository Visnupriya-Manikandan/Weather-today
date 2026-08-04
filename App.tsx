import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import SearchBar from './src/components/SearchBar'
import LocationButton from './src/components/LocationButton'
import UnitToggle from './src/components/UnitToggle'
import WeatherHero from './src/components/WeatherHero'
import ForecastStrip from './src/components/ForecastStrip'
import { fetchWeather, type Place, type WeatherResponse } from './src/api/client'
import { getTheme } from './src/conditionTheme'

type PlaceSelection = {
  name: string
  country: string
  lat: number
  lon: number
}

export default function App() {
  const [place, setPlace] = useState<PlaceSelection | null>(null)
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric')
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [status, setStatus] = useState<'empty' | 'loading' | 'ready' | 'error'>('empty')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!place) return
    const { lat, lon } = place
    let cancelled = false

    async function load() {
      setStatus('loading')
      try {
        const data = await fetchWeather({ lat, lon, units })
        if (cancelled) return
        setWeather(data)
        setStatus('ready')
      } catch (err: any) {
        if (cancelled) return
        setErrorMessage(err.message ?? 'Something went wrong fetching the forecast.')
        setStatus('error')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [place, units])

  function handleSelectPlace(selected: Place) {
    setPlace({ name: selected.name, country: selected.country, lat: selected.lat, lon: selected.lon })
  }

  function handleLocate(coords: { lat: number; lon: number }) {
    setPlace({ name: 'Current location', country: '', lat: coords.lat, lon: coords.lon })
  }

  const theme =
    status === 'ready' && weather ? getTheme(weather.current.condition, weather.current.isDay) : getTheme('clear', true)

  return (
    <View style={[styles.sky, { backgroundColor: theme.top }]}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            <View style={styles.topRow}>
              <View style={{ flex: 1 }}>
                <SearchBar onSelect={handleSelectPlace} />
              </View>
              <LocationButton onLocate={handleLocate} />
            </View>

            <UnitToggle units={units} onChange={setUnits} />

            {status === 'empty' && (
              <Text style={styles.stateMessage}>Search a city or use your location to see the forecast.</Text>
            )}
            {status === 'loading' && <Text style={styles.stateMessage}>Reading the sky…</Text>}
            {status === 'error' && <Text style={[styles.stateMessage, styles.stateError]}>{errorMessage}</Text>}

            {status === 'ready' && weather && (
              <>
                <WeatherHero
                  locationName={weather.location.name}
                  locationCountry={weather.location.country}
                  current={weather.current}
                  glyph={theme.glyph}
                  units={units}
                />
                <ForecastStrip daily={weather.daily} />
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  sky: { flex: 1 },
  safe: { flex: 1 },
  scroll: { padding: 16, gap: 16, flexGrow: 1 },
  topRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  stateMessage: {
    textAlign: 'center',
    color: 'rgba(237,241,245,0.7)',
    marginTop: 40,
    fontSize: 15,
  },
  stateError: { color: '#E8935A' },
})
