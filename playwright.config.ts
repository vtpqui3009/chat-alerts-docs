import { defineConfig, devices } from '@playwright/test';

// Tests run against the local Jekyll build (`npm run build` first), served at the GitHub Pages path.
const PORT = Number(process.env.PORT ?? 4000);

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}/chat-alerts-docs/`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop-light', use: { ...devices['Desktop Chrome'], colorScheme: 'light' } },
    { name: 'desktop-dark', use: { ...devices['Desktop Chrome'], colorScheme: 'dark' } },
    { name: 'mobile', use: { ...devices['Pixel 7'], colorScheme: 'light' } },
  ],
  webServer: {
    command: 'node tests/serve.mjs',
    url: `http://localhost:${PORT}/chat-alerts-docs/`,
    reuseExistingServer: !process.env.CI,
    env: { PORT: String(PORT) },
  },
});
