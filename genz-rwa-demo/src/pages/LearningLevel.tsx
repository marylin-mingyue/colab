import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BadgePill } from '../components/BadgePill'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { LEARNING } from '../domain/learningContent'
import { useAppState } from '../state/AppState'
import type { BadgeLevel } from '../state/types'

function parseLevel(raw: string | undefined): BadgeLevel | null {
  if (!raw) return null
  const v = raw.toUpperCase()
  if (v === 'INSURANCE') return 'INSURANCE'
  if (v === 'INVESTING') return 'INVESTING'
  if (v === 'ESG') return 'ESG'
  return null
}

export function LearningLevel() {
  const { level: raw } = useParams()
  const level = parseLevel(raw)
  const nav = useNavigate()
  const { state, dispatch, computed } = useAppState()

  const content = level ? LEARNING[level] : null
  const alreadyEarned = level ? computed.hasBadge(level) : false

  const [answers, setAnswers] = useState<Record<string, string>>({})

  const allDone = useMemo(() => {
    if (!content) return false
    return content.scenarios.every((s) => !!answers[s.id])
  }, [answers, content])

  if (!level || !content) {
    return (
      <Card title="Unknown level">
        <div style={{ display: 'flex', gap: 10 }}>
          <Button onClick={() => nav('/learning')}>Back</Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
      <div style={{ gridColumn: 'span 8' }}>
        <div className="panel-strong" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Learning</div>
              <h2 style={{ margin: '6px 0 0', fontSize: 24 }}>{content.title}</h2>
              <div style={{ marginTop: 10 }}>
                {alreadyEarned ? (
                  <BadgePill level={level} tokenId={state.badges.find((b) => b.level === level)?.tokenId} />
                ) : (
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Complete scenarios to mint your badge.</div>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="ghost" onClick={() => nav('/learning')}>
                Back to levels
              </Button>
              <Button
                onClick={() => {
                  dispatch({ type: 'SIM_STEP', steps: 3 })
                  nav('/dashboard')
                }}
                variant="ghost"
              >
                Quick demo: update dashboard
              </Button>
            </div>
          </div>

          <div className="grid" style={{ marginTop: 14, gap: 12 }}>
            {content.scenarios.map((s, idx) => {
              const selected = answers[s.id]
              const feedback = selected ? s.aiFeedbackByChoiceId[selected] : null
              const isCorrect = selected ? selected === s.correctChoiceId : null
              return (
                <div key={s.id} className="panel" style={{ padding: 14, borderRadius: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 900 }}>Scenario {idx + 1}</div>
                    {selected && (
                      <div style={{ fontSize: 12, fontWeight: 850, color: isCorrect ? 'var(--ok)' : 'var(--danger)' }}>
                        {isCorrect ? 'Good choice' : 'Risky choice'}
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text)' }}>{s.prompt}</div>
                  <div className="grid" style={{ marginTop: 10, gap: 8 }}>
                    {s.choices.map((c) => {
                      const active = selected === c.id
                      return (
                        <button
                          key={c.id}
                          onClick={() => setAnswers((prev) => ({ ...prev, [s.id]: c.id }))}
                          className="panel"
                          style={{
                            textAlign: 'left',
                            padding: 12,
                            borderRadius: 14,
                            cursor: 'pointer',
                            border: `1px solid ${active ? 'rgba(110,231,255,0.35)' : 'var(--border)'}`,
                            background: active ? 'rgba(110,231,255,0.10)' : 'var(--panel)',
                          }}
                        >
                          <div style={{ display: 'flex', gap: 10 }}>
                            <div
                              style={{
                                width: 18,
                                height: 18,
                                borderRadius: 999,
                                border: '1px solid var(--border)',
                                background: active ? 'rgba(110,231,255,0.35)' : 'transparent',
                                marginTop: 1,
                              }}
                            />
                            <div style={{ fontSize: 13 }}>{c.label}</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  {feedback && (
                    <div className="panel" style={{ padding: 12, borderRadius: 14, marginTop: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 900 }}>AI Coach feedback</div>
                      <div style={{ marginTop: 6, fontSize: 12, color: 'var(--muted)' }}>{feedback}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginTop: 14 }}>
            <Button
              disabled={!allDone || alreadyEarned}
              onClick={() => {
                dispatch({ type: 'EARN_BADGE', level })
              }}
            >
              {alreadyEarned ? 'Badge already minted' : allDone ? 'Mint NFT Badge (mock)' : 'Complete all scenarios to mint'}
            </Button>
            <Button variant="ghost" onClick={() => setAnswers({})}>
              Reset answers
            </Button>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              Tip: in a real system, minting would be on-chain and signed by the course issuer.
            </div>
          </div>
        </div>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <Card title="Unlock status" subtitle="Progressive access control (demo rules)">
          <div className="grid">
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 850, fontSize: 12 }}>Badges</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                {computed.badgesCount}/3 earned
              </div>
            </div>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 850, fontSize: 12 }}>Simulator</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                {computed.eligibleForSimulator ? 'Unlocked' : 'Locked (needs 1 badge)'}
              </div>
            </div>
            <div className="panel" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 850, fontSize: 12 }}>Real Invest</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                {computed.eligibleForRealInvest ? 'Unlocked' : 'Locked (needs 3 badges + positive PnL)'}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}


