```javascript
/**
 * runTests.js
 *
 * This script serves as a simple test runner for all algorithm test files
 * in the 'tests/' directory. It imports and executes each test module,
 * reporting success or failure.
 */

const fs = require('fs');
const path = require('path');

const testFiles = [
    'testNumberOfIslands.js',
    'testDijkstra.js',
    'testDetectCycleDirected.js',
    'testTopologicalSort.js'
];

async function runAllTests() {
    console.log("=======================================");
    console.log("        Running All Graph Algorithm Tests        ");
    console.log("=======================================\n");

    let totalTests = 0;
    let totalPasses = 0;
    let totalFailures = 0;

    for (const file of testFiles) {
        const filePath = path.join(__dirname, 'tests', file);
        console.log(`--- Running tests for: ${file} ---`);
        try {
            // Clear require cache to ensure fresh import for each test run if needed (not strictly necessary here but good practice)
            delete require.cache[require.resolve(filePath)];
            const testModule = require(filePath);
            if (typeof testModule.runTests === 'function') {
                const result = await testModule.runTests();
                totalTests += result.total;
                totalPasses += result.passed;
                totalFailures += result.failed;
            } else {
                console.error(`Error: ${file} does not export a 'runTests' function.`);
                totalFailures++; // Consider it a failure to run the tests
            }
        } catch (error) {
            console.error(`An error occurred while running tests in ${file}:`, error);
            totalFailures++;
        }
        console.log("-----------------------------------\n");
    }

    console.log("=======================================");
    console.log("        Overall Test Summary        ");
    console.log("=======================================\n");
    console.log(`Total Test Cases: ${totalTests}`);
    console.log(`Passed: ${totalPasses}`);
    console.log(`Failed: ${totalFailures}`);
    console.log("\n=======================================");

    if (totalFailures > 0) {
        process.exit(1); // Exit with a non-zero code to indicate failures
    } else {
        process.exit(0); // Exit with zero for success
    }
}

runAllTests();
```