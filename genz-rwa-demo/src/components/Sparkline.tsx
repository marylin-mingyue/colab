export function Sparkline({ values, width = 240, height = 70 }: { values: number[]; width?: number; height?: number }) {
  if (!values.length) return <div style={{ height }} />
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1

  const pts = values
    .map((v, i) => {
      const x = (i / Math.max(1, values.length - 1)) * width
      const y = height - ((v - min) / span) * height
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

  const up = values[values.length - 1] >= values[0]
  const stroke = up ? 'rgba(52,211,153,0.95)' : 'rgba(251,113,133,0.95)'

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline fill="none" stroke={stroke} strokeWidth="2.5" points={pts} />
      <polyline fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" points={`0,${height} ${width},${height}`} />
    </svg>
  )
}


