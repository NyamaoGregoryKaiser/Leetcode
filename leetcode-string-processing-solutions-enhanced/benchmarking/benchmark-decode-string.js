```javascript
/**
 * @fileoverview Performance benchmark for Decode String algorithms.
 * Compares `decodeStringStack` and `decodeStringRecursive` using `perf_hooks`.
 */

const { performance } = require('perf_hooks');
const chalk = require('chalk'); // For colorful console output

const {
    decodeStringStack,
    decodeStringRecursive
} = require('../src/algorithms/decode-string');

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
    console.log(`  ${chalk.cyan(funcName)}: ${chalk.yellow(averageTime.toFixed(4))} ms (Decoded length: ${result.length})`);
    return averageTime;
}

/**
 * Generates an encoded string for benchmarking.
 * @param {number} depth Max nesting depth.
 * @param {number} repeat Max repetition factor at any level.
 * @param {number} baseLen Base string length inside brackets.
 * @returns {string} An encoded string.
 */
function generateEncodedString(depth, repeat, baseLen) {
    let currentStr = 'a'.repeat(baseLen);
    for (let i = 0; i < depth; i++) {
        const currentRepeat = Math.floor(Math.random() * (repeat - 1)) + 2; // Min 2, max `repeat`
        currentStr = `${currentRepeat}[${currentStr}]`;
        // Add some random letters outside brackets at each level for more complex string
        if (i < depth - 1) { // Don't add to outermost
             currentStr += String.fromCharCode(97 + (i % 26));
        }
    }
    return currentStr;
}


// --- Benchmark Configuration ---
const ITERATIONS = 1000; // Number of times to run each function for average calculation
const TEST_CONFIGS = [
    { name: 'Simple (low repeat, no nesting)', input: '10[abc]', expectedLen: 30 },
    { name: 'Moderate (medium repeat, shallow nesting)', input: '3[a2[bc]]ef', expectedLen: 'aaabcbc' }, // This gets complex, use custom string
    { name: 'Deeply Nested, Low Repeat', depth: 4, repeat: 2, baseLen: 2 },
    { name: 'Moderate Nesting, High Repeat', depth: 3, repeat: 10, baseLen: 3 },
    { name: 'High Repeat, Shallow Nesting', depth: 2, repeat: 50, baseLen: 1 },
    { name: 'Long Base String, No Nesting', input: `2[${'x'.repeat(500)}]`, expectedLen: 1000 },
];

console.log(chalk.bold.underline('\n--- Decode String Benchmarks ---'));
console.log(`Running each function ${chalk.magenta(ITERATIONS)} times for averaging.`);

TEST_CONFIGS.forEach(config => {
    let inputString;
    if (config.input) {
        inputString = config.input;
    } else {
        inputString = generateEncodedString(config.depth, config.repeat, config.baseLen);
    }

    console.log(chalk.blue(`\n--- Test Case: ${config.name} (Encoded Length: ${inputString.length}) ---`));

    // For better reporting, we'll calculate expected length on the fly for generated strings
    let decodedLengthDisplay = 'N/A';
    try {
        const stackResult = decodeStringStack(inputString);
        decodedLengthDisplay = stackResult.length;
    } catch (e) {
        decodedLengthDisplay = 'Error in decoding';
    }
    console.log(`  (Estimated Decoded Length: ${decodedLengthDisplay})`);

    benchmarkFunction(decodeStringStack, 'Stack-based (Optimal)', inputString, ITERATIONS);
    benchmarkFunction(decodeStringRecursive, 'Recursive', inputString, ITERATIONS);
});

console.log(chalk.bold.underline('\n--- Benchmarks Complete ---'));
```