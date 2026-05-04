```javascript
/**
 * tests/testRunner.js
 *
 * A simple, lightweight test runner for Node.js environments.
 * It dynamically loads test files and executes their test suites.
 */

const fs = require('fs');
const path = require('path');

// Global counters for test results
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let currentSuite = '';

/**
 * Custom assertion function.
 * @param {any} actual The actual value.
 * @param {any} expected The expected value.
 * @param {string} message Description of the test.
 * @param {Function} comparator Optional custom comparison function.
 */
function assert(actual, expected, message, comparator = (a, b) => a === b) {
    totalTests++;
    let result = false;
    try {
        result = comparator(actual, expected);
    } catch (e) {
        console.error(`  ERROR in comparator for "${message}": ${e.message}`);
        result = false;
    }

    if (result) {
        passedTests++;
        process.stdout.write('.'); // Indicate a passed test
    } else {
        failedTests++;
        process.stdout.write('F'); // Indicate a failed test
        console.error(`\n   FAILED: [${currentSuite}] - ${message}`);
        console.error(`     Expected: ${JSON.stringify(expected)}`);
        console.error(`     Actual:   ${JSON.stringify(actual)}`);
    }
}

/**
 * Defines a test suite.
 * @param {string} name The name of the test suite.
 * @param {Function} tests A function containing individual test cases.
 */
function testSuite(name, tests) {
    currentSuite = name;
    console.log(`\nRunning Test Suite: ${name}`);
    tests();
    console.log(`\nFinished Suite: ${name}`);
}

/**
 * Runs all test files in the 'tests' directory.
 */
function runAllTests() {
    console.log("--- Starting All Tests ---");

    const testFilesDir = __dirname;
    const files = fs.readdirSync(testFilesDir);

    // Filter for files starting with 'test_' and ending with '.js'
    const testFiles = files.filter(file => file.startsWith('test_') && file.endsWith('.js'));

    for (const file of testFiles) {
        try {
            require(path.join(testFilesDir, file));
        } catch (error) {
            console.error(`\nError loading test file ${file}:`, error);
            failedTests++; // Consider loading errors as failures
        }
    }

    console.log("\n--- Test Summary ---");
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed:      ${passedTests}`);
    console.log(`Failed:      ${failedTests}`);

    if (failedTests > 0) {
        console.error("Some tests FAILED.");
        process.exit(1); // Exit with a non-zero code to indicate failure
    } else {
        console.log("All tests PASSED successfully!");
        process.exit(0); // Exit with zero for success
    }
}

// Export the assert and testSuite functions for use in individual test files
// and runAllTests for the main execution.
module.exports = {
    assert,
    testSuite,
    runAllTests,
};

// If this file is run directly, execute all tests.
if (require.main === module) {
    runAllTests();
}
```