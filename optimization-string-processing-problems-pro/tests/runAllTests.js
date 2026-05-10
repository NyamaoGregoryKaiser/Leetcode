```javascript
/**
 * @fileoverview Script to run all test suites in the `tests` directory.
 */

const fs = require('fs');
const path = require('path');

const testFiles = [
    'longestPalindromicSubstring.test.js',
    'groupAnagrams.test.js',
    'kmpStringMatching.test.js',
    'minimumWindowSubstring.test.js'
];

let totalFailedSuites = 0;

console.log("Starting all test suites...\n");

for (const file of testFiles) {
    const filePath = path.join(__dirname, file);
    try {
        // Clear require cache to ensure each test file runs independently
        // and doesn't hold state from previous runs if modules were cached.
        // This is important for simple test runners like this one.
        delete require.cache[require.resolve(filePath)];
        require(filePath);
        if (process.exitCode === 1) { // Check if a test suite set exitCode to 1
            totalFailedSuites++;
            process.exitCode = 0; // Reset for next suite, will set final exitCode at the end
        }
    } catch (error) {
        console.error(`\n--- Error loading or running ${file} ---`);
        console.error(error);
        totalFailedSuites++;
    }
}

console.log("\n--- All Tests Completed ---");
if (totalFailedSuites > 0) {
    console.error(`\nTotal suites with failures: ${totalFailedSuites}`);
    process.exitCode = 1; // Indicate overall failure
} else {
    console.log("\nAll test suites passed successfully!");
    process.exitCode = 0; // Indicate overall success
}
```