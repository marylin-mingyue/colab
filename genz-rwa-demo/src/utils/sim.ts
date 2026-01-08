import type { SimulatorState } from '../state/types'
import { getAsset } from '../domain/assets'

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seedFromString(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function gaussian(rng: () => number) {
  // Box–Muller
  let u = 0
  let v = 0
  while (u === 0) u = rng()
  while (v === 0) v = rng()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

export function stepSimulation(sim: SimulatorState, userSeed: string): SimulatorState {
  const seed = seedFromString(`${userSeed}:${sim.history.length}`)
  const rng = mulberry32(seed)

  // Daily-ish step (demo): weighted return from asset APR + noise from volatility.
  const dt = 1 / 365
  let expectedReturn = 0
  let vol = 0

  for (const h of sim.holdings) {
    const asset = getAsset(h.assetId)
    if (!asset) continue
    const w = h.weightPct / 100
    expectedReturn += w * (asset.aprHintPct / 100)
    vol += w * (asset.volatilityHintPct / 100)
  }

  const shock = gaussian(rng) * vol * Math.sqrt(dt)
  const growth = expectedReturn * dt + shock
  const nextValue = Math.max(0, sim.currentValue * (1 + growth))

  const t = Date.now()
  const nextHistory = [...sim.history, { t, value: nextValue }].slice(-90)

  return {
    ...sim,
    currentValue: nextValue,
    history: nextHistory,
  }
}


