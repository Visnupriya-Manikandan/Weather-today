// Same palette and mapping logic as the web frontend
// (weather-frontend/src/conditionTheme.js), adapted for React Native
// StyleSheet colors instead of CSS variables.

export type Condition = 'clear' | 'cloudy' | 'rain' | 'storm' | 'snow' | 'fog'
export type Glyph = 'sun' | 'moon' | 'cloud' | 'rain' | 'storm' | 'snow' | 'fog'

type ThemeColors = {
  top: string
  bottom: string
  glyph: Glyph
}

const THEMES: Record<Condition, { day: ThemeColors; night: ThemeColors }> = {
  clear: {
    day: { top: '#4A90C4', bottom: '#EDF1F5', glyph: 'sun' },
    night: { top: '#0F1626', bottom: '#3A3F63', glyph: 'moon' },
  },
  cloudy: {
    day: { top: '#7C8B99', bottom: '#C9D2D8', glyph: 'cloud' },
    night: { top: '#232B45', bottom: '#5A6376', glyph: 'cloud' },
  },
  rain: {
    day: { top: '#4B5B6B', bottom: '#8494A1', glyph: 'rain' },
    night: { top: '#161D2C', bottom: '#37455C', glyph: 'rain' },
  },
  storm: {
    day: { top: '#2E3646', bottom: '#5E6E7F', glyph: 'storm' },
    night: { top: '#10141E', bottom: '#2E3849', glyph: 'storm' },
  },
  snow: {
    day: { top: '#8FA6BC', bottom: '#EDF1F5', glyph: 'snow' },
    night: { top: '#232B45', bottom: '#647089', glyph: 'snow' },
  },
  fog: {
    day: { top: '#9AA3A8', bottom: '#D6DADD', glyph: 'fog' },
    night: { top: '#2A2F38', bottom: '#565F6D', glyph: 'fog' },
  },
}

export function getTheme(condition: Condition, isDay: boolean): ThemeColors {
  const bucket = THEMES[condition] ?? THEMES.cloudy
  return isDay ? bucket.day : bucket.night
}
