import { defineConfig } from 'vite';
import  angular  from '@analogjs/vite-plugin-angular';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default defineConfig({
  plugins: [angular(), nodePolyfills() as any],
  resolve: {
    alias: {
      process: 'process/browser',
      buffer: 'buffer',
      util: 'util',
    },
  },
  define: {
    global: 'window',
  },
});
