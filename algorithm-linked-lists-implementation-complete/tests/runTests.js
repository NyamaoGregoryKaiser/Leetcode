```javascript
/**
 * @fileoverview A simple test runner for all linked list problem test files.
 */

console.log("------------------------------------------");
console.log("       Running Linked List Tests          ");
console.log("------------------------------------------\n");

// List of test files to run
const testFiles = [
    './test_Problem1_ReverseList.js',
    './test_Problem2_MergeTwoSortedLists.js',
    './test_Problem3_DetectCycle.js',
    './test_Problem4_FindKthFromEnd.js',
    './test_Problem5_RemoveNthFromEnd.js'
];

let totalTests = 0;
let failedTests = 0;

/**
 * Custom assertion function.
 * @param {boolean} condition The condition to assert.
 * @param {string} message The message to display if the assertion fails.
 */
global.assert = function(condition, message) {
    totalTests++;
    if (!condition) {
        failedTests++;
        console.error(`❌ FAILED: ${message}`);
    } else {
        // console.log(`✅ Passed`); // Optional: uncomment for verbose passing tests
    }
};

/**
 * Custom test suite function.
 * @param {string} name The name of the test suite.
 * @param {Function} suiteFn The function containing test cases.
 */
global.testSuite = function(name, suiteFn) {
    console.log(`\n--- Running Test Suite: ${name} ---`);
    suiteFn();
    console.log(`--- Finished Test Suite: ${name} ---`);
};

// Run each test file
for (const file of testFiles) {
    try {
        require(file);
    } catch (error) {
        console.error(`\nError running test file ${file}:`, error.message);
        console.error(error.stack);
        failedTests++; // Mark as failed due to error
    }
}

console.log("\n------------------------------------------");
if (failedTests === 0) {
    console.log(`🎉 All ${totalTests} tests passed successfully!`);
} else {
    console.log(`❗ ${failedTests} of ${totalTests} tests failed.`);
}
console.log("------------------------------------------");

// Exit with a non-zero code if any tests failed for CI/CD environments
process.exit(failedTests > 0 ? 1 : 0);
```