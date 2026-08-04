import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WeatherGlyph from './WeatherGlyph'
import type { CurrentWeather } from '../api/client'
import type { Glyph } from '../conditionTheme'

type Props = {
  locationName: string
  locationCountry: string
  current: CurrentWeather
  glyph: Glyph
  units: 'metric' | 'imperial'
}

export default function WeatherHero({ locationName, locationCountry, current, glyph, units }: Props) {
  const unitSymbol = units === 'imperial' ? '°F' : '°C'
  const windUnit = units === 'imperial' ? 'mph' : 'km/h'

  return (
    <View style={styles.card}>
      <Text style={styles.location}>
        {locationName}
        {locationCountry ? `, ${locationCountry}` : ''}
      </Text>

      <View style={styles.mainRow}>
        <WeatherGlyph glyph={glyph} size={56} />
        <Text style={styles.temp}>
          {Math.round(current.temp)}
          <Text style={styles.unit}>{unitSymbol}</Text>
        </Text>
      </View>

      <Text style={styles.condition}>
        {current.condition} · Feels like {Math.round(current.feelsLike)}
        {unitSymbol}
      </Text>

      <View style={styles.gauges}>
        <View style={styles.gauge}>
          <Text style={styles.gaugeLabel}>HUMIDITY</Text>
          <Text style={styles.gaugeValue}>{current.humidity}%</Text>
        </View>
        <View style={styles.gauge}>
          <Text style={styles.gaugeLabel}>WIND</Text>
          <View
            style={[
              styles.needle,
              { transform: [{ rotate: `${current.windDirection ?? 0}deg` }] },
            ]}
          />
          <Text style={styles.gaugeValue}>
            {Math.round(current.windSpeed)} {windUnit}
          </Text>
        </View>
        <View style={styles.gauge}>
          <Text style={styles.gaugeLabel}>PRESSURE</Text>
          <Text style={styles.gaugeValue}>{Math.round(current.pressure)} hPa</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  location: {
    color: 'rgba(237,241,245,0.7)',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  mainRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  temp: { fontSize: 76, fontWeight: '600', color: '#EDF1F5' },
  unit: { fontSize: 32, color: 'rgba(237,241,245,0.7)' },
  condition: {
    color: 'rgba(237,241,245,0.7)',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 24,
    textTransform: 'capitalize',
  },
  gauges: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.28)',
    paddingTop: 18,
  },
  gauge: { alignItems: 'center', flex: 1, gap: 6 },
  gaugeLabel: { color: 'rgba(237,241,245,0.7)', fontSize: 10, letterSpacing: 1 },
  gaugeValue: { color: '#EDF1F5', fontSize: 14, fontWeight: '500' },
  needle: {
    width: 2,
    height: 18,
    backgroundColor: '#E8935A',
    borderRadius: 2,
  },
})
