import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    // For GitHub Pages, set VITE_BASE (e.g. /colab/genz-rwa-demo/)
    base: env.VITE_BASE ?? '/',
  }
})
