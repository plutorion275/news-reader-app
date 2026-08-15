import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    env: {
      VITE_NEWS_API_KEY: 'test-key',
    },
    pool: 'forks',
    forks: {
      singleFork: true,
    },
  },
})
