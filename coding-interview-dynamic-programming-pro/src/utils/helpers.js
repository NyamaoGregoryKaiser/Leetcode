/**
 * @fileoverview Helper utilities for the DP interview project.
 */

/**
 * Measures the execution time and memory usage of a function.
 * @param {Function} func The function to benchmark.
 * @param {Array<any>} args Arguments to pass to the function.
 * @param {string} name A descriptive name for the function being benchmarked.
 * @returns {object} An object containing execution time and memory usage.
 */
function benchmarkFunction(func, args, name = 'Function') {
    const startMemory = process.memoryUsage().heapUsed;
    const startTime = process.hrtime.bigint();

    const result = func(...args);

    const endTime = process.hrtime.bigint();
    const endMemory = process.memoryUsage().heapUsed;

    const timeInMs = Number(endTime - startTime) / 1_000_000; // Convert nanoseconds to milliseconds
    const memoryUsedInBytes = endMemory - startMemory;

    return {
        result,
        time: timeInMs,
        memory: memoryUsedInBytes,
        name: name
    };
}

/**
 * Formats a given number of bytes into a human-readable string (e.g., "1.23 MB").
 * @param {number} bytes The number of bytes.
 * @returns {string} Human-readable memory string.
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

module.exports = {
    benchmarkFunction,
    formatBytes,
};