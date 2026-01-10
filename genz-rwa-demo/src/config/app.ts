export type AppMode = 'demo' | 'product'

function parseBool(v: string | undefined, fallback: boolean) {
  if (v == null) return fallback
  const s = v.trim().toLowerCase()
  if (s === '1' || s === 'true' || s === 'yes' || s === 'on') return true
  if (s === '0' || s === 'false' || s === 'no' || s === 'off') return false
  return fallback
}

const rawMode = (import.meta.env.VITE_APP_MODE as string | undefined) ?? 'product'
export const APP_MODE: AppMode = rawMode === 'demo' ? 'demo' : 'product'
export const IS_DEMO = APP_MODE === 'demo'

export const APP_NAME = (import.meta.env.VITE_APP_NAME as string | undefined) ?? 'DART Learn'
export const APP_TAGLINE =
  (import.meta.env.VITE_APP_TAGLINE as string | undefined) ?? (IS_DEMO ? 'GenZ RWA + ESG demo' : 'Learning + simulation, built for real users')

export const STORAGE_KEY =
  (import.meta.env.VITE_STORAGE_KEY as string | undefined) ?? (IS_DEMO ? 'genz-rwa-demo:v1' : 'dart-learn:v1')

export const ENABLE_AI_COACH = parseBool(import.meta.env.VITE_ENABLE_AI_COACH as string | undefined, true)

export type ThemeName = 'neon' | 'ideathon'
const rawTheme = (import.meta.env.VITE_THEME as string | undefined) ?? 'ideathon'
export const THEME: ThemeName = rawTheme === 'neon' ? 'neon' : 'ideathon'

