module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  verbose: true,

  // 🎯 Code métier uniquement
  collectCoverageFrom: [
    'src/services/**/*.js',
    'src/core/**/*.js',
    'src/utils/**/*.js',
    'src/errors/api-error.js',
  ],

  // ❌ Infra / framework / abstractions
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/core/base-repository\\.js$', // abstraction DB
    '/src/errors/error-handler\\.js$', // middleware Express
  ],
};
