import React from 'react'

type Props = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

type State = { hasError: boolean; error?: unknown }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error('App crashed:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ padding: 24 }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Something went wrong</div>
            <div style={{ marginTop: 8, color: 'var(--muted)', fontSize: 13 }}>Please refresh the page or try again later.</div>
          </div>
        )
      )
    }
    return this.props.children
  }
}

