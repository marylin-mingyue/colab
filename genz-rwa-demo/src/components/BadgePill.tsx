import type { BadgeLevel } from '../state/types'

const LABEL: Record<BadgeLevel, string> = {
  INSURANCE: 'Insurance Badge',
  INVESTING: 'Investing Badge',
  ESG: 'ESG Badge',
}

export function BadgePill({ level, tokenId }: { level: BadgeLevel; tokenId?: string }) {
  const color =
    level === 'INSURANCE'
      ? 'rgba(110,231,255,0.22)'
      : level === 'INVESTING'
        ? 'rgba(167,139,250,0.22)'
        : 'rgba(52,211,153,0.20)'

  return (
    <div
      title={tokenId ? `NFT tokenId: ${tokenId}` : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        borderRadius: 999,
        border: '1px solid var(--border)',
        background: color,
        fontSize: 12,
        fontWeight: 650,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--brand)' }} />
      {LABEL[level]}
    </div>
  )
}


