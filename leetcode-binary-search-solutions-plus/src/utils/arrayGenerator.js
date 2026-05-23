```javascript
/**
 * src/utils/arrayGenerator.js
 *
 * This module provides helper functions to generate various types of arrays
 * useful for testing and benchmarking binary search algorithms.
 */

/**
 * Generates a sorted array of unique numbers.
 * @param {number} size - The desired size of the array.
 * @param {number} minVal - The minimum value for elements.
 * @param {number} maxVal - The maximum value for elements.
 * @returns {number[]} A sorted array.
 */
function generateSortedArray(size, minVal = 0, maxVal = 1000) {
  if (size <= 0) return [];
  const arr = new Set();
  while (arr.size < size) {
    arr.add(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
  }
  return Array.from(arr).sort((a, b) => a - b);
}

/**
 * Generates a sorted array with potential duplicate numbers.
 * @param {number} size - The desired size of the array.
 * @param {number} minVal - The minimum value for elements.
 * @param {number} maxVal - The maximum value for elements.
 * @param {number} duplicateChance - Probability (0-1) for an element to be a duplicate of the previous.
 * @returns {number[]} A sorted array with duplicates.
 */
function generateSortedArrayWithDuplicates(size, minVal = 0, maxVal = 100, duplicateChance = 0.3) {
  if (size <= 0) return [];
  const arr = [];
  let lastVal = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
  arr.push(lastVal);

  for (let i = 1; i < size; i++) {
    if (Math.random() < duplicateChance && arr.length > 0) {
      arr.push(lastVal); // Add a duplicate of the last value
    } else {
      lastVal = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      arr.push(lastVal);
    }
  }
  return arr.sort((a, b) => a - b);
}

/**
 * Generates a sorted array with all elements being the same.
 * @param {number} size - The desired size of the array.
 * @param {number} value - The value for all elements.
 * @returns {number[]} An array filled with the same value.
 */
function generateHomogeneousArray(size, value = 5) {
  if (size <= 0) return [];
  return Array(size).fill(value);
}


/**
 * Generates a rotated sorted array.
 * @param {number} size - The desired size of the array.
 * @param {number} minVal - The minimum value for elements.
 * @param {number} maxVal - The maximum value for elements.
 * @returns {number[]} A sorted array that has been rotated.
 */
function generateRotatedSortedArray(size, minVal = 0, maxVal = 1000) {
  if (size <= 0) return [];
  if (size === 1) return [Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal];

  const sortedArr = generateSortedArray(size, minVal, maxVal);
  const pivot = Math.floor(Math.random() * size); // Can be 0 to size-1
  return sortedArr.slice(pivot).concat(sortedArr.slice(0, pivot));
}

/**
 * Generates an array suitable for "Find Peak Element" problem.
 * Ensures nums[i] != nums[i+1].
 * @param {number} size - The desired size of the array.
 * @param {number} minVal - Minimum value for elements.
 * @param {number} maxVal - Maximum value for elements.
 * @returns {number[]} An array with elements where nums[i] != nums[i+1].
 */
function generatePeakArray(size, minVal = 0, maxVal = 1000) {
  if (size <= 0) return [];
  const arr = [];
  for (let i = 0; i < size; i++) {
    let num;
    do {
      num = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    } while (arr.length > 0 && num === arr[arr.length - 1]);
    arr.push(num);
  }
  return arr;
}

/**
 * Generates an array of pile sizes for the "Koko Eating Bananas" problem.
 * @param {number} size - The number of piles.
 * @param {number} minPileSize - Minimum size for a pile.
 * @param {number} maxPileSize - Maximum size for a pile.
 * @returns {number[]} An array of pile sizes.
 */
function generateBananaPiles(size, minPileSize = 1, maxPileSize = 100000) {
  if (size <= 0) return [];
  const piles = [];
  for (let i = 0; i < size; i++) {
    piles.push(Math.floor(Math.random() * (maxPileSize - minPileSize + 1)) + minPileSize);
  }
  return piles;
}

module.exports = {
  generateSortedArray,
  generateSortedArrayWithDuplicates,
  generateHomogeneousArray,
  generateRotatedSortedArray,
  generatePeakArray,
  generateBananaPiles,
};
```