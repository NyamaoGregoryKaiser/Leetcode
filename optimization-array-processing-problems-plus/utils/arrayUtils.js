/**
 * @fileoverview Utility functions for array manipulation.
 * These helpers can be used across different problems or for testing/benchmarking.
 */

/**
 * Checks if two arrays are deeply equal.
 * This is useful for comparing arrays of primitives or arrays of arrays (like intervals).
 *
 * @param {Array<any>} arr1 The first array.
 * @param {Array<any>} arr2 The second array.
 * @returns {boolean} True if the arrays are deeply equal, false otherwise.
 */
function isEqualArrays(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (!arr1 || !arr2) return false;
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        const val1 = arr1[i];
        const val2 = arr2[i];

        if (Array.isArray(val1) && Array.isArray(val2)) {
            if (!isEqualArrays(val1, val2)) {
                return false;
            }
        } else if (val1 !== val2) {
            return false;
        }
    }
    return true;
}

/**
 * Generates a random array of integers within a specified range.
 *
 * @param {number} size The desired size of the array.
 * @param {number} min The minimum value for elements (inclusive).
 * @param {number} max The maximum value for elements (inclusive).
 * @returns {number[]} A new array filled with random integers.
 */
function generateRandomArray(size, min = -100, max = 100) {
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return arr;
}

/**
 * Generates a random array of intervals.
 *
 * @param {number} size The desired number of intervals.
 * @param {number} minStart The minimum value for interval start (inclusive).
 * @param {number} maxEnd The maximum value for interval end (inclusive).
 * @param {number} maxDuration Max length for an interval.
 * @returns {number[][]} An array of intervals, e.g., [[s1, e1], [s2, e2]].
 */
function generateRandomIntervals(size, minStart = 0, maxEnd = 1000, maxDuration = 100) {
    const intervals = [];
    for (let i = 0; i < size; i++) {
        const start = Math.floor(Math.random() * (maxEnd - minStart + 1)) + minStart;
        const end = start + Math.floor(Math.random() * maxDuration) + 1; // Ensure end > start
        intervals.push([start, end]);
    }
    return intervals;
}

module.exports = {
    isEqualArrays,
    generateRandomArray,
    generateRandomIntervals
};