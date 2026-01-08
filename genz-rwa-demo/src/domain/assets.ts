import type { TokenizedAsset } from '../state/types'

export const ASSETS: TokenizedAsset[] = [
  {
    id: 'hk_digital_green_bond',
    name: 'HK Government Digital Green Bond (Tokenized)',
    symbol: 'HKG-GB',
    theme: 'HK_GOV',
    risk: 'LOW',
    aprHintPct: 2.5,
    volatilityHintPct: 2.0,
  },
  {
    id: 'esg_green_energy_basket',
    name: 'ESG Green Energy Basket (Tokenized)',
    symbol: 'ESG-GREEN',
    theme: 'ESG',
    risk: 'MEDIUM',
    aprHintPct: 7.0,
    volatilityHintPct: 12.0,
  },
  {
    id: 'hk_bluechip_basket',
    name: 'Hong Kong Blue-Chip Basket (Tokenized)',
    symbol: 'HK-BC',
    theme: 'HK_BLUECHIP',
    risk: 'MEDIUM',
    aprHintPct: 6.0,
    volatilityHintPct: 10.0,
  },
  {
    id: 'ai_infra_basket',
    name: 'AI Infrastructure Basket (Tokenized)',
    symbol: 'AI-INFRA',
    theme: 'AI_INFRA',
    risk: 'HIGH',
    aprHintPct: 12.0,
    volatilityHintPct: 25.0,
  },
]

export function getAsset(assetId: string) {
  return ASSETS.find((a) => a.id === assetId) ?? null
}


