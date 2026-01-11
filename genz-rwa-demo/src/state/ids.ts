export function randomId(prefix: string) {
  const bytes = new Uint8Array(8)
  crypto.getRandomValues(bytes)
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return `${prefix}_${hex}`
}

export function pseudoWalletAddress(seed: string) {
  // Deterministic-ish address from a seed string (not real crypto).
  let x = 2166136261
  for (let i = 0; i < seed.length; i++) {
    x ^= seed.charCodeAt(i)
    x = Math.imul(x, 16777619)
  }
  const bytes = new Uint8Array(20)
  for (let i = 0; i < bytes.length; i++) {
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    bytes[i] = x & 0xff
  }
  return `0x${Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')}`
}


