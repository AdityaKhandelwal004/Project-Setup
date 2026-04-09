/** @type {import('jest').Config} */
const config = {
  verbose: true,
  watchPathIgnorePatterns: [
    'node_modules',
    'migrations',
    'mytests',
    'createFiles.js',
    'dist',
    'jest.config.js',
    '.scannerwork',
    '.eslintrc.js',
    '__tests__',
    '__snapshots__',
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    'migrations',
    'mytests',
    'createFiles.js',
    'dist',
    'jest.config.js',
    '.scannerwork',
    '.eslintrc.js',
    'src/app.js',
  ],
  globalSetup: './tests/init.js',
  globalTeardown: './tests/teardown.js',
  injectGlobals: true,
  testTimeout: 70000,
};

module.exports = config;
