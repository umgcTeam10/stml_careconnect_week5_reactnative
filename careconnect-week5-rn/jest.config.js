module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/index.ts',
  ],
  collectCoverage: true,
  coverageReporters: ['text', 'text-summary', 'lcov', 'json-summary'],
};
