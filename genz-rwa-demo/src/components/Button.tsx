import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
}

export function Button({ variant = 'primary', size = 'md', style, ...rest }: Props) {
  const padding = size === 'sm' ? '8px 10px' : '10px 14px'
  const base: React.CSSProperties = {
    borderRadius: 12,
    border: '1px solid var(--border)',
    padding,
    cursor: rest.disabled ? 'not-allowed' : 'pointer',
    opacity: rest.disabled ? 0.6 : 1,
    transition: 'transform 120ms ease, background 120ms ease, border 120ms ease',
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, color-mix(in srgb, var(--brand) 32%, transparent), color-mix(in srgb, var(--brand2) 26%, transparent))',
    },
    ghost: {
      background: 'transparent',
    },
    danger: {
      background: 'rgba(251, 113, 133, 0.14)',
      border: '1px solid rgba(251, 113, 133, 0.35)',
    },
  }

  return (
    <button
      {...rest}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseDown={(e) => {
        rest.onMouseDown?.(e)
        ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)'
      }}
      onMouseUp={(e) => {
        rest.onMouseUp?.(e)
        ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
      }}
    />
  )
}


