import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// Multi-page static site — no framework. Five HTML entries at root,
// shared CSS/JS in src/. Vite bundles and hashes them on build.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        levtech: fileURLToPath(new URL('./levtech.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./privacy-policy.html', import.meta.url)),
        terms: fileURLToPath(new URL('./terms.html', import.meta.url)),
        cookies: fileURLToPath(new URL('./cookie-policy.html', import.meta.url)),
      },
    },
  },
});
