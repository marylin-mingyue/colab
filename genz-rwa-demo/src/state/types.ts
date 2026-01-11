export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export type BadgeLevel = 'INSURANCE' | 'INVESTING' | 'ESG'

export type WalletLoginMethod = 'IAM_SMART' | 'FACE_ID'

export type TokenizedAsset = {
  id: string
  name: string
  symbol: string
  theme: 'HK_GOV' | 'ESG' | 'HK_BLUECHIP' | 'AI_INFRA'
  risk: RiskLevel
  aprHintPct: number
  volatilityHintPct: number
}

export type Holding = {
  assetId: string
  weightPct: number
}

export type PortfolioSnapshot = {
  t: number // epoch ms
  value: number
}

export type User = {
  id: string
  displayName: string
  loginMethod: WalletLoginMethod
  walletAddress: string
  createdAt: number
}

export type Badge = {
  level: BadgeLevel
  earnedAt: number
  tokenId: string // NFT token id (mock)
}

export type SimulatorState = {
  startingValue: number
  currentValue: number
  holdings: Holding[]
  history: PortfolioSnapshot[]
  bestPnLPct: number
}

export type VoucherState = {
  ehkdVoucherBalance: number
  lastAwardedAt: number | null
}

export type InvestState = {
  positions: Holding[]
  investedTotal: number
  lastInvestedAt: number | null
}

export type AppState = {
  user: User | null
  badges: Badge[]
  simulator: SimulatorState
  voucher: VoucherState
  invest: InvestState
}


