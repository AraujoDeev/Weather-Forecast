import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], define:{'process.env':{API_KEY:'484ff33e9349314b18c37a7e9ad76c7c'}}
})
