import {defineConfig} from 'cypress';
import {initPlugin} from 'cypress-plugin-snapshots/plugin';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      initPlugin(on, config);
      return config;
    },
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
  },
});
