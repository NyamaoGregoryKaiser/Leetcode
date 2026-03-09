```javascript
/**
 * utils/sorterUtils.js
 *
 * This file contains utility functions commonly used across sorting algorithms
 * and their testing/benchmarking.
 */

/**
 * Swaps two elements in an array.
 * @param {Array<any>} arr The array.
 * @param {number} i Index of the first element.
 * @param {number} j Index of the second element.
 */
function swap(arr, i, j) {
    if (i === j) return; // No need to swap if indices are the same
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Checks if an array is sorted in ascending order.
 * @param {Array<number>} arr The array to check.
 * @returns {boolean} True if sorted, false otherwise.
 */
function isSorted(arr) {
    if (!arr || arr.length < 2) {
        return true; // Empty or single-element arrays are considered sorted
    }
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

/**
 * Validates if a custom comparison function is provided.
 * If not, returns a default ascending comparison.
 * @param {function(any, any): number} [compareFn] The custom comparison function.
 * @returns {function(any, any): number} The comparison function to use.
 */
function getComparator(compareFn) {
    if (typeof compareFn === 'function') {
        return compareFn;
    }
    // Default ascending comparison for numbers/strings
    return (a, b) => a - b;
}

/**
 * Partitions an array around a pivot element.
 * Elements less than the pivot are moved to the left, and elements greater are moved to the right.
 * Used primarily in Quick Sort.
 * @param {Array<number>} arr The array to partition.
 * @param {number} low The starting index of the sub-array.
 * @param {number} high The ending index of the sub-array.
 * @param {function(any, any): number} compareFn The comparison function.
 * @returns {number} The final index of the pivot element.
 */
function partition(arr, low, high, compareFn) {
    // Choose the last element as the pivot
    const pivot = arr[high];
    let i = low - 1; // Index of smaller element

    for (let j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (compareFn(arr[j], pivot) <= 0) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}

/**
 * Finds the index of the median of three elements (first, middle, last).
 * This helps choose a better pivot for Quick Sort to avoid worst-case scenarios.
 * @param {Array<number>} arr The array.
 * @param {number} low The starting index.
 * @param {number} mid The middle index.
 * @param {number} high The ending index.
 * @param {function(any, any): number} compareFn The comparison function.
 * @returns {number} The index of the median element.
 */
function medianOfThree(arr, low, mid, high, compareFn) {
    const a = arr[low];
    const b = arr[mid];
    const c = arr[high];

    if (compareFn(a, b) < 0) {
        if (compareFn(b, c) < 0) return mid; // a < b < c
        if (compareFn(a, c) < 0) return high; // a < c < b
        return low; // c < a < b
    } else {
        if (compareFn(a, c) < 0) return low; // b < a < c
        if (compareFn(b, c) < 0) return high; // b < c < a
        return mid; // c < b < a
    }
}


module.exports = {
    swap,
    isSorted,
    getComparator,
    partition,
    medianOfThree
};
```