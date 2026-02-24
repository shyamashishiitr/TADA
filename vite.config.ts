import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        // Code-splitting strategy: separate vendor chunk for better caching
        manualChunks: {
          // React core in its own chunk — rarely changes between deploys
          'vendor-react': ['react', 'react-dom'],
        },
      },
    },
    // Enable source maps for production debugging
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'es2022',
    // Warn if a chunk exceeds 250 KB
    chunkSizeWarningLimit: 250,
  },
})
