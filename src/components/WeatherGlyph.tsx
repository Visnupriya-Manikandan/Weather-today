import React from 'react'
import Svg, { Circle, Line, Path, Polyline } from 'react-native-svg'
import type { Glyph } from '../conditionTheme'

type Props = {
  glyph: Glyph
  size?: number
  color?: string
}

export default function WeatherGlyph({ glyph, size = 48, color = '#EDF1F5' }: Props) {
  const common = { stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {glyph === 'sun' && (
        <>
          <Circle cx={24} cy={24} r={9} {...common} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <Line
              key={deg}
              x1={24}
              y1={6}
              x2={24}
              y2={12}
              transform={`rotate(${deg} 24 24)`}
              {...common}
            />
          ))}
        </>
      )}
      {glyph === 'moon' && <Path d="M30 10a14 14 0 1 0 8 22 11 11 0 0 1-8-22z" {...common} />}
      {glyph === 'cloud' && (
        <Path d="M14 32a8 8 0 0 1 1-16 10 10 0 0 1 19-3 8 8 0 0 1-2 19H14z" {...common} />
      )}
      {glyph === 'rain' && (
        <>
          <Path d="M14 26a8 8 0 0 1 1-16 10 10 0 0 1 19-3 8 8 0 0 1-2 19H14z" {...common} />
          <Line x1={17} y1={34} x2={15} y2={40} {...common} />
          <Line x1={24} y1={34} x2={22} y2={40} {...common} />
          <Line x1={31} y1={34} x2={29} y2={40} {...common} />
        </>
      )}
      {glyph === 'storm' && (
        <>
          <Path d="M14 24a8 8 0 0 1 1-16 10 10 0 0 1 19-3 8 8 0 0 1-2 19H14z" {...common} />
          <Polyline points="25,30 20,38 26,38 21,46" {...common} />
        </>
      )}
      {glyph === 'snow' && (
        <>
          <Path d="M14 24a8 8 0 0 1 1-16 10 10 0 0 1 19-3 8 8 0 0 1-2 19H14z" {...common} />
          <Line x1={18} y1={34} x2={18} y2={42} {...common} />
          <Line x1={24} y1={34} x2={24} y2={42} {...common} />
          <Line x1={30} y1={34} x2={30} y2={42} {...common} />
          <Line x1={15} y1={38} x2={33} y2={38} {...common} />
        </>
      )}
      {glyph === 'fog' && (
        <>
          <Line x1={10} y1={20} x2={38} y2={20} {...common} />
          <Line x1={14} y1={26} x2={34} y2={26} {...common} />
          <Line x1={10} y1={32} x2={38} y2={32} {...common} />
        </>
      )}
    </Svg>
  )
}
