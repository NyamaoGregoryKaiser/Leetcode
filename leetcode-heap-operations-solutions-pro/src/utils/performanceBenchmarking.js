```javascript
/**
 * performanceBenchmarking.js
 *
 * Provides a simple utility for measuring the execution time of functions.
 */

/**
 * Measures the execution time of a given function.
 * @param {function} func - The function to benchmark.
 * @param {Array} args - An array of arguments to pass to the function.
 * @returns {object} An object containing the result of the function and its execution time in milliseconds.
 */
function benchmark(func, args = []) {
    const start = process.hrtime.bigint(); // High-resolution real time for node.js
    const result = func(...args);
    const end = process.hrtime.bigint();

    // Convert nanoseconds to milliseconds
    const durationMs = Number(end - start) / 1_000_000;

    return {
        result: result,
        durationMs: durationMs
    };
}

/**
 * Runs a function multiple times and calculates average execution time.
 * @param {function} func - The function to benchmark.
 * @param {Array} args - An array of arguments to pass to the function.
 * @param {number} iterations - Number of times to run the function.
 * @returns {object} An object containing the function's last result and average execution time in milliseconds.
 */
function benchmarkAverage(func, args = [], iterations = 100) {
    let totalDurationMs = 0;
    let lastResult;

    for (let i = 0; i < iterations; i++) {
        const { result, durationMs } = benchmark(func, args);
        totalDurationMs += durationMs;
        lastResult = result; // Keep the last result
    }

    const averageDurationMs = totalDurationMs / iterations;

    return {
        result: lastResult,
        averageDurationMs: averageDurationMs,
        iterations: iterations
    };
}

module.exports = {
    benchmark,
    benchmarkAverage
};
```