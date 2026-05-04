```javascript
/**
 * src/utils/arrayUtils.js
 *
 * A collection of utility functions for array manipulation and comparison,
 * useful for testing and benchmarking.
 */

/**
 * Compares two arrays for deep equality.
 * Handles nested arrays and primitive values.
 *
 * @param {Array<any>} arr1 The first array.
 * @param {Array<any>} arr2 The second array.
 * @returns {boolean} True if arrays are deeply equal, false otherwise.
 */
function areArraysDeepEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1 == null || arr2 == null) return false;
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        const val1 = arr1[i];
        const val2 = arr2[i];

        if (Array.isArray(val1) && Array.isArray(val2)) {
            if (!areArraysDeepEqual(val1, val2)) {
                return false;
            }
        } else if (val1 !== val2) {
            return false;
        }
    }
    return true;
}

/**
 * Creates a shallow copy of an array.
 * Useful for functions that modify arrays in place, to preserve original data for tests.
 *
 * @param {Array<any>} arr The array to copy.
 * @returns {Array<any>} A new array with the same elements as `arr`.
 */
function shallowCopyArray(arr) {
    return [...arr];
}

/**
 * Generates a random array of integers within a specified range.
 *
 * @param {number} size The desired size of the array.
 * @param {number} min The minimum value for elements (inclusive).
 * @param {number} max The maximum value for elements (inclusive).
 * @returns {number[]} An array of random integers.
 */
function generateRandomArray(size, min, max) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

/**
 * Generates a random array suitable for `findDuplicate` problems.
 * Contains `n+1` numbers in range `[1, n]` with exactly one duplicate.
 *
 * @param {number} n The upper bound for numbers and `n` in `n+1` length.
 * @returns {number[]} An array with a single duplicate.
 */
function generateArrayWithOneDuplicate(n) {
    const arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(i);
    }
    // Add a duplicate of a random number from 1 to n
    const duplicateValue = Math.floor(Math.random() * n) + 1;
    arr.push(duplicateValue);

    // Shuffle the array to randomize position of duplicate
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Checks if an array is sorted in non-decreasing order.
 *
 * @param {Array<number>} arr The array to check.
 * @returns {boolean} True if sorted, false otherwise.
 */
function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

module.exports = {
    areArraysDeepEqual,
    shallowCopyArray,
    generateRandomArray,
    generateArrayWithOneDuplicate,
    isSorted,
};
```