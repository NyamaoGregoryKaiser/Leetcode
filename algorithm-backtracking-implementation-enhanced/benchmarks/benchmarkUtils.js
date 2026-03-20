```javascript
/**
 * @fileoverview Utility functions for performance benchmarking.
 */

/**
 * Executes a function and measures its execution time.
 * @param {Function} func The function to benchmark.
 * @param {Array<any>} args The arguments to pass to the function.
 * @returns {{time: number, result: any}} An object containing the execution time in milliseconds and the function's result.
 */
function measureExecutionTime(func, ...args) {
    const start = process.hrtime.bigint();
    const result = func(...args);
    const end = process.hrtime.bigint();
    const time = Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
    return { time, result };
}

/**
 * Runs a benchmark for a given algorithm with various input sizes.
 * @param {string} name The name of the algorithm.
 * @param {Function} algorithmFn The algorithm function to benchmark.
 * @param {Array<Object>} testCases An array of objects, each with `name`, `input`, and `expectedResult` (optional).
 */
function runBenchmark(name, algorithmFn, testCases) {
    console.log(`\n--- Benchmarking: ${name} ---`);
    for (const testCase of testCases) {
        process.stdout.write(`  ${testCase.name} (input size: ${testCase.input.length || (testCase.input.n || 'N/A')}${testCase.input.k ? `, k=${testCase.input.k}` : ''})... `);
        const { time, result } = measureExecutionTime(
            algorithmFn,
            ...(Array.isArray(testCase.input) ? [testCase.input] : Object.values(testCase.input))
        );
        console.log(`${time.toFixed(4)} ms`);
    }
}

module.exports = {
    measureExecutionTime,
    runBenchmark
};
```