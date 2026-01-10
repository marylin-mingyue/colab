import { Navigate } from 'react-router-dom'
import { useAppState } from '../state/AppState'

export function HomeRedirect() {
  const { computed } = useAppState()
  return <Navigate to={computed.isLoggedIn ? '/dashboard' : '/login'} replace />
}

