import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/resume-builder/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{ts,tsx}',
        '**/*.d.ts',
        '**/types/**',
        '**/templates/**', // Шаблоны можно исключить, если не тестируем их полностью
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 60,
        statements: 80,
      },
    },
  },
});
