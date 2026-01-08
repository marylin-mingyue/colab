import { NavLink, useNavigate } from 'react-router-dom'
import { useAppState } from '../state/AppState'
import { Button } from './Button'

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        padding: '8px 10px',
        borderRadius: 12,
        border: `1px solid ${isActive ? 'rgba(110,231,255,0.35)' : 'transparent'}`,
        background: isActive ? 'rgba(110,231,255,0.10)' : 'transparent',
        textDecoration: 'none',
        color: 'var(--text)',
        fontSize: 13,
        fontWeight: 650,
      })}
    >
      {label}
    </NavLink>
  )
}

export function TopNav() {
  const { state, dispatch, computed } = useAppState()
  const nav = useNavigate()

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        borderBottom: '1px solid var(--border)',
        background: 'rgba(11, 16, 32, 0.65)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(110,231,255,0.55), rgba(167,139,250,0.45))',
                  border: '1px solid rgba(255,255,255,0.16)',
                }}
              />
              <div>
                <div style={{ fontWeight: 800, letterSpacing: 0.2 }}>DART Learn</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: -2 }}>GenZ RWA + ESG demo</div>
              </div>
            </div>
          </NavLink>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 10 }}>
            <NavItem to="/learning" label="Learning" />
            <NavItem to="/simulator" label="Simulator" />
            <NavItem to="/invest" label="Real Invest" />
            <NavItem to="/dashboard" label="Dashboard" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="panel" style={{ padding: '8px 10px', borderRadius: 12, fontSize: 12, color: 'var(--muted)' }}>
            Badges: <span style={{ color: 'var(--text)', fontWeight: 750 }}>{computed.badgesCount}/3</span> · Voucher:{' '}
            <span style={{ color: 'var(--text)', fontWeight: 750 }}>{state.voucher.ehkdVoucherBalance.toFixed(0)} e-HKD</span>
          </div>

          {computed.isLoggedIn ? (
            <>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 750 }}>{state.user?.displayName}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{state.user?.walletAddress.slice(0, 10)}…</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  dispatch({ type: 'RESET_DEMO' })
                  nav('/dashboard')
                }}
              >
                Reset progress
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  dispatch({ type: 'LOGOUT' })
                  nav('/')
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                nav('/login')
              }}
            >
              Log in (demo)
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}


