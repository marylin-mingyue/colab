import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { useAppState } from '../state/AppState'

export function Landing() {
  const nav = useNavigate()
  const { computed } = useAppState()

  return (
    <div className="grid" style={{ gap: 18 }}>
      <div className="panel-strong" style={{ padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 640 }}>
            <div
              style={{
                display: 'inline-flex',
                gap: 10,
                alignItems: 'center',
                padding: '6px 10px',
                borderRadius: 999,
                border: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.06)',
                fontSize: 12,
                color: 'var(--muted)',
              }}
            >
              HK-aligned demo · RWA tokenization · ESG · e-HKD settlement concept
            </div>
            <h1 style={{ margin: '10px 0 0', fontSize: 40, lineHeight: 1.08, letterSpacing: -0.6 }}>
              Learn finance like a game.
              <br />
              Invest step-by-step with safety rails.
            </h1>
            <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 14 }}>
              Target users: Hong Kong Gen Z students with no finance background. We turn bite-sized challenges into verifiable learning
              credentials (NFT badges) that unlock risk-free simulation, then small real investment using a programmable e-HKD voucher
              concept.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
              <Button
                onClick={() => {
                  nav(computed.isLoggedIn ? '/learning' : '/login')
                }}
              >
                Start the demo
              </Button>
              <Button variant="ghost" onClick={() => nav('/dashboard')}>
                View dashboard
              </Button>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)' }}>
              Demo-only. No real money. No KYC. No chain transactions.
            </div>
          </div>

          <div className="panel" style={{ padding: 14, width: 360, borderRadius: 16 }}>
            <div style={{ fontWeight: 850, fontSize: 13 }}>3-module progressive journey</div>
            <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 13 }}>Module 1 — Learning</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  Duolingo-like scenarios (HK-specific). Earn NFT learning badges.
                </div>
              </div>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 13 }}>Module 2 — Simulator</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  Practice with virtual tokenized RWA baskets. Track PnL + drawdown.
                </div>
              </div>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 13 }}>Module 3 — Real Invest</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  Unlock small, low-risk investments using an e-HKD voucher concept.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        <div style={{ gridColumn: 'span 7' }}>
          <Card title="Converging trends (PEST)" subtitle="Why now: policy + behavior + safer rails">
            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 850, fontSize: 12 }}>Political</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  HKMA Fintech 2030: DART architecture, RWA tokenization, ESG focus, and building safer rails.
                </div>
              </div>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 850, fontSize: 12 }}>Economic</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  Inflation vs low savings yields: students want growth but face high barriers.
                </div>
              </div>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 850, fontSize: 12 }}>Social</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  Attention economy + financial scams: short, guided learning beats long courses.
                </div>
              </div>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 850, fontSize: 12 }}>Technological</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  Account abstraction (ERC-4337), tokenization, agentic GenAI coaching, programmable money.
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div style={{ gridColumn: 'span 5' }}>
          <Card title="Design principles" subtitle="Built for Gen Z + regulators + institutions">
            <div className="grid">
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 850, fontSize: 12 }}>Safety rails</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  Unlock higher risk only after evidence: badges + stable simulated performance.
                </div>
              </div>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 850, fontSize: 12 }}>On-chain verifiable credentials</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  NFT badges represent learning progress and can be verified across platforms.
                </div>
              </div>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 850, fontSize: 12 }}>Institution-ready</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  Fits B2G + B2B models: sponsored challenges, qualified leads, anonymous insights.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}


