```javascript
/**
 * @fileoverview A simple test runner for all the algorithm problems.
 * It imports test files and runs their functions.
 */

const fs = require('fs');
const path = require('path');

const testFiles = [
    'TraversalBasics.test.js',
    'LevelOrderTraversal.test.js',
    'ZigzagLevelOrder.test.js',
    'MaxDepth.test.js',
    'PathSumIII.test.js'
];

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

/**
 * Basic assertion function.
 * @param {*} actual The actual value.
 * @param {*} expected The expected value.
 * @param {string} message Description of the test.
 */
function assert(actual, expected, message) {
    totalTests++;
    const areEqual = JSON.stringify(actual) === JSON.stringify(expected); // Deep equality check for arrays/objects
    if (areEqual) {
        passedTests++;
        console.log(`  ✓ ${message}`);
    } else {
        failedTests++;
        console.error(`  ✗ ${message}`);
        console.error(`    Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(actual)}`);
    }
}

/**
 * Runs all tests from a given test module.
 * @param {string} filePath The path to the test file.
 */
function runTestFile(filePath) {
    const testModule = require(filePath);
    const fileName = path.basename(filePath);
    console.log(`\n--- Running tests for ${fileName} ---`);

    for (const testName in testModule) {
        if (typeof testModule[testName] === 'function') {
            try {
                testModule[testName](assert); // Pass the assert function to each test
            } catch (error) {
                totalTests++; // Even if it throws, count as a test attempted
                failedTests++;
                console.error(`  ✗ Test '${testName}' threw an error: ${error.message}`);
                console.error(error.stack);
            }
        }
    }
}

/**
 * Main function to run all tests.
 */
function runAllTests() {
    console.log("Starting Tree Traversal Tests...\n");

    for (const file of testFiles) {
        runTestFile(path.join(__dirname, file));
    }

    console.log("\n--- Test Summary ---");
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);

    if (failedTests > 0) {
        console.error("\nSome tests FAILED!");
        process.exit(1); // Exit with a non-zero code to indicate failure
    } else {
        console.log("\nAll tests PASSED successfully!");
        process.exit(0);
    }
}

// Run the tests when the script is executed
runAllTests();
```