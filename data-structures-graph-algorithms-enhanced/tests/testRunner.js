```javascript
/**
 * testRunner.js
 * A simple, custom test runner for the project.
 * It dynamically loads all files ending with `.test.js` in the `tests/` directory
 * and executes their exported test functions.
 */

const fs = require('fs');
const path = require('path');

const testFilesDir = __dirname; // Current directory (tests/)

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

console.log('Starting Graph Algorithm Tests...\n');

// Custom assertion function
const assert = {
    /**
     * Asserts that two values are strictly equal.
     * @param {any} actual - The actual value.
     * @param {any} expected - The expected value.
     * @param {string} message - Description of the test.
     */
    strictEqual: (actual, expected, message) => {
        totalTests++;
        if (actual === expected) {
            pass(message);
        } else {
            fail(message, actual, expected);
        }
    },

    /**
     * Asserts that two arrays are deeply equal (order matters for now).
     * @param {Array} actual - The actual array.
     * @param {Array} expected - The expected array.
     * @param {string} message - Description of the test.
     */
    deepStrictEqual: (actual, expected, message) => {
        totalTests++;
        // Simple deep comparison for arrays of primitives
        if (Array.isArray(actual) && Array.isArray(expected) &&
            actual.length === expected.length &&
            actual.every((val, index) => val === expected[index])) {
            pass(message);
        } else {
            fail(message, actual, expected);
        }
    },

    /**
     * Asserts that a value is true.
     * @param {boolean} actual - The actual boolean value.
     * @param {string} message - Description of the test.
     */
    ok: (actual, message) => {
        totalTests++;
        if (actual) {
            pass(message);
        } else {
            fail(message, actual, true);
        }
    },

    /**
     * Asserts that a value is false.
     * @param {boolean} actual - The actual boolean value.
     * @param {string} message - Description of the test.
     */
    notOk: (actual, message) => {
        totalTests++;
        if (!actual) {
            pass(message);
        } else {
            fail(message, actual, false);
        }
    },

    /**
     * Asserts that two Maps are deeply equal.
     * @param {Map} actual - The actual Map.
     * @param {Map} expected - The expected Map.
     * @param {string} message - Description of the test.
     */
    deepStrictEqualMap: (actual, expected, message) => {
        totalTests++;
        let isEqual = true;
        if (actual.size !== expected.size) {
            isEqual = false;
        } else {
            for (let [key, val] of actual) {
                if (!expected.has(key) || expected.get(key) !== val) {
                    isEqual = false;
                    break;
                }
            }
        }
        if (isEqual) {
            pass(message);
        } else {
            fail(message, actual, expected);
        }
    }
};

function pass(message) {
    passedTests++;
    console.log(`  ✓ ${message}`);
}

function fail(message, actual, expected) {
    failedTests++;
    console.error(`  ✗ ${message}`);
    console.error(`    Expected: ${JSON.stringify(expected)}`);
    console.error(`    Actual:   ${JSON.stringify(actual)}`);
}

async function runTests() {
    const testFiles = fs.readdirSync(testFilesDir).filter(file => file.endsWith('.test.js'));

    for (const file of testFiles) {
        const filePath = path.join(testFilesDir, file);
        if (file === 'testRunner.js') continue; // Don't try to run the runner itself

        console.log(`\n--- Running tests from ${file} ---`);
        try {
            // Require the test file, which exports a function to run its tests
            const testModule = require(filePath);
            if (typeof testModule.run === 'function') {
                await testModule.run(assert); // Pass our custom assert object
            } else {
                console.warn(`Warning: ${file} does not export a 'run' function.`);
            }
        } catch (error) {
            console.error(`Error loading or running ${file}:`, error);
            failedTests++; // Count this as a failure, though it's an infrastructure issue
        }
    }

    console('\n--- Test Summary ---');
    console.log(`Total tests: ${totalTests}`);
    console.log(`Passed:      ${passedTests}`);
    console.log(`Failed:      ${failedTests}`);

    if (failedTests > 0) {
        console.error('\nSOME TESTS FAILED!');
        process.exit(1); // Exit with a non-zero code to indicate failure
    } else {
        console.log('\nALL TESTS PASSED!');
        process.exit(0); // Exit with success code
    }
}

runTests();
```