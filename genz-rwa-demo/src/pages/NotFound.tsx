import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card } from '../components/Card'

export function NotFound() {
  const nav = useNavigate()
  return (
    <Card title="Page not found">
      <div style={{ display: 'flex', gap: 10 }}>
        <Button onClick={() => nav('/')}>Go home</Button>
        <Button variant="ghost" onClick={() => nav('/dashboard')}>
          Dashboard
        </Button>
      </div>
    </Card>
  )
}


