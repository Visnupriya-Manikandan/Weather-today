import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'

type Props = {
  units: 'metric' | 'imperial'
  onChange: (units: 'metric' | 'imperial') => void
}

export default function UnitToggle({ units, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      <Pressable style={[styles.btn, units === 'metric' && styles.active]} onPress={() => onChange('metric')}>
        <Text style={[styles.label, units === 'metric' && styles.activeLabel]}>°C</Text>
      </Pressable>
      <Pressable style={[styles.btn, units === 'imperial' && styles.active]} onPress={() => onChange('imperial')}>
        <Text style={[styles.label, units === 'imperial' && styles.activeLabel]}>°F</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  btn: { paddingHorizontal: 18, paddingVertical: 8 },
  active: { backgroundColor: '#EDF1F5' },
  label: { color: 'rgba(237,241,245,0.7)', fontSize: 14 },
  activeLabel: { color: '#1B2430', fontWeight: '600' },
})
