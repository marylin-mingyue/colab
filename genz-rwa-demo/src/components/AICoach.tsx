import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppState } from '../state/AppState'
import { Button } from './Button'

function coachMessage(pathname: string, badges: number, pnlPct: number) {
  if (pathname.startsWith('/learning')) {
    return {
      title: 'AI Coach: Learn smart, not long',
      body: `Pick the option you’d actually do in real life. I’ll explain the tradeoffs and the hidden risks (fees, coverage gaps, volatility).`,
    }
  }
  if (pathname.startsWith('/simulator')) {
    const tone = pnlPct >= 0 ? 'Nice discipline.' : 'No panic.'
    return {
      title: `AI Coach: Portfolio check — ${tone}`,
      body: `Focus on risk first. In a drawdown, don’t “revenge trade”. Try lowering HIGH-risk weights and watch volatility + max drawdown.`,
    }
  }
  if (pathname.startsWith('/invest')) {
    return {
      title: 'AI Coach: Real money, small steps',
      body: `This demo uses an e-HKD voucher concept: spend only what you can afford to lock for a while. Start with low-risk tokenized bonds.`,
    }
  }
  if (pathname.startsWith('/dashboard')) {
    return {
      title: 'AI Coach: Your path to unlock',
      body: `You have ${badges}/3 badges. Earn all 3 + positive simulator PnL to unlock the Real Invest module.`,
    }
  }
  return {
    title: 'AI Coach: Quick help',
    body: `I’m always here. Ask: “What should I do next?” or “Why is this risky?”`,
  }
}

export function AICoach() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { computed } = useAppState()

  const pnlPct = computed.simPnLPct
  const msg = useMemo(() => coachMessage(pathname, computed.badgesCount, pnlPct), [pathname, computed.badgesCount, pnlPct])

  return (
    <>
      <div style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 50 }}>
        <Button onClick={() => setOpen((v) => !v)}>{open ? 'Close Coach' : 'AI Coach'}</Button>
      </div>
      {open && (
        <div
          className="panel-strong"
          style={{
            position: 'fixed',
            right: 18,
            bottom: 72,
            zIndex: 49,
            width: 360,
            padding: 14,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 850, fontSize: 13 }}>{msg.title}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{msg.body}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: 10,
                color: 'var(--text)',
                padding: '6px 8px',
                cursor: 'pointer',
              }}
            >
              X
            </button>
          </div>
          <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
            <div className="panel" style={{ padding: 10, borderRadius: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 750 }}>Behavior bias watch</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                - Herding · Overconfidence · Loss aversion · Recency bias
              </div>
            </div>
            <div className="panel" style={{ padding: 10, borderRadius: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 750 }}>One-line rule</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                Don’t optimize returns before you understand your downside.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


