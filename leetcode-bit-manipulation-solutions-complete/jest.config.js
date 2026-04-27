```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  setupFilesAfterEnv: [], // No specific setup needed for general tests
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts", // If you have an entry file you don't need to cover
    "!src/utils/binaryUtils.ts" // Helper not core algorithm
  ],
};
```