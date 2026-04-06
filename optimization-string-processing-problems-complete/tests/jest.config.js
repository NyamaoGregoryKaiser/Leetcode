```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@algorithms/(.*)$': '<rootDir>/src/algorithms/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^@benchmarks/(.*)$': '<rootDir>/benchmarks/$1',
  },
  modulePaths: [
    '<rootDir>'
  ],
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
```