```javascript
/**
 * utils/arrayGenerator.js
 *
 * This file provides utility functions for generating various types of arrays,
 * useful for testing and benchmarking sorting algorithms.
 */

/**
 * Generates an array of random integers.
 * @param {number} size The number of elements in the array.
 * @param {number} [min=0] The minimum value for elements.
 * @param {number} [max=1000] The maximum value for elements.
 * @returns {Array<number>} An array of random integers.
 */
function generateRandomArray(size, min = 0, max = 1000) {
    if (size <= 0) return [];
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return arr;
}

/**
 * Generates an array that is already sorted in ascending order.
 * @param {number} size The number of elements in the array.
 * @param {number} [start=0] The starting value.
 * @param {number} [step=1] The increment between elements.
 * @returns {Array<number>} A sorted array.
 */
function generateSortedArray(size, start = 0, step = 1) {
    if (size <= 0) return [];
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = start + i * step;
    }
    return arr;
}

/**
 * Generates an array sorted in descending (reverse) order.
 * @param {number} size The number of elements in the array.
 * @param {number} [start=0] The starting value (will be the largest).
 * @param {number} [step=1] The decrement between elements.
 * @returns {Array<number>} A reverse sorted array.
 */
function generateReverseSortedArray(size, start = 0, step = 1) {
    if (size <= 0) return [];
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = start - i * step;
    }
    return arr;
}

/**
 * Generates an array with many duplicate values.
 * @param {number} size The number of elements in the array.
 * @param {number} [numUnique=10] The number of unique values to choose from.
 * @param {number} [min=0] The minimum value for unique elements.
 * @returns {Array<number>} An array with many duplicates.
 */
function generateDuplicatesArray(size, numUnique = 10, min = 0) {
    if (size <= 0) return [];
    const arr = new Array(size);
    const uniqueValues = generateRandomArray(numUnique, min, min + numUnique * 2);
    for (let i = 0; i < size; i++) {
        arr[i] = uniqueValues[Math.floor(Math.random() * numUnique)];
    }
    return arr;
}

/**
 * Generates an array that is mostly sorted, but with a few elements out of place.
 * @param {number} size The number of elements in the array.
 * @param {number} [swaps=2] The number of random swaps to perform on a sorted array.
 * @returns {Array<number>} A nearly sorted array.
 */
function generateNearlySortedArray(size, swaps = 2) {
    if (size <= 0) return [];
    const arr = generateSortedArray(size);
    for (let i = 0; i < swaps; i++) {
        const idx1 = Math.floor(Math.random() * size);
        const idx2 = Math.floor(Math.random() * size);
        if (idx1 !== idx2) {
            const temp = arr[idx1];
            arr[idx1] = arr[idx2];
            arr[idx2] = temp;
        }
    }
    return arr;
}

/**
 * Generates an array with all elements being the same value.
 * @param {number} size The number of elements.
 * @param {number} [value=5] The value for all elements.
 * @returns {Array<number>} An array filled with a single value.
 */
function generateAllSameArray(size, value = 5) {
    if (size <= 0) return [];
    return new Array(size).fill(value);
}

module.exports = {
    generateRandomArray,
    generateSortedArray,
    generateReverseSortedArray,
    generateDuplicatesArray,
    generateNearlySortedArray,
    generateAllSameArray
};
```