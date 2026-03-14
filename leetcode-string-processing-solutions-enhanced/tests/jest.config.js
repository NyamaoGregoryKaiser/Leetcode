```javascript
/**
 * @fileoverview Jest configuration file.
 * This file sets up Jest for running tests in the project.
 */

module.exports = {
    // Specify the test environment (Node.js for backend-like JS code)
    testEnvironment: 'node',

    // Define the directories where Jest should look for test files.
    // `__tests__` is a common convention, but we're using `tests/` explicitly.
    testMatch: [
        "<rootDir>/tests/**/*.test.js"
    ],

    // Indicate that Jest should collect coverage information.
    collectCoverage: true,

    // Specify which files to include/exclude from coverage collection.
    // We want to collect coverage for files in the `src/algorithms` and `src/utils` directories.
    collectCoverageFrom: [
        "src/algorithms/**/*.js",
        "src/utils/**/*.js"
    ],

    // Coverage reporters to use. `text` outputs to console, `lcov` generates a more detailed report.
    coverageReporters: ["text", "lcov"],

    // Minimum coverage thresholds to enforce. Jest will fail tests if these aren't met.
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90
        }
    },

    // Setup files to run before each test file.
    // Useful for global mocks, extensions, or environment setup.
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],

    // Module file extensions Jest should look for.
    moduleFileExtensions: ["js", "json", "node"],

    // Root directory for Jest.
    rootDir: "../" // Go up one level to the project root
};
```