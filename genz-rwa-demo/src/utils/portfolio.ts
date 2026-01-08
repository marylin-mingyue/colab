import type { Holding } from '../state/types'

export function clampPct(n: number, min: number, max: number) {
  if (Number.isNaN(n)) return min
  return Math.max(min, Math.min(max, n))
}

export function normalizeHoldings(holdings: Holding[]): Holding[] {
  const cleaned = holdings
    .map((h) => ({ ...h, weightPct: clampPct(h.weightPct, 0, 100) }))
    .filter((h) => h.weightPct > 0)

  const sum = cleaned.reduce((acc, h) => acc + h.weightPct, 0)
  if (sum <= 0) return []

  // Normalize to 100 with small rounding.
  const normalized = cleaned.map((h) => ({ ...h, weightPct: (h.weightPct / sum) * 100 }))
  const rounded = normalized.map((h) => ({ ...h, weightPct: Math.round(h.weightPct * 10) / 10 }))
  const roundedSum = rounded.reduce((acc, h) => acc + h.weightPct, 0)
  if (rounded.length && roundedSum !== 100) {
    rounded[0] = { ...rounded[0], weightPct: Math.round((rounded[0].weightPct + (100 - roundedSum)) * 10) / 10 }
  }
  return rounded
}


