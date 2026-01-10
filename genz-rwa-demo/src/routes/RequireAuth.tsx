import { Navigate, useLocation } from 'react-router-dom'
import { useAppState } from '../state/AppState'
import type { ReactNode } from 'react'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { computed } = useAppState()
  const loc = useLocation()

  if (!computed.isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />
  }

  return children
}

