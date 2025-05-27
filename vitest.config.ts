import { defineConfig } from 'vitest/config';
import { vitestSetupFilePath, getClarinetVitestsArgv } from '@hirosystems/clarinet-sdk/vitest';

export default defineConfig({
  test: {
    environment: 'clarinet',
    threads: true,
    setupFiles: [vitestSetupFilePath],
    environmentOptions: {
      clarinet: {
        ...getClarinetVitestsArgv(),
      },
    },
  },
});

