module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["<rootDir>/tests/performance.test.ts"],
  // Disable coverage for performance tests as they might run slowly
  collectCoverage: false,
};