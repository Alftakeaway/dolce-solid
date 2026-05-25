import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: './', // <--- Questa riga dice a Vite che il sito si trova dentro la cartella di GitHub Pages!
  build: {
    target: 'esnext',
  },
});