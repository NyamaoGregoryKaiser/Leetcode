```javascript
/**
 * @fileoverview Utility functions for array manipulation and comparison.
 */

/**
 * Deeply compares two arrays for equality.
 * This is useful for comparing arrays of arrays, which is common in algorithm results.
 * Handles primitive elements and nested arrays, but not objects within arrays.
 *
 * @param {Array<any>} arr1 The first array to compare.
 * @param {Array<any>} arr2 The second array to compare.
 * @returns {boolean} True if the arrays are deeply equal, false otherwise.
 */
function areArraysEqual(arr1, arr2) {
    if (arr1 === arr2) {
        return true;
    }
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return false;
    }
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            if (!areArraysEqual(arr1[i], arr2[i])) {
                return false;
            }
        } else if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Sorts an array of arrays. This is crucial for comparing results from algorithms
 * where the order of sub-arrays doesn't matter (e.g., permutations, combinations, subsets).
 *
 * @param {Array<Array<any>>} arrOfArrs The array of arrays to sort.
 * @returns {Array<Array<any>>} A new array with sub-arrays sorted lexicographically.
 */
function sortArrayOfArrays(arrOfArrs) {
    // Make a shallow copy to avoid modifying the original array reference if it's passed.
    const sortedArrs = arrOfArrs.map(subArr => [...subArr].sort()); // Sort each sub-array first for consistent comparison
    return sortedArrs.sort((a, b) => {
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] < b[i]) return -1;
            if (a[i] > b[i]) return 1;
        }
        return a.length - b.length;
    });
}

/**
 * Checks if two arrays of arrays are deeply equal, after sorting them lexicographically.
 * This is especially useful for problems like permutations, combinations, or subsets
 * where the order of the resulting sub-arrays in the output array does not matter.
 *
 * @param {Array<Array<any>>} arrOfArrs1 The first array of arrays.
 * @param {Array<Array<any>>} arrOfArrs2 The second array of arrays.
 * @returns {boolean} True if the sorted arrays of arrays are deeply equal, false otherwise.
 */
function areSortedArraysOfArraysEqual(arrOfArrs1, arrOfArrs2) {
    if (arrOfArrs1.length !== arrOfArrs2.length) {
        return false;
    }

    const sorted1 = sortArrayOfArrays(arrOfArrs1);
    const sorted2 = sortArrayOfArrays(arrOfArrs2);

    for (let i = 0; i < sorted1.length; i++) {
        if (!areArraysEqual(sorted1[i], sorted2[i])) {
            return false;
        }
    }
    return true;
}

/**
 * Converts a 2D array representing a Sudoku board to a string for easy comparison/logging.
 *
 * @param {Array<Array<string>>} board The Sudoku board.
 * @returns {string} A string representation of the board.
 */
function boardToString(board) {
    if (!board || board.length === 0) {
        return "Empty Board";
    }
    return board.map(row => row.join(' ')).join('\n');
}

module.exports = {
    areArraysEqual,
    sortArrayOfArrays,
    areSortedArraysOfArraysEqual,
    boardToString
};
```