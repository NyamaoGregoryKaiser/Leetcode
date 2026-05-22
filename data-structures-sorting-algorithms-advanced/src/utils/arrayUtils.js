```javascript
/**
 * @fileoverview Utility functions for array manipulation.
 */

/**
 * Swaps two elements in an array.
 * @param {Array<number>} arr The array to modify.
 * @param {number} i The index of the first element.
 * @param {number} j The index of the second element.
 * @returns {void} The array is modified in-place.
 */
function swap(arr, i, j) {
  if (i < 0 || i >= arr.length || j < 0 || j >= arr.length) {
    throw new Error('Invalid indices for swap operation.');
  }
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * Generates an array of random integers.
 * @param {number} size The desired size of the array.
 * @param {number} min The minimum value for elements (inclusive).
 * @param {number} max The maximum value for elements (inclusive).
 * @returns {Array<number>} A new array filled with random integers.
 */
function generateRandomArray(size, min = 0, max = 1000) {
  if (size < 0) {
    throw new Error('Array size cannot be negative.');
  }
  if (min > max) {
    throw new Error('Min value cannot be greater than max value.');
  }
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return arr;
}

/**
 * Checks if an array is sorted in ascending or descending order.
 * @param {Array<number>} arr The array to check.
 * @param {boolean} [ascending=true] True for ascending order, false for descending.
 * @returns {boolean} True if the array is sorted as specified, false otherwise.
 */
function isSorted(arr, ascending = true) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  if (arr.length <= 1) {
    return true; // An empty or single-element array is always sorted.
  }

  for (let i = 0; i < arr.length - 1; i++) {
    if (ascending) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    } else {
      if (arr[i] < arr[i + 1]) {
        return false;
      }
    }
  }
  return true;
}

module.exports = {
  swap,
  generateRandomArray,
  isSorted,
};
```