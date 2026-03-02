module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/types.ts",
    "!src/utils/*.ts"
  ]
};