import { THEME } from '../config/app'

export function applyTheme() {
  const root = document.documentElement
  root.dataset.theme = THEME
  root.style.colorScheme = THEME === 'ideathon' ? 'light' : 'dark'
}

