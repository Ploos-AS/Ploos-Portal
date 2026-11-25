import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: '.',
  use: { baseURL: 'http://127.0.0.1:18095', browserName: 'chromium' },
  webServer: {
    command: 'HOST=127.0.0.1 PORT=18095 ORIGIN=http://127.0.0.1:18095 node build',
    cwd: new URL('..', import.meta.url).pathname,
    url: 'http://127.0.0.1:18095/healthz',
    reuseExistingServer: false,
    timeout: 30000
  }
});
