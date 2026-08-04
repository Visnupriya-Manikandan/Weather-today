import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import WeatherGlyph from './WeatherGlyph'
import { getTheme } from '../conditionTheme'
import type { DailyForecast } from '../api/client'

type Props = {
  daily: DailyForecast[]
}

export default function ForecastStrip({ daily }: Props) {
  return (
    <View style={styles.card}>
      <FlatList
        horizontal
        data={daily}
        keyExtractor={(item) => item.date}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const theme = getTheme(item.condition, true)
          const dayLabel = new Date(item.date).toLocaleDateString(undefined, { weekday: 'short' })
          return (
            <View style={styles.day}>
              <Text style={styles.dayLabel}>{dayLabel}</Text>
              <WeatherGlyph glyph={theme.glyph} size={26} />
              <View style={styles.temps}>
                <Text style={styles.tempMax}>{Math.round(item.tempMax)}°</Text>
                <Text style={styles.tempMin}>{Math.round(item.tempMin)}°</Text>
              </View>
              {item.precipitationChance !== null && (
                <Text style={styles.precip}>{item.precipitationChance}%</Text>
              )}
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  day: { alignItems: 'center', width: 72, gap: 6 },
  dayLabel: {
    color: 'rgba(237,241,245,0.7)',
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  temps: { flexDirection: 'row', gap: 6 },
  tempMax: { color: '#EDF1F5', fontSize: 13, fontWeight: '600' },
  tempMin: { color: 'rgba(237,241,245,0.7)', fontSize: 13 },
  precip: { color: '#4A90C4', fontSize: 11 },
})
