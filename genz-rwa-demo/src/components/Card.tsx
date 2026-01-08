import React from 'react'

export function Card({
  title,
  subtitle,
  right,
  children,
}: {
  title?: string
  subtitle?: string
  right?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="panel" style={{ padding: 16 }}>
      {(title || subtitle || right) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            {title && <div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>}
            {subtitle && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{subtitle}</div>}
          </div>
          {right && <div>{right}</div>}
        </div>
      )}
      <div style={{ marginTop: title || subtitle || right ? 12 : 0 }}>{children}</div>
    </div>
  )
}


