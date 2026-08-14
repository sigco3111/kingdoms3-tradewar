import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      // 빌드 설정
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true
      },
      // GitHub Pages basePath
      base: '/kingdoms3-tradewar/',
      // public 디렉토리 설정
      publicDir: 'public'
    };
});
