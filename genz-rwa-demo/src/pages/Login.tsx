import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { useAppState } from '../state/AppState'
import type { WalletLoginMethod } from '../state/types'

function MethodCard({
  title,
  subtitle,
  selected,
  onClick,
}: {
  title: string
  subtitle: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="panel"
      style={{
        textAlign: 'left',
        padding: 14,
        borderRadius: 16,
        border: `1px solid ${selected ? 'rgba(110,231,255,0.35)' : 'var(--border)'}`,
        background: selected ? 'rgba(110,231,255,0.10)' : 'var(--panel)',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontWeight: 850 }}>{title}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{subtitle}</div>
    </button>
  )
}

export function Login() {
  const nav = useNavigate()
  const { dispatch } = useAppState()
  const [name, setName] = useState('Alex')
  const [method, setMethod] = useState<WalletLoginMethod>('IAM_SMART')

  const helper = useMemo(() => {
    return method === 'IAM_SMART'
      ? 'Simulates iAM Smart SSO → creates a smart account (ERC-4337 style) without seed phrases.'
      : 'Simulates FaceID + passkey → creates a smart account (no mnemonic, safer for Gen Z).'
  }, [method])

  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
      <div style={{ gridColumn: 'span 7' }}>
        <div className="panel-strong" style={{ padding: 20 }}>
          <h2 style={{ margin: 0, fontSize: 24 }}>Log in (demo)</h2>
          <div style={{ marginTop: 8, color: 'var(--muted)', fontSize: 13 }}>
            We use a concept of account abstraction: users don’t need seed phrases. In a real product, we can integrate iAM Smart /
            biometrics + compliance.
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Display name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={{
                marginTop: 6,
                width: '100%',
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--text)',
                outline: 'none',
              }}
            />
          </div>

          <div className="grid" style={{ marginTop: 14, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            <MethodCard
              title="iAM Smart (mock)"
              subtitle="HK-style identity → create a wallet seamlessly"
              selected={method === 'IAM_SMART'}
              onClick={() => setMethod('IAM_SMART')}
            />
            <MethodCard
              title="FaceID / Passkey (mock)"
              subtitle="No mnemonic, no friction"
              selected={method === 'FACE_ID'}
              onClick={() => setMethod('FACE_ID')}
            />
          </div>

          <div className="panel" style={{ padding: 12, borderRadius: 14, marginTop: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800 }}>What happens in this demo?</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{helper}</div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
            <Button
              onClick={() => {
                dispatch({ type: 'LOGIN', displayName: name, method })
                nav('/learning')
              }}
            >
              Continue
            </Button>
            <Button variant="ghost" onClick={() => nav('/')}>
              Back
            </Button>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: 'span 5' }}>
        <Card title="Why this matters" subtitle="Reduces scams + lowers adoption barriers">
          <div className="grid">
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 850, fontSize: 12 }}>Anti-scam UX</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                No seed phrases to leak. Clear transaction previews. Limits enforced by learning badge level.
              </div>
            </div>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 850, fontSize: 12 }}>Compliance-ready</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                In production: KYC/AML, spend controls, and institution-approved learning content.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}


