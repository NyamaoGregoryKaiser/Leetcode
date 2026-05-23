```javascript
/**
 * src/utils/performanceMonitor.js
 *
 * This module provides a simple utility for measuring the execution time of functions.
 * It's useful for benchmarking different algorithmic approaches.
 */

/**
 * Measures the execution time of a given function.
 * @param {function} func - The function to benchmark.
 * @param {Array<any>} args - An array of arguments to pass to the function.
 * @param {number} [iterations=1] - Number of times to run the function for averaging.
 * @returns {{timeMs: number, result: any}} An object containing the average execution time in milliseconds and the result of the last execution.
 */
function measurePerformance(func, args, iterations = 1) {
  if (typeof func !== 'function') {
    throw new Error('Expected a function to measure performance.');
  }
  if (iterations <= 0) {
    throw new Error('Iterations must be a positive number.');
  }

  let totalTime = 0;
  let result;

  for (let i = 0; i < iterations; i++) {
    const startTime = performance.now();
    result = func(...args);
    const endTime = performance.now();
    totalTime += (endTime - startTime);
  }

  return {
    timeMs: totalTime / iterations,
    result: result, // Return the result of the last execution
  };
}

module.exports = {
  measurePerformance,
};
```