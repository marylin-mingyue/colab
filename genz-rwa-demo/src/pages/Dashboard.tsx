import { useNavigate } from 'react-router-dom'
import { BadgePill } from '../components/BadgePill'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Sparkline } from '../components/Sparkline'
import { getAsset } from '../domain/assets'
import { useAppState } from '../state/AppState'

export function Dashboard() {
  const { state, computed, dispatch } = useAppState()
  const nav = useNavigate()

  const values = state.simulator.history.map((h) => h.value)
  const pnlPct = computed.simPnLPct

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="panel-strong" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Your progress</div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 4 }}>
              {computed.badgesCount}/3 badges · {pnlPct >= 0 ? '+' : ''}
              {pnlPct.toFixed(2)}% simulated PnL
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>
              Unlock Real Invest: earn 3 badges + keep simulator PnL positive.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button onClick={() => nav('/learning')}>Continue learning</Button>
            <Button variant="ghost" onClick={() => nav('/simulator')}>
              Open simulator
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                dispatch({ type: 'RESET_DEMO' })
              }}
            >
              Reset progress
            </Button>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        <div style={{ gridColumn: 'span 7' }}>
          <Card title="Badges (NFT learning credentials)" subtitle="Mock on-chain proof used to unlock higher modules">
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {state.badges.length ? (
                state.badges.map((b) => <BadgePill key={b.level} level={b.level} tokenId={b.tokenId} />)
              ) : (
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>No badges yet. Start learning to earn your first badge.</div>
              )}
            </div>
          </Card>
        </div>
        <div style={{ gridColumn: 'span 5' }}>
          <Card title="e-HKD voucher (concept)" subtitle="Reward mechanism for safe participation">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <div>
                <div style={{ fontSize: 30, fontWeight: 950 }}>{state.voucher.ehkdVoucherBalance.toFixed(0)}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>e-HKD</div>
              </div>
              <Button variant="ghost" onClick={() => nav('/invest')}>
                Use voucher
              </Button>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)' }}>
              In production, this could be sponsor-funded and programmable (limits, expiry, asset whitelist).
            </div>
          </Card>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        <div style={{ gridColumn: 'span 8' }}>
          <Card title="Simulator overview" subtitle="Your virtual tokenized RWA portfolio">
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Value</div>
                <div style={{ fontSize: 20, fontWeight: 900 }}>{state.simulator.currentValue.toFixed(2)}</div>
              </div>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Holdings</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  {state.simulator.holdings
                    .map((h) => `${getAsset(h.assetId)?.symbol ?? h.assetId}: ${h.weightPct.toFixed(1)}%`)
                    .join(' · ')}
                </div>
              </div>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Last 90 steps</div>
                <Sparkline values={values} width={320} height={74} />
              </div>
            </div>
          </Card>
        </div>
        <div style={{ gridColumn: 'span 4' }}>
          <Card title="Next unlock" subtitle="What to do in 30 seconds on stage">
            <div className="grid" style={{ gap: 10 }}>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 850, fontSize: 12 }}>1) Mint badges</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Complete each learning level once.</div>
              </div>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 850, fontSize: 12 }}>2) Run simulator</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  Tune weights. Try to keep PnL positive. Earn voucher.
                </div>
              </div>
              <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 850, fontSize: 12 }}>3) Invest voucher</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  Spend e-HKD voucher into low-risk tokenized assets.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}


