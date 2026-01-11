import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { DEFAULT_STATE } from './defaultState'
import { loadFromStorage, saveToStorage } from './storage'
import type { AppState, BadgeLevel, Holding, User, WalletLoginMethod } from './types'
import { pseudoWalletAddress, randomId } from './ids'
import { clampPct, normalizeHoldings } from '../utils/portfolio'
import { stepSimulation } from '../utils/sim'

type Action =
  | { type: 'LOGIN'; displayName: string; method: WalletLoginMethod }
  | { type: 'LOGOUT' }
  | { type: 'RESET_DEMO' }
  | { type: 'EARN_BADGE'; level: BadgeLevel }
  | { type: 'SET_HOLDINGS'; holdings: Holding[] }
  | { type: 'SIM_STEP'; steps?: number }
  | { type: 'SIM_RESET' }
  | { type: 'AWARD_VOUCHER'; amount: number }
  | { type: 'SPEND_VOUCHER'; amount: number }
  | { type: 'SET_INVEST_POSITIONS'; positions: Holding[] }
  | { type: 'INVEST_WITH_VOUCHER'; amount: number }

function ensureUser(state: AppState): User {
  if (!state.user) {
    // For convenience, allow anonymous user.
    const id = randomId('user')
    return {
      id,
      displayName: 'Guest',
      loginMethod: 'FACE_ID',
      walletAddress: pseudoWalletAddress(id),
      createdAt: Date.now(),
    }
  }
  return state.user
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN': {
      const id = randomId('user')
      const user: User = {
        id,
        displayName: action.displayName.trim() || 'Student',
        loginMethod: action.method,
        walletAddress: pseudoWalletAddress(`${id}:${action.method}:${action.displayName}`),
        createdAt: Date.now(),
      }
      return { ...DEFAULT_STATE, user }
    }
    case 'LOGOUT':
      return { ...DEFAULT_STATE }
    case 'RESET_DEMO': {
      const user = state.user
      return { ...DEFAULT_STATE, user }
    }
    case 'EARN_BADGE': {
      if (state.badges.some((b) => b.level === action.level)) return state
      const tokenId = randomId(`nft_${action.level.toLowerCase()}`)
      return {
        ...state,
        badges: [...state.badges, { level: action.level, earnedAt: Date.now(), tokenId }],
      }
    }
    case 'SET_HOLDINGS': {
      const normalized = normalizeHoldings(action.holdings)
      return {
        ...state,
        simulator: { ...state.simulator, holdings: normalized },
      }
    }
    case 'SIM_RESET': {
      return {
        ...state,
        simulator: {
          ...state.simulator,
          currentValue: state.simulator.startingValue,
          history: [{ t: Date.now(), value: state.simulator.startingValue }],
          bestPnLPct: 0,
        },
      }
    }
    case 'SIM_STEP': {
      const user = ensureUser(state)
      const steps = Math.max(1, action.steps ?? 1)
      let sim = state.simulator
      for (let i = 0; i < steps; i++) {
        sim = stepSimulation(sim, user.id)
      }
      const pnlPct = ((sim.currentValue - sim.startingValue) / sim.startingValue) * 100
      return {
        ...state,
        simulator: {
          ...sim,
          bestPnLPct: Math.max(sim.bestPnLPct, pnlPct),
        },
      }
    }
    case 'AWARD_VOUCHER': {
      const amt = Math.max(0, action.amount)
      return {
        ...state,
        voucher: {
          ehkdVoucherBalance: state.voucher.ehkdVoucherBalance + amt,
          lastAwardedAt: Date.now(),
        },
      }
    }
    case 'SPEND_VOUCHER': {
      const amt = clampPct(action.amount, 0, state.voucher.ehkdVoucherBalance)
      return {
        ...state,
        voucher: {
          ...state.voucher,
          ehkdVoucherBalance: state.voucher.ehkdVoucherBalance - amt,
        },
      }
    }
    case 'SET_INVEST_POSITIONS': {
      const positions = normalizeHoldings(action.positions)
      return {
        ...state,
        invest: {
          ...state.invest,
          positions,
        },
      }
    }
    case 'INVEST_WITH_VOUCHER': {
      const amt = clampPct(action.amount, 0, state.voucher.ehkdVoucherBalance)
      if (amt <= 0) return state
      return {
        ...state,
        voucher: {
          ...state.voucher,
          ehkdVoucherBalance: state.voucher.ehkdVoucherBalance - amt,
        },
        invest: {
          ...state.invest,
          investedTotal: state.invest.investedTotal + amt,
          lastInvestedAt: Date.now(),
        },
      }
    }
    default:
      return state
  }
}

type AppStateContextValue = {
  state: AppState
  dispatch: React.Dispatch<Action>
  computed: {
    isLoggedIn: boolean
    hasBadge: (level: BadgeLevel) => boolean
    badgesCount: number
    simPnLPct: number
    eligibleForSimulator: boolean
    eligibleForRealInvest: boolean
  }
}

const AppStateContext = createContext<AppStateContextValue | null>(null)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const initial = useMemo(() => loadFromStorage<AppState>() ?? DEFAULT_STATE, [])
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    saveToStorage(state)
  }, [state])

  const computed = useMemo<AppStateContextValue['computed']>(() => {
    const badgesCount = state.badges.length
    const simPnLPct = ((state.simulator.currentValue - state.simulator.startingValue) / state.simulator.startingValue) * 100
    const hasBadge = (level: BadgeLevel) => state.badges.some((b) => b.level === level)
    const eligibleForSimulator = badgesCount >= 1
    const eligibleForRealInvest = badgesCount >= 3 && simPnLPct > 0
    return {
      isLoggedIn: !!state.user,
      hasBadge,
      badgesCount,
      simPnLPct,
      eligibleForSimulator,
      eligibleForRealInvest,
    }
  }, [state.badges, state.simulator.currentValue, state.simulator.startingValue, state.user])

  const value = useMemo(() => ({ state, dispatch, computed }), [state, computed])
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}


