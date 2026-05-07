```javascript
/**
 * Helper utility functions for array manipulations.
 */

/**
 * Swaps two elements in an array in-place.
 * @param {Array<any>} arr The array.
 * @param {number} i Index of the first element.
 * @param {number} j Index of the second element.
 */
function swap(arr, i, j) {
    if (i < 0 || i >= arr.length || j < 0 || j >= arr.length) {
        throw new Error("Swap indices are out of bounds.");
    }
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Reverses a portion of an array in-place.
 * @param {Array<any>} arr The array to modify.
 * @param {number} start The starting index (inclusive).
 * @param {number} end The ending index (inclusive).
 */
function reverse(arr, start, end) {
    if (start < 0 || end >= arr.length || start > end) {
        // Handle invalid ranges gracefully, e.g., do nothing or throw error.
        // For array rotation, we usually ensure valid ranges.
        return;
    }
    while (start < end) {
        swap(arr, start, end);
        start++;
        end--;
    }
}

/**
 * Generates an array of `n` random integers between `min` and `max`.
 * @param {number} n The number of elements to generate.
 * @param {number} min The minimum value (inclusive).
 * @param {number} max The maximum value (inclusive).
 * @returns {Array<number>} An array of random integers.
 */
function generateRandomArray(n, min, max) {
    if (n < 0) throw new Error("Array length cannot be negative.");
    if (min > max) throw new Error("Min value cannot be greater than max value.");

    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}


module.exports = {
    swap,
    reverse,
    generateRandomArray,
};
```