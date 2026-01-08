import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { AICoach } from './AICoach'

export function Layout() {
  return (
    <div>
      <TopNav />
      <main className="container" style={{ padding: '18px 0 72px' }}>
        <Outlet />
      </main>
      <AICoach />
    </div>
  )
}


