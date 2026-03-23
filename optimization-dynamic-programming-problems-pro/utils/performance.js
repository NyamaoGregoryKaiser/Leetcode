```javascript
/**
 * utils/performance.js
 *
 * A simple utility to measure the execution time of a function.
 */

/**
 * Measures the execution time of a given function.
 *
 * @param {Function} func The function to benchmark.
 * @param {Array<any>} args An array of arguments to pass to the function.
 * @param {number} iterations The number of times to run the function for averaging.
 * @returns {number} The average execution time in milliseconds.
 */
function measurePerformance(func, args, iterations = 1) {
    if (iterations <= 0) {
        throw new Error("Iterations must be a positive number.");
    }

    let totalDuration = 0;

    for (let i = 0; i < iterations; i++) {
        const start = process.hrtime.bigint(); // High-resolution real time
        func(...args);
        const end = process.hrtime.bigint();
        totalDuration += Number(end - start); // Convert to nanoseconds
    }

    // Convert total nanoseconds to milliseconds and average
    return (totalDuration / iterations) / 1_000_000;
}

// Export the utility function
module.exports = {
    measurePerformance
};
```