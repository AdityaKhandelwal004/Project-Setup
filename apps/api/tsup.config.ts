import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/app.ts'],
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  target: 'node18',
  platform: 'node',
  external: [
    // Node.js built-ins that should not be bundled
    'util',
    'fs',
    'path',
    'crypto',
    'os',
    'events',
    'stream',
    'buffer',
    'url',
    'querystring',
    'http',
    'https',
    'net',
    'tls',
    'zlib',
    'child_process',
    'readline',
    'dns',
    'cluster',
    'worker_threads',
    // Database and other native modules
    'pg-native',
    'sqlite3',
    'mysql',
    'mysql2',
    'oracledb',
    'mssql',
    // Problematic packages that should remain external
    'object-inspect',
    'side-channel',
    'has',
    'get-intrinsic',
    'call-bind',
    'define-properties',
    'es-abstract',
    'function-bind'
  ],
  bundle: true,
  splitting: false,
  clean: true,
  minify: false,
  sourcemap: true,
  esbuildOptions(options) {
    // Ensure proper handling of imports
    options.resolveExtensions = ['.ts', '.js', '.mjs', '.json']
    // Additional configuration to handle Node.js built-ins
    options.packages = 'external'
  }
})