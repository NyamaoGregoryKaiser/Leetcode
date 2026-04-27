/**
 * src/utils/helpers.js
 *
 * This file contains helper utilities that might be useful across different DP problem implementations
 * or for testing/benchmarking purposes.
 */

/**
 * Creates a 2D array (matrix) initialized with a given value.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 * @param {*} initialValue - The value to initialize each cell with.
 * @returns {Array<Array<*>>} A 2D array.
 */
function create2DArray(rows, cols, initialValue) {
    const matrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
        matrix[i] = new Array(cols).fill(initialValue);
    }
    return matrix;
}

/**
 * A simple assertion function for tests.
 * @param {boolean} condition - The condition to assert.
 * @param {string} message - The message to display if the assertion fails.
 */
function assert(condition, message) {
    if (!condition) {
        console.error(`Assertion Failed: ${message}`);
        process.exit(1); // Exit with an error code
    }
}

/**
 * Simple utility to measure execution time of a function.
 * @param {function} func - The function to measure.
 * @param {Array<*>} args - Arguments to pass to the function.
 * @returns {{time: number, result: *}} An object containing execution time in ms and the function result.
 */
function measureExecutionTime(func, ...args) {
    const start = process.hrtime.bigint();
    const result = func(...args);
    const end = process.hrtime.bigint();
    const time = Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
    return { time, result };
}

module.exports = {
    create2DArray,
    assert,
    measureExecutionTime,
};