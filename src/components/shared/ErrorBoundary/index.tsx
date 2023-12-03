import React, { type ReactNode } from 'react'

type Props = {
  fallback: ReactNode
  children: ReactNode
}

export class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) return <h1>error</h1>

    return this.props.children
  }
}
