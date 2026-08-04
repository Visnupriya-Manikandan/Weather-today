import React, { useState } from 'react'
import { Pressable, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

type Props = {
  onLocate: (coords: { lat: number; lon: number }) => void
}

export default function LocationButton({ onLocate }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'denied' | 'error'>('idle')

  async function requestPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') return true
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission',
        message: 'Skyline needs your location to show local weather.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
    )
    return granted === PermissionsAndroid.RESULTS.GRANTED
  }

  async function handlePress() {
    setStatus('loading')
    const allowed = await requestPermission()
    if (!allowed) {
      setStatus('denied')
      return
    }
    Geolocation.getCurrentPosition(
      (position) => {
        setStatus('idle')
        onLocate({ lat: position.coords.latitude, lon: position.coords.longitude })
      },
      () => setStatus('error'),
      { enableHighAccuracy: false, timeout: 10000 },
    )
  }

  const label =
    status === 'loading'
      ? 'Locating…'
      : status === 'denied'
      ? 'Permission denied'
      : status === 'error'
      ? 'Location failed'
      : 'Use my location'

  return (
    <Pressable style={styles.button} onPress={handlePress} disabled={status === 'loading'}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    borderRadius: 18,
  },
  label: { color: '#EDF1F5', fontSize: 13, fontWeight: '500' },
})
