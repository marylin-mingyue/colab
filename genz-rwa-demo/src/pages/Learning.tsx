import { useNavigate } from 'react-router-dom'
import { BadgePill } from '../components/BadgePill'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { useAppState } from '../state/AppState'
import type { BadgeLevel } from '../state/types'

const LEVELS: { level: BadgeLevel; title: string; subtitle: string }[] = [
  { level: 'INSURANCE', title: 'Level 1 — Insurance basics (HK)', subtitle: 'Regulation, coverage, real-life student scenarios' },
  { level: 'INVESTING', title: 'Level 2 — Investing basics', subtitle: 'Risk tolerance, products, simple choices' },
  { level: 'ESG', title: 'Level 3 — ESG + RWA', subtitle: 'Why tokenization, green finance, and real-world impact' },
]

export function Learning() {
  const nav = useNavigate()
  const { state, computed } = useAppState()

  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
      <div style={{ gridColumn: 'span 8' }}>
        <div className="panel-strong" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 26 }}>Learning</h2>
              <div style={{ marginTop: 8, color: 'var(--muted)', fontSize: 13 }}>
                Bite-sized, scenario-based challenges. Complete a level to mint an NFT learning badge.
              </div>
            </div>
            <Button variant="ghost" onClick={() => nav('/simulator')}>
              Go to Simulator
            </Button>
          </div>

          <div className="grid" style={{ marginTop: 14, gap: 12 }}>
            {LEVELS.map((l) => {
              const done = computed.hasBadge(l.level)
              return (
                <div key={l.level} className="panel" style={{ padding: 14, borderRadius: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontWeight: 900 }}>{l.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{l.subtitle}</div>
                      <div style={{ marginTop: 10 }}>{done ? <BadgePill level={l.level} tokenId={state.badges.find((b) => b.level === l.level)?.tokenId} /> : <span style={{ fontSize: 12, color: 'var(--muted)' }}>Not completed</span>}</div>
                    </div>
                    <Button
                      onClick={() => {
                        nav(`/learning/${l.level.toLowerCase()}`)
                      }}
                    >
                      {done ? 'Replay' : 'Start'}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <Card title="How badges unlock access" subtitle="Progressive disclosure for safety + retention">
          <div className="grid">
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 850, fontSize: 12 }}>Badge = on-chain proof</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                Badges are verifiable credentials (NFTs). Here we mock minting for demo.
              </div>
            </div>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 850, fontSize: 12 }}>Simulator unlock</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                Earn at least 1 badge to access risk-free tokenized RWA simulation.
              </div>
            </div>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 850, fontSize: 12 }}>Real Invest unlock</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                Earn 3 badges + keep simulated PnL positive to unlock voucher investment.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}


