import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Sparkline } from '../components/Sparkline'
import { ASSETS } from '../domain/assets'
import { useAppState } from '../state/AppState'
import type { Holding } from '../state/types'
import { normalizeHoldings } from '../utils/portfolio'
import { maxDrawdownPct } from '../utils/metrics'

function pct(n: number) {
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`
}

export function Simulator() {
  const nav = useNavigate()
  const { state, computed, dispatch } = useAppState()
  const [pending, setPending] = useState<Record<string, number>>(() => {
    const m: Record<string, number> = {}
    for (const h of state.simulator.holdings) m[h.assetId] = h.weightPct
    for (const a of ASSETS) if (m[a.id] == null) m[a.id] = 0
    return m
  })

  const values = state.simulator.history.map((h) => h.value)
  const pnlPct = computed.simPnLPct
  const mdd = maxDrawdownPct(values)

  const expected = useMemo(() => {
    const holdings: Holding[] = Object.entries(pending).map(([assetId, weightPct]) => ({ assetId, weightPct }))
    const n = normalizeHoldings(holdings)
    let apr = 0
    let vol = 0
    for (const h of n) {
      const asset = ASSETS.find((a) => a.id === h.assetId)
      if (!asset) continue
      const w = h.weightPct / 100
      apr += w * asset.aprHintPct
      vol += w * asset.volatilityHintPct
    }
    return { apr, vol, normalized: n }
  }, [pending])

  if (!computed.eligibleForSimulator) {
    return (
      <Card title="Simulator (locked)" subtitle="Earn at least 1 learning badge to unlock simulation">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button onClick={() => nav('/learning')}>Go to Learning</Button>
          <Button variant="ghost" onClick={() => nav('/dashboard')}>
            View Dashboard
          </Button>
        </div>
      </Card>
    )
  }

  const canAward =
    computed.badgesCount >= 2 &&
    pnlPct > 0 &&
    (!state.voucher.lastAwardedAt || Date.now() - state.voucher.lastAwardedAt > 30_000)

  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
      <div style={{ gridColumn: 'span 8' }}>
        <div className="panel-strong" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 26 }}>Simulator</h2>
              <div style={{ marginTop: 8, color: 'var(--muted)', fontSize: 13 }}>
                Virtual tokenized RWA baskets with a simple market simulation engine (demo).
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button
                variant="ghost"
                onClick={() => {
                  dispatch({ type: 'SIM_RESET' })
                }}
              >
                Reset simulation
              </Button>
              <Button
                onClick={() => {
                  dispatch({ type: 'SIM_STEP', steps: 1 })
                }}
              >
                Step 1 day
              </Button>
              <Button
                onClick={() => {
                  dispatch({ type: 'SIM_STEP', steps: 30 })
                }}
              >
                Run 30 days
              </Button>
            </div>
          </div>

          <div className="grid" style={{ marginTop: 14, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>PnL</div>
              <div style={{ fontSize: 22, fontWeight: 950, color: pnlPct >= 0 ? 'var(--ok)' : 'var(--danger)' }}>
                {pct(pnlPct)}
              </div>
            </div>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Max drawdown</div>
              <div style={{ fontSize: 22, fontWeight: 950, color: mdd <= 6 ? 'var(--ok)' : 'var(--danger)' }}>
                {mdd.toFixed(2)}%
              </div>
            </div>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Portfolio value</div>
              <div style={{ fontSize: 22, fontWeight: 950 }}>{state.simulator.currentValue.toFixed(2)}</div>
            </div>
          </div>

          <div className="panel" style={{ padding: 12, borderRadius: 14, marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: 13 }}>Performance chart</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Last {values.length} steps</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                Expected APR ~ <b style={{ color: 'var(--text)' }}>{expected.apr.toFixed(1)}%</b> · Volatility ~{' '}
                <b style={{ color: 'var(--text)' }}>{expected.vol.toFixed(1)}%</b>
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <Sparkline values={values} width={640} height={120} />
            </div>
          </div>
        </div>

        <div className="panel-strong" style={{ padding: 18, marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 950, fontSize: 16 }}>Allocate your virtual portfolio</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                Adjust weights. Higher risk unlock is enforced by learning badges in a real product (demo keeps it open).
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button
                variant="ghost"
                onClick={() =>
                  setPending({
                    hk_digital_green_bond: 70,
                    esg_green_energy_basket: 30,
                    hk_bluechip_basket: 0,
                    ai_infra_basket: 0,
                  })
                }
              >
                Safer preset
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  setPending({
                    hk_digital_green_bond: 35,
                    esg_green_energy_basket: 25,
                    hk_bluechip_basket: 20,
                    ai_infra_basket: 20,
                  })
                }
              >
                Balanced preset
              </Button>
              <Button
                onClick={() => {
                  dispatch({ type: 'SET_HOLDINGS', holdings: expected.normalized })
                }}
              >
                Apply allocation
              </Button>
            </div>
          </div>

          <div className="grid" style={{ marginTop: 14, gap: 10 }}>
            {ASSETS.map((a) => {
              const v = pending[a.id] ?? 0
              const riskColor = a.risk === 'LOW' ? 'var(--ok)' : a.risk === 'MEDIUM' ? 'var(--brand)' : 'var(--danger)'
              return (
                <div key={a.id} className="panel" style={{ padding: 12, borderRadius: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 13 }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                        {a.symbol} · Risk:{' '}
                        <span style={{ color: riskColor, fontWeight: 850 }}>{a.risk}</span> · APR ~ {a.aprHintPct}% · Vol ~{' '}
                        {a.volatilityHintPct}%
                      </div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 900 }}>{v.toFixed(0)}%</div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={v}
                    onChange={(e) => setPending((p) => ({ ...p, [a.id]: Number(e.target.value) }))}
                    style={{ width: '100%', marginTop: 10 }}
                  />
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)' }}>
            Your weights will be normalized to 100% when you apply.
          </div>
        </div>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <Card title="Leaderboard" subtitle="Top performers earn an e-HKD voucher">
          <div className="grid" style={{ gap: 10 }}>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <b>1</b> <span>Jamie</span> <span style={{ color: 'var(--ok)', fontWeight: 850 }}>+6.2%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 6 }}>
                <b>2</b> <span>Renee</span> <span style={{ color: 'var(--ok)', fontWeight: 850 }}>+4.7%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 6 }}>
                <b>3</b> <span>You</span> <span style={{ color: pnlPct >= 0 ? 'var(--ok)' : 'var(--danger)', fontWeight: 850 }}>{pct(pnlPct)}</span>
              </div>
            </div>

            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 900, fontSize: 13 }}>Reward rule (demo)</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                If you have 2+ badges and positive PnL, you can claim <b style={{ color: 'var(--text)' }}>50 e-HKD</b> once every 30
                seconds.
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                <Button
                  disabled={!canAward}
                  onClick={() => {
                    dispatch({ type: 'AWARD_VOUCHER', amount: 50 })
                  }}
                >
                  Claim 50 e-HKD
                </Button>
                <Button variant="ghost" onClick={() => nav('/invest')}>
                  Go to Real Invest
                </Button>
              </div>
              {!canAward && (
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
                  Not eligible yet. Get 2 badges + make PnL positive (and wait cooldown).
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}


