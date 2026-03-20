/**
 * @fileoverview Test suite for the core Binary Search implementations.
 */

const { findTargetIterative, findTargetRecursive } = require('../../src/algorithms/binarySearchCore');
const { generateSortedArray } = require('../../src/algorithms/utils/arrayUtils');

module.exports = {
    /**
     * Test case for findTargetIterative with a target found in the middle.
     * @param {function} assert The assertion function.
     */
    testIterativeTargetInMiddle: (assert) => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        assert(findTargetIterative(arr, 7) === 3, 'Iterative: Target 7 should be at index 3');
    },

    /**
     * Test case for findTargetIterative with a target found at the beginning.
     * @param {function} assert The assertion function.
     */
    testIterativeTargetAtBeginning: (assert) => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        assert(findTargetIterative(arr, 1) === 0, 'Iterative: Target 1 should be at index 0');
    },

    /**
     * Test case for findTargetIterative with a target found at the end.
     * @param {function} assert The assertion function.
     */
    testIterativeTargetAtEnd: (assert) => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        assert(findTargetIterative(arr, 13) === 6, 'Iterative: Target 13 should be at index 6');
    },

    /**
     * Test case for findTargetIterative with a target not found.
     * @param {function} assert The assertion function.
     */
    testIterativeTargetNotFound: (assert) => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        assert(findTargetIterative(arr, 4) === -1, 'Iterative: Target 4 should not be found (-1)');
    },

    /**
     * Test case for findTargetIterative with an empty array.
     * @param {function} assert The assertion function.
     */
    testIterativeEmptyArray: (assert) => {
        const arr = [];
        assert(findTargetIterative(arr, 5) === -1, 'Iterative: Empty array should return -1');
    },

    /**
     * Test case for findTargetIterative with a single-element array (found).
     * @param {function} assert The assertion function.
     */
    testIterativeSingleElementArrayFound: (assert) => {
        const arr = [42];
        assert(findTargetIterative(arr, 42) === 0, 'Iterative: Single element array (found)');
    },

    /**
     * Test case for findTargetIterative with a single-element array (not found).
     * @param {function} assert The assertion function.
     */
    testIterativeSingleElementArrayNotFound: (assert) => {
        const arr = [42];
        assert(findTargetIterative(arr, 100) === -1, 'Iterative: Single element array (not found)');
    },

    /**
     * Test case for findTargetIterative with an even-length array.
     * @param {function} assert The assertion function.
     */
    testIterativeEvenLengthArray: (assert) => {
        const arr = [2, 4, 6, 8, 10, 12];
        assert(findTargetIterative(arr, 8) === 3, 'Iterative: Even length array (target 8)');
        assert(findTargetIterative(arr, 1) === -1, 'Iterative: Even length array (target 1, not found)');
    },

    /**
     * Test case for findTargetIterative with duplicate elements.
     * @param {function} assert The assertion function.
     */
    testIterativeWithDuplicates: (assert) => {
        const arr = [1, 2, 2, 2, 3, 4, 5];
        // For general binary search, any valid index is fine.
        const result = findTargetIterative(arr, 2);
        assert(result >= 1 && result <= 3, 'Iterative: Duplicates, target 2 should be at index 1, 2, or 3');
    },

    /**
     * Test case for findTargetIterative with large array.
     * @param {function} assert The assertion function.
     */
    testIterativeLargeArray: (assert) => {
        const size = 10000;
        const arr = generateSortedArray(size);
        const target = arr[Math.floor(size / 2)]; // Target in middle
        assert(findTargetIterative(arr, target) === Math.floor(size / 2), `Iterative: Large array, target ${target} should be found`);

        const nonExistentTarget = -100; // Assuming -100 is outside range
        assert(findTargetIterative(arr, nonExistentTarget) === -1, 'Iterative: Large array, non-existent target');
    },

    /**
     * Test case for findTargetRecursive with a target found in the middle.
     * @param {function} assert The assertion function.
     */
    testRecursiveTargetInMiddle: (assert) => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        assert(findTargetRecursive(arr, 7) === 3, 'Recursive: Target 7 should be at index 3');
    },

    /**
     * Test case for findTargetRecursive with a target found at the beginning.
     * @param {function} assert The assertion function.
     */
    testRecursiveTargetAtBeginning: (assert) => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        assert(findTargetRecursive(arr, 1) === 0, 'Recursive: Target 1 should be at index 0');
    },

    /**
     * Test case for findTargetRecursive with a target found at the end.
     * @param {function} assert The assertion function.
     */
    testRecursiveTargetAtEnd: (assert) => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        assert(findTargetRecursive(arr, 13) === 6, 'Recursive: Target 13 should be at index 6');
    },

    /**
     * Test case for findTargetRecursive with a target not found.
     * @param {function} assert The assertion function.
     */
    testRecursiveTargetNotFound: (assert) => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        assert(findTargetRecursive(arr, 4) === -1, 'Recursive: Target 4 should not be found (-1)');
    },

    /**
     * Test case for findTargetRecursive with an empty array.
     * @param {function} assert The assertion function.
     */
    testRecursiveEmptyArray: (assert) => {
        const arr = [];
        assert(findTargetRecursive(arr, 5) === -1, 'Recursive: Empty array should return -1');
    },

    /**
     * Test case for findTargetRecursive with a single-element array (found).
     * @param {function} assert The assertion function.
     */
    testRecursiveSingleElementArrayFound: (assert) => {
        const arr = [42];
        assert(findTargetRecursive(arr, 42) === 0, 'Recursive: Single element array (found)');
    },

    /**
     * Test case for findTargetRecursive with a single-element array (not found).
     * @param {function} assert The assertion function.
     */
    testRecursiveSingleElementArrayNotFound: (assert) => {
        const arr = [42];
        assert(findTargetRecursive(arr, 100) === -1, 'Recursive: Single element array (not found)');
    },

    /**
     * Test case for findTargetRecursive with an even-length array.
     * @param {function} assert The assertion function.
     */
    testRecursiveEvenLengthArray: (assert) => {
        const arr = [2, 4, 6, 8, 10, 12];
        assert(findTargetRecursive(arr, 8) === 3, 'Recursive: Even length array (target 8)');
        assert(findTargetRecursive(arr, 1) === -1, 'Recursive: Even length array (target 1, not found)');
    },

    /**
     * Test case for findTargetRecursive with duplicate elements.
     * @param {function} assert The assertion function.
     */
    testRecursiveWithDuplicates: (assert) => {
        const arr = [1, 2, 2, 2, 3, 4, 5];
        // For general binary search, any valid index is fine.
        const result = findTargetRecursive(arr, 2);
        assert(result >= 1 && result <= 3, 'Recursive: Duplicates, target 2 should be at index 1, 2, or 3');
    },

    /**
     * Test case for findTargetRecursive with large array.
     * Note: For very large arrays, recursive might hit stack limits in some environments.
     * @param {function} assert The assertion function.
     */
    testRecursiveLargeArray: (assert) => {
        const size = 10000;
        const arr = generateSortedArray(size);
        const target = arr[Math.floor(size / 2)]; // Target in middle
        assert(findTargetRecursive(arr, target) === Math.floor(size / 2), `Recursive: Large array, target ${target} should be found`);

        const nonExistentTarget = -100; // Assuming -100 is outside range
        assert(findTargetRecursive(arr, nonExistentTarget) === -1, 'Recursive: Large array, non-existent target');
    }
};