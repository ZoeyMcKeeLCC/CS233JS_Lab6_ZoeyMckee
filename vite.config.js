import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load ALL .env variables (the '' prefix means don't filter to only VITE_-prefixed ones),
  // so API keys are available here in the server config but never bundled into the browser.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    build: {
      sourcemap: true,
    },
    server: {
      // During local development, Vite intercepts requests to /api/web-service/*,
      // strips the /api/web-service prefix, forwards them to the real API server,
      // and injects the API key here on the server — never in the browser.
      proxy: {
        '/gemini/api': {
          target: 'https://api.web-service.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/web-service/, ''),
          headers: {
            Authorization: `Bearer ${env.SECRET_THIRD_PARTY_KEY}`,
          },
        },
      },
    },
  };
});