import React, { useEffect, useRef, useState } from 'react'
import { View, TextInput, FlatList, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { searchLocations, type Place } from '../api/client'

type Props = {
  onSelect: (place: Place) => void
}

export default function SearchBar({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Place[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    setError(null)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const matches = await searchLocations(query.trim())
        setResults(matches)
      } catch (err: any) {
        setError(err.message ?? 'Search failed')
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  function handlePick(place: Place) {
    onSelect(place)
    setQuery(`${place.name}${place.country ? ', ' + place.country : ''}`)
    setResults([])
  }

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search a city…"
        placeholderTextColor="rgba(237,241,245,0.6)"
        autoCorrect={false}
      />
      {loading && <ActivityIndicator style={styles.spinner} color="#EDF1F5" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {results.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable style={styles.row} onPress={() => handlePick(item)}>
                <Text style={styles.rowTitle}>{item.name}</Text>
                <Text style={styles.rowMeta}>{[item.admin1, item.country].filter(Boolean).join(', ')}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  input: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: '#EDF1F5',
  },
  spinner: { position: 'absolute', right: 14, top: 14 },
  error: { color: '#E8935A', marginTop: 6, fontSize: 13 },
  dropdown: {
    marginTop: 8,
    backgroundColor: '#232B45',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    maxHeight: 220,
    overflow: 'hidden',
  },
  row: { paddingVertical: 12, paddingHorizontal: 14 },
  rowTitle: { color: '#EDF1F5', fontWeight: '600', fontSize: 15 },
  rowMeta: { color: 'rgba(237,241,245,0.7)', fontSize: 12, marginTop: 2 },
})
