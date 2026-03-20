```javascript
/**
 * @fileoverview
 * A simple, custom test runner for the project.
 * It discovers and runs test files ending with `.test.js` in the `tests/` directory.
 */

const fs = require('fs');
const path = require('path');

const testFilesDir = __dirname; // Current directory is `tests/`

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

/**
 * A minimalistic assertion function for testing.
 * @param {boolean} condition The condition to assert.
 * @param {string} message The message to display if the assertion fails.
 */
function assert(condition, message) {
    totalTests++;
    if (condition) {
        passedTests++;
        // console.log(`  ✓ ${message}`);
    } else {
        failedTests++;
        console.error(`  ✗ ${message}`);
    }
}

/**
 * Executes a test suite function.
 * @param {string} name The name of the test suite.
 * @param {Function} testSuiteFn The function containing the test cases.
 */
function testSuite(name, testSuiteFn) {
    console.log(`\n--- ${name} ---`);
    testSuiteFn();
}

/**
 * Runs all test files in the `tests/` directory.
 */
function runAllTests() {
    console.log("======================================");
    console.log("         Running All Tests            ");
    console.log("======================================");

    const testFiles = fs.readdirSync(testFilesDir)
        .filter(file => file.endsWith('.test.js') && file !== 'testRunner.js');

    testFiles.forEach(file => {
        const filePath = path.join(testFilesDir, file);
        // Clear module cache to allow rerunning tests if needed (e.g., in a watch mode)
        delete require.cache[require.resolve(filePath)];
        try {
            require(filePath);
        } catch (error) {
            console.error(`\nError loading/running test file ${file}:`, error);
            failedTests++; // Count module load error as a test failure
        }
    });

    console.log("\n======================================");
    console.log("          Test Summary                ");
    console.log("======================================");
    console.log(`Total Test Suites: ${testFiles.length}`);
    console.log(`Total Assertions: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);
    console.log("======================================");

    if (failedTests > 0) {
        process.exit(1); // Exit with a non-zero code to indicate failure
    } else {
        process.exit(0); // Exit with zero to indicate success
    }
}

// Make assert and testSuite globally available to test files
global.assert = assert;
global.testSuite = testSuite;

// Run the tests when this script is executed
runAllTests();
```