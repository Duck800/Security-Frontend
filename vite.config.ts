import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { prismjsPlugin } from 'vite-plugin-prismjs';

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
  '@': pathResolve('src')
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [
    vue(),
    legacy(),
    prismjsPlugin({
      languages: 'all',
      plugins: ['copy-to-clipboard', 'show-language'],
      theme: 'tomorrow',
      css: true,
    })
  ],
  optimizeDeps: {
    include: ['naive-ui']
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    proxy: {
      '/dev': {
        target: 'http://localhost:3004',
        rewrite: path => path.replace(/^\/dev/, ''),
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias,
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
});
