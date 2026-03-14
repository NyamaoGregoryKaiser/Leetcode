```javascript
/**
 * @fileoverview Performance benchmark for Longest Common Prefix algorithms.
 * Compares `longestCommonPrefixVerticalScanning`, `longestCommonPrefixHorizontalScanning`,
 * and `longestCommonPrefixDivideAndConquer` using `perf_hooks`.
 */

const { performance } = require('perf_hooks');
const chalk = require('chalk'); // For colorful console output

const {
    longestCommonPrefixVerticalScanning,
    longestCommonPrefixHorizontalScanning,
    longestCommonPrefixDivideAndConquer
} = require('../src/algorithms/longest-common-prefix');

const { generateRandomStringArray, generateRandomString } = require('../src/utils/string-helpers');

// --- Helper Functions for Benchmarking ---

/**
 * Runs a given function multiple times and measures its average execution time.
 * @param {Function} func The function to benchmark.
 * @param {string} funcName The name of the function.
 * @param {*} input The input to pass to the function.
 * @param {number} iterations The number of times to run the function.
 */
function benchmarkFunction(func, funcName, input, iterations) {
    let totalTime = 0;
    let result;

    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        result = func(input);
        const end = performance.now();
        totalTime += (end - start);
    }

    const averageTime = totalTime / iterations;
    console.log(`  ${chalk.cyan(funcName)}: ${chalk.yellow(averageTime.toFixed(4))} ms (Result: "${result}")`);
    return averageTime;
}

// --- Benchmark Configuration ---
const ITERATIONS = 1000; // Number of times to run each function for average calculation
const TEST_CONFIGS = [
    { name: 'Small set, medium LCP', count: 10, minLen: 20, maxLen: 30, commonPrefixLen: 15 },
    { name: 'Medium set, medium LCP', count: 100, minLen: 20, maxLen: 30, commonPrefixLen: 15 },
    { name: 'Large set, short LCP', count: 1000, minLen: 50, maxLen: 100, commonPrefixLen: 5 },
    { name: 'Large set, long LCP', count: 100, minLen: 100, maxLen: 150, commonPrefixLen: 90 },
    { name: 'Large set, no LCP', count: 1000, minLen: 10, maxLen: 20, commonPrefixLen: 0 },
    { name: 'Large set, all identical', count: 500, minLen: 50, maxLen: 50, commonPrefixLen: 50 },
];

console.log(chalk.bold.underline('\n--- Longest Common Prefix Benchmarks ---'));
console.log(`Running each function ${chalk.magenta(ITERATIONS)} times for averaging.`);

TEST_CONFIGS.forEach(config => {
    // Generate a common prefix string
    const commonPrefix = generateRandomString(config.commonPrefixLen);
    const testStrings = [];

    for (let i = 0; i < config.count; i++) {
        let remainingLength = Math.max(0, Math.floor(Math.random() * (config.maxLen - commonPrefix.length - config.minLen + 1)) + config.minLen - commonPrefix.length);
        if (remainingLength < 0) remainingLength = 0; // Ensure non-negative remaining length
        testStrings.push(commonPrefix + generateRandomString(remainingLength));
    }

    // Special case: if commonPrefixLen is 0, ensure first char is different for most strings
    if (config.commonPrefixLen === 0) {
        for (let i = 0; i < testStrings.length; i++) {
            if (testStrings[i].length > 0) {
                // Ensure distinct first characters for different strings to make LCP truly ""
                // unless it's a very specific case of all starting with 'a' and then differing
                let uniqueChar = String.fromCharCode(97 + (i % 26)); // 'a', 'b', 'c', ...
                testStrings[i] = uniqueChar + testStrings[i].substring(1);
            }
        }
    } else if (config.name === 'Large set, all identical') {
        // Overwrite generated strings to make them all identical for this specific case
        const identicalString = generateRandomString(config.minLen);
        testStrings.fill(identicalString);
    }


    console.log(chalk.blue(`\n--- Test Case: ${config.name} (Strings: ${config.count}, Avg Length: ${Math.floor((config.minLen + config.maxLen) / 2)}, LCP Length: ${commonPrefix.length}) ---`));

    benchmarkFunction(longestCommonPrefixVerticalScanning, 'Vertical Scanning (Optimal)', testStrings, ITERATIONS);
    benchmarkFunction(longestCommonPrefixHorizontalScanning, 'Horizontal Scanning', testStrings, ITERATIONS);
    benchmarkFunction(longestCommonPrefixDivideAndConquer, 'Divide and Conquer', testStrings, ITERATIONS);
});

console.log(chalk.bold.underline('\n--- Benchmarks Complete ---'));
```