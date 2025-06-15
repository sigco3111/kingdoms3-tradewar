import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
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
      // public 디렉토리 설정
      publicDir: 'public'
    };
});
