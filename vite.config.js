import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // Load all env vars

  return {
    plugins: [react()],
    server: {
      host: true,
      port: env.VITE_BASE_PORT,
      origin: 'http://pumped-collie-previously.ngrok-free.app',
      proxy: {
        '/api': env.VITE_API_URL,
      }
    }
  }
})
