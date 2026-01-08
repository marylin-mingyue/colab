export function maxDrawdownPct(values: number[]) {
  if (values.length < 2) return 0
  let peak = values[0]
  let mdd = 0
  for (const v of values) {
    if (v > peak) peak = v
    const dd = (peak - v) / peak
    if (dd > mdd) mdd = dd
  }
  return mdd * 100
}


