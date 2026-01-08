import type { AppState } from './types'

export const DEFAULT_STATE: AppState = {
  user: null,
  badges: [],
  simulator: {
    startingValue: 10000,
    currentValue: 10000,
    holdings: [
      { assetId: 'hk_digital_green_bond', weightPct: 60 },
      { assetId: 'esg_green_energy_basket', weightPct: 40 },
    ],
    history: [{ t: Date.now(), value: 10000 }],
    bestPnLPct: 0,
  },
  voucher: {
    ehkdVoucherBalance: 0,
    lastAwardedAt: null,
  },
  invest: {
    positions: [{ assetId: 'hk_digital_green_bond', weightPct: 100 }],
    investedTotal: 0,
    lastInvestedAt: null,
  },
}


