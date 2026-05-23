```javascript
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  // To ensure the performance tests run sequentially and don't interfere with each other
  // and to avoid issues with performance.now() if Jest is parallelizing.
  testMatch: [
    "<rootDir>/tests/**/*.test.js"
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/tests/",
    "/src/utils/performanceMonitor.js", // Not meant for coverage itself
    "/src/algorithms/bruteForceSolutions.js" // Not the main focus for coverage
  ]
};
```