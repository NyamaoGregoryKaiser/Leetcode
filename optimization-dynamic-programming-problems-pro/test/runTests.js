```javascript
/**
 * test/runTests.js
 *
 * This script serves as a simple test runner. It imports individual test files
 * for each DP problem and executes them. It uses a basic assertion mechanism.
 */

const assert = require('assert');

// Helper function for consistent test reporting
function runTest(testName, testFunction) {
    console.log(`\n--- Running Test Suite: ${testName} ---`);
    try {
        testFunction(assert);
        console.log(`--- Test Suite: ${testName} PASSED ---`);
    } catch (error) {
        console.error(`--- Test Suite: ${testName} FAILED ---`);
        console.error(error.message);
        process.exit(1); // Exit with error code if any test fails
    }
}

// Import and run tests for each problem
runTest('Fibonacci Number', require('./fibonacci.test'));
runTest('Climbing Stairs', require('./climbing_stairs.test'));
runTest('Longest Common Subsequence', require('./lcs.test'));
runTest('0/1 Knapsack Problem', require('./knapsack.test'));

console.log('\nAll test suites passed successfully!\n');
```