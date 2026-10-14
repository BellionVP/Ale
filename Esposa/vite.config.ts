import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rewrite-public-photo-paths',
      transformIndexHtml(html) {
        return html.replaceAll('./public/fotos/', '/fotos/')
      },
    },
  ],
})