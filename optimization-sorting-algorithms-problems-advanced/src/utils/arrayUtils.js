/**
 * src/utils/arrayUtils.js
 *
 * Contains utility functions for array manipulation.
 */

/**
 * Swaps two elements in an array.
 * @param {Array<any>} arr The array.
 * @param {number} i The index of the first element.
 * @param {number} j The index of the second element.
 */
function swap(arr, i, j) {
    if (i < 0 || i >= arr.length || j < 0 || j >= arr.length) {
        // console.warn(`Attempted swap with out-of-bounds index: i=${i}, j=${j}, length=${arr.length}`);
        return; // Or throw an error depending on desired behavior
    }
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Checks if an array is sorted in ascending order.
 * @param {Array<number>} arr The array to check.
 * @param {Function} [comparator] Optional custom comparator function (a, b) => { -1 | 0 | 1 }.
 * @returns {boolean} True if the array is sorted, false otherwise.
 */
function isSorted(arr, comparator = (a, b) => a - b) {
    if (!arr || arr.length <= 1) {
        return true;
    }
    for (let i = 0; i < arr.length - 1; i++) {
        if (comparator(arr[i], arr[i + 1]) > 0) {
            return false;
        }
    }
    return true;
}

/**
 * Generates an array of random integers.
 * @param {number} size The number of elements in the array.
 * @param {number} min The minimum value for elements (inclusive).
 * @param {number} max The maximum value for elements (inclusive).
 * @returns {Array<number>} An array of random integers.
 */
function generateRandomArray(size, min = 0, max = 100) {
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return arr;
}

/**
 * Creates a shuffled copy of an array.
 * @param {Array<any>} arr The array to shuffle.
 * @returns {Array<any>} A new shuffled array.
 */
function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


module.exports = {
    swap,
    isSorted,
    generateRandomArray,
    shuffleArray
};