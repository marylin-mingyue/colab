import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AppStateProvider } from './state/AppState'
import { ErrorBoundary } from './components/ErrorBoundary'
import { applyTheme } from './theme/applyTheme'

applyTheme()

// GitHub Pages SPA fallback (see public/404.html)
const redirect = sessionStorage.getItem('spa_redirect')
if (redirect) {
  sessionStorage.removeItem('spa_redirect')
  history.replaceState(null, '', redirect)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ErrorBoundary>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
