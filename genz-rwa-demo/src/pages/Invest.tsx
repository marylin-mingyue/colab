import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { ASSETS, getAsset } from '../domain/assets'
import { useAppState } from '../state/AppState'
import type { Holding } from '../state/types'
import { normalizeHoldings } from '../utils/portfolio'

export function Invest() {
  const nav = useNavigate()
  const { state, computed, dispatch } = useAppState()

  const [amount, setAmount] = useState<number>(Math.min(50, state.voucher.ehkdVoucherBalance))
  const [pending, setPending] = useState<Record<string, number>>(() => {
    const m: Record<string, number> = {}
    for (const h of state.invest.positions) m[h.assetId] = h.weightPct
    for (const a of ASSETS) if (m[a.id] == null) m[a.id] = 0
    return m
  })

  const normalized = useMemo(() => {
    const positions: Holding[] = Object.entries(pending).map(([assetId, weightPct]) => ({ assetId, weightPct }))
    return normalizeHoldings(positions)
  }, [pending])

  if (!computed.eligibleForRealInvest) {
    return (
      <Card title="Invest (locked)" subtitle="Unlock condition: 3 badges + positive simulator PnL">
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>
          Current status: <b style={{ color: 'var(--text)' }}>{computed.badgesCount}/3 badges</b> · Simulator PnL:{' '}
          <b style={{ color: computed.simPnLPct >= 0 ? 'var(--ok)' : 'var(--danger)' }}>{computed.simPnLPct.toFixed(2)}%</b>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
          <Button onClick={() => nav('/learning')}>Earn badges</Button>
          <Button variant="ghost" onClick={() => nav('/simulator')}>
            Improve PnL
          </Button>
          <Button variant="ghost" onClick={() => nav('/dashboard')}>
            Dashboard
          </Button>
        </div>
      </Card>
    )
  }

  const maxSpend = state.voucher.ehkdVoucherBalance
  const canInvest = maxSpend > 0 && amount > 0 && amount <= maxSpend && normalized.length > 0

  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
      <div style={{ gridColumn: 'span 8' }}>
        <div className="panel-strong" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 26 }}>Invest</h2>
              <div style={{ marginTop: 8, color: 'var(--muted)', fontSize: 13 }}>
                You invest using a sponsor-funded e-HKD voucher concept. This demo only simulates the flow.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button variant="ghost" onClick={() => nav('/simulator')}>
                Back to Simulator
              </Button>
              <Button variant="ghost" onClick={() => nav('/dashboard')}>
                Dashboard
              </Button>
            </div>
          </div>

          <div className="grid" style={{ marginTop: 14, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Voucher balance</div>
              <div style={{ fontSize: 22, fontWeight: 950 }}>{state.voucher.ehkdVoucherBalance.toFixed(0)} e-HKD</div>
            </div>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Total invested (demo)</div>
              <div style={{ fontSize: 22, fontWeight: 950 }}>{state.invest.investedTotal.toFixed(0)} e-HKD</div>
            </div>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Suggested first asset</div>
              <div style={{ fontSize: 13, fontWeight: 850, marginTop: 6 }}>HK Government Digital Green Bond</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Low risk · aligns with green finance narrative</div>
            </div>
          </div>

          <div className="panel" style={{ padding: 12, borderRadius: 14, marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 950, fontSize: 14 }}>Investment allocation</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  Your allocation will be normalized to 100%.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Button
                  variant="ghost"
                  onClick={() =>
                    setPending({
                      hk_digital_green_bond: 80,
                      esg_green_energy_basket: 20,
                      hk_bluechip_basket: 0,
                      ai_infra_basket: 0,
                    })
                  }
                >
                  Low risk preset
                </Button>
                <Button
                  onClick={() => {
                    dispatch({ type: 'SET_INVEST_POSITIONS', positions: normalized })
                  }}
                >
                  Save allocation
                </Button>
              </div>
            </div>

            <div className="grid" style={{ marginTop: 12, gap: 10 }}>
              {ASSETS.map((a) => {
                const v = pending[a.id] ?? 0
                return (
                  <div key={a.id} className="panel" style={{ padding: 12, borderRadius: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontWeight: 900, fontSize: 13 }}>{a.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                          {a.symbol} · Risk: <b style={{ color: 'var(--text)' }}>{a.risk}</b>
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
          </div>

          <div className="panel" style={{ padding: 12, borderRadius: 14, marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 950, fontSize: 14 }}>Spend voucher</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  This will decrease your e-HKD balance and record a demo “investment”.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  type="number"
                  min={0}
                  max={maxSpend}
                  value={Number.isFinite(amount) ? amount : 0}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{
                    width: 140,
                    padding: '10px 12px',
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'var(--text)',
                    outline: 'none',
                  }}
                />
                <Button
                  disabled={!canInvest}
                  onClick={() => {
                    dispatch({ type: 'SET_INVEST_POSITIONS', positions: normalized })
                    dispatch({ type: 'INVEST_WITH_VOUCHER', amount })
                  }}
                >
                  Invest now (demo)
                </Button>
              </div>
            </div>

            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)' }}>
              Allocation preview:{' '}
              <b style={{ color: 'var(--text)' }}>
                {normalized.map((h) => `${getAsset(h.assetId)?.symbol ?? h.assetId} ${h.weightPct.toFixed(1)}%`).join(' · ')}
              </b>
            </div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <Card title="Compliance notes (concept)" subtitle="What production would require">
          <div className="grid" style={{ gap: 10 }}>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 900, fontSize: 12 }}>KYC / AML</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                Identity checks, risk profiling, transaction monitoring, and audit logs.
              </div>
            </div>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 900, fontSize: 12 }}>Programmable e-HKD</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                Voucher whitelists + limits can reduce fraud and align policy goals (e.g., green finance).
              </div>
            </div>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 900, fontSize: 12 }}>Tokenized settlement</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                Explore tokenized deposits + interbank settlement rails (e-HKD based).
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}


