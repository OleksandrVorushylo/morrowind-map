import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  ...(process.env.MORROWIND_ANDROID_BUILD === '1' ? { build: { target: 'chrome83' } } : {}),
  publicDir: process.env.MORROWIND_RENDER_PUBLIC_ROOT
    ? resolve(process.env.MORROWIND_RENDER_PUBLIC_ROOT)
    : 'public',
});
