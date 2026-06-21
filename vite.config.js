import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/blade-barbershop/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('react-router')) return 'router'
        },
      },
    },
  },
})
