import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react(),mkcert()],
  plugins: [react()],
  server:{ host: true},
  // server:{https:true,  host: true},
    //   proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     secure: false,       // allows HTTP target
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // }
})
