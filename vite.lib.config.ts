import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

/**
 * Library build for publishing to npm (`pnpm run build:lib`).
 * Emits ESM to dist-lib/ with every runtime dependency externalized —
 * consumers bring their own React and the package's deps install alongside.
 * Types are emitted separately by `tsc -p tsconfig.lib.json`.
 */
export default defineConfig({
  plugins: [react()],
  // Never copy public/ into the package — it holds the site's fonts, and the
  // SF Pro Display faces are Apple-licensed and must not ship on npm.
  publicDir: false,
  build: {
    outDir: 'dist-lib',
    sourcemap: true,
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'framer-motion',
        'lucide-react',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ],
    },
  },
});
