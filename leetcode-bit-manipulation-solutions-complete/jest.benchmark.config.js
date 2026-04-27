```javascript
// jest.benchmark.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["<rootDir>/tests/performance/**/*.test.ts"], // Only run benchmark tests
  verbose: true, // Show individual test results
  silent: false, // Don't suppress console output for benchmarks
  logHeapUsage: true, // Log heap usage during tests
};
```