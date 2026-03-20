/**
 * @fileoverview A script to dynamically run all test files in the 'test/algorithms' directory.
 * This provides a simple test runner using Node.js's built-in `assert` module.
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const testDir = path.join(__dirname, 'algorithms');

let totalTestsRun = 0;
let totalAssertions = 0;
let totalFailures = 0;

/**
 * Custom assert wrapper to count assertions and failures.
 * @param {boolean} condition The condition to assert.
 * @param {string} message The message to display if the assertion fails.
 */
function assert(condition, message = 'Assertion failed') {
    totalAssertions++;
    if (!condition) {
        totalFailures++;
        console.error(`❌ FAILED: ${message}`);
        throw new Error(message); // Re-throw to stop current test case
    }
}

/**
 * Runs a single test suite.
 * @param {string} testFilePath The path to the test file.
 * @returns {Promise<void>} A promise that resolves after the test suite runs.
 */
async function runTestSuite(testFilePath) {
    const testModuleName = path.basename(testFilePath);
    console.log(`\n--- Running ${testModuleName} ---`);

    try {
        const testModule = require(testFilePath);
        let testsInFile = 0;

        for (const testName in testModule) {
            if (typeof testModule[testName] === 'function' && testName.startsWith('test')) {
                testsInFile++;
                totalTestsRun++;
                const startTime = performance.now();
                try {
                    await testModule[testName](assert); // Pass the custom assert function
                    const endTime = performance.now();
                    console.log(`✅ ${testName} (${(endTime - startTime).toFixed(2)} ms)`);
                } catch (error) {
                    const endTime = performance.now();
                    console.error(`🚨 ${testName} FAILED (${(endTime - startTime).toFixed(2)} ms): ${error.message}`);
                    // totalFailures is already incremented by assert function
                }
            }
        }
        if (testsInFile === 0) {
            console.warn(`⚠️ No tests found starting with 'test' in ${testModuleName}`);
        }
    } catch (error) {
        console.error(`🚨 Error loading or running ${testModuleName}: ${error.message}`);
        totalFailures++; // Consider module loading error as a failure
    }
}

/**
 * Main function to discover and run all test files.
 */
async function runAllTests() {
    console.log("Starting all Binary Search tests...\n");
    const testFiles = fs.readdirSync(testDir).filter(file => file.endsWith('.js') && file.startsWith('test_'));

    for (const file of testFiles) {
        await runTestSuite(path.join(testDir, file));
    }

    console(`\n--- Test Summary ---`);
    console(`Total test suites: ${testFiles.length}`);
    console(`Total individual tests run: ${totalTestsRun}`);
    console(`Total assertions: ${totalAssertions}`);
    if (totalFailures === 0) {
        console(`🎉 All tests passed!`);
    } else {
        console(`🔥 ${totalFailures} test(s) failed.`);
        process.exit(1); // Exit with a non-zero code to indicate failure
    }
}

// Run the tests
runAllTests();