```javascript
/**
 * @fileoverview Performance benchmark for Anagram Grouper algorithms.
 * Compares `groupAnagramsSortingKey` and `groupAnagramsCharCountKey` using `perf_hooks`.
 */

const { performance } = require('perf_hooks');
const chalk = require('chalk'); // For colorful console output

const {
    groupAnagramsSortingKey,
    groupAnagramsCharCountKey
} = require('../src/algorithms/anagram-grouper');

const { generateRandomString, generateRandomStringArray } = require('../src/utils/string-helpers');

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
    console.log(`  ${chalk.cyan(funcName)}: ${chalk.yellow(averageTime.toFixed(4))} ms (Groups found: ${result.length})`);
    return averageTime;
}

/**
 * Generates an array of strings suitable for anagram grouping.
 * Allows controlling the number of actual anagram groups.
 * @param {number} numStrings Total number of strings to generate.
 * @param {number} maxLen Maximum length of each string.
 * @param {number} numGroups Desired number of distinct anagram groups.
 * @returns {string[]} Array of strings.
 */
function generateAnagramTestData(numStrings, maxLen, numGroups) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const baseStrings = [];
    for (let i = 0; i < numGroups; i++) {
        const len = Math.max(1, Math.floor(Math.random() * maxLen) + 1);
        let base = '';
        for (let j = 0; j < len; j++) {
            base += chars[Math.floor(Math.random() * chars.length)];
        }
        baseStrings.push(base);
    }

    const result = [];
    for (let i = 0; i < numStrings; i++) {
        const base = baseStrings[i % numGroups];
        // Shuffle the base string to create an anagram
        const shuffled = base.split('').sort(() => 0.5 - Math.random()).join('');
        result.push(shuffled);
    }
    // Shuffle the final array to mix up the groups
    return result.sort(() => 0.5 - Math.random());
}

// --- Benchmark Configuration ---
const ITERATIONS = 100; // Number of times to run each function for average calculation
const TEST_CONFIGS = [
    { name: 'Small set, few groups', numStrings: 50, maxLen: 10, numGroups: 5 },
    { name: 'Medium set, moderate groups', numStrings: 500, maxLen: 15, numGroups: 50 },
    { name: 'Large set, many groups (mostly unique)', numStrings: 1000, maxLen: 20, numGroups: 800 },
    { name: 'Large set, few groups (many anagrams)', numStrings: 1000, maxLen: 20, numGroups: 10 },
    { name: 'Very long strings, medium set', numStrings: 100, maxLen: 100, numGroups: 20 },
    { name: 'All unique strings', numStrings: 200, maxLen: 10, numGroups: 200 },
];

console.log(chalk.bold.underline('\n--- Anagram Grouper Benchmarks ---'));
console.log(`Running each function ${chalk.magenta(ITERATIONS)} times for averaging.`);

TEST_CONFIGS.forEach(config => {
    const testStrings = generateAnagramTestData(config.numStrings, config.maxLen, config.numGroups);

    console.log(chalk.blue(`\n--- Test Case: ${config.name} (Strings: ${config.numStrings}, Max Length: ${config.maxLen}, Expected Groups: ${config.numGroups}) ---`));

    benchmarkFunction(groupAnagramsSortingKey, 'Sorting Key (N*KlogK)', testStrings, ITERATIONS);
    benchmarkFunction(groupAnagramsCharCountKey, 'Char Count Key (N*K)', testStrings, ITERATIONS);
});

console.log(chalk.bold.underline('\n--- Benchmarks Complete ---'));
```