/**
 * @fileoverview Test suite for Problem 5: Find First and Last Position of Element in Sorted Array.
 */

const { findFirstAndLastPosition, findFirstOccurrence, findLastOccurrence } = require('../../src/algorithms/problems/problem5_findRange');

module.exports = {
    // --- Tests for findFirstAndLastPosition ---
    /**
     * Test case: Target found multiple times in the middle.
     * @param {function} assert The assertion function.
     */
    testFindFirstAndLastPositionBasic: (assert) => {
        const nums = [5, 7, 7, 8, 8, 10];
        assert(JSON.stringify(findFirstAndLastPosition(nums, 8)) === JSON.stringify([3, 4]), 'Target 8 range should be [3, 4]');
    },

    /**
     * Test case: Target found multiple times at the beginning.
     * @param {function} assert The assertion function.
     */
    testFindFirstAndLastPositionBeginning: (assert) => {
        const nums = [1, 1, 2, 3, 4];
        assert(JSON.stringify(findFirstAndLastPosition(nums, 1)) === JSON.stringify([0, 1]), 'Target 1 range should be [0, 1]');
    },

    /**
     * Test case: Target found multiple times at the end.
     * @param {function} assert The assertion function.
     */
    testFindFirstAndLastPositionEnd: (assert) => {
        const nums = [1, 2, 3, 5, 5];
        assert(JSON.stringify(findFirstAndLastPosition(nums, 5)) === JSON.stringify([3, 4]), 'Target 5 range should be [3, 4]');
    },

    /**
     * Test case: Target found once.
     * @param {function} assert The assertion function.
     */
    testFindFirstAndLastPositionSingle: (assert) => {
        const nums = [5, 7, 7, 8, 8, 10];
        assert(JSON.stringify(findFirstAndLastPosition(nums, 10)) === JSON.stringify([5, 5]), 'Target 10 range should be [5, 5]');
    },

    /**
     * Test case: Target not found.
     * @param {function} assert The assertion function.
     */
    testFindFirstAndLastPositionNotFound: (assert) => {
        const nums = [5, 7, 7, 8, 8, 10];
        assert(JSON.stringify(findFirstAndLastPosition(nums, 6)) === JSON.stringify([-1, -1]), 'Target 6 not found, should be [-1, -1]');
    },

    /**
     * Test case: Empty array.
     * @param {function} assert The assertion function.
     */
    testFindFirstAndLastPositionEmpty: (assert) => {
        const nums = [];
        assert(JSON.stringify(findFirstAndLastPosition(nums, 0)) === JSON.stringify([-1, -1]), 'Empty array should return [-1, -1]');
    },

    /**
     * Test case: Single element array (found).
     * @param {function} assert The assertion function.
     */
    testFindFirstAndLastPositionSingleElementFound: (assert) => {
        const nums = [42];
        assert(JSON.stringify(findFirstAndLastPosition(nums, 42)) === JSON.stringify([0, 0]), 'Single element array (found)');
    },

    /**
     * Test case: Single element array (not found).
     * @param {function} assert The assertion function.
     */
    testFindFirstAndLastPositionSingleElementNotFound: (assert) => {
        const nums = [42];
        assert(JSON.stringify(findFirstAndLastPosition(nums, 100)) === JSON.stringify([-1, -1]), 'Single element array (not found)');
    },

    /**
     * Test case: All elements are the same.
     * @param {function} assert The assertion function.
     */
    testFindFirstAndLastPositionAllSame: (assert) => {
        const nums = [3, 3, 3, 3, 3];
        assert(JSON.stringify(findFirstAndLastPosition(nums, 3)) === JSON.stringify([0, 4]), 'All elements same, target 3 range should be [0, 4]');
    },

    // --- Tests for findFirstOccurrence (used internally, but good to test standalone) ---
    /**
     * Test case: First occurrence with duplicates.
     * @param {function} assert The assertion function.
     */
    testFirstOccurrenceWithDuplicates: (assert) => {
        const nums = [1, 2, 2, 2, 3, 4, 5];
        assert(findFirstOccurrence(nums, 2) === 1, 'First occurrence of 2 should be at index 1');
    },

    /**
     * Test case: First occurrence not found.
     * @param {function} assert The assertion function.
     */
    testFirstOccurrenceNotFound: (assert) => {
        const nums = [1, 2, 3];
        assert(findFirstOccurrence(nums, 4) === -1, 'First occurrence of 4 should be -1');
    },

    // --- Tests for findLastOccurrence (used internally, but good to test standalone) ---
    /**
     * Test case: Last occurrence with duplicates.
     * @param {function} assert The assertion function.
     */
    testLastOccurrenceWithDuplicates: (assert) => {
        const nums = [1, 2, 2, 2, 3, 4, 5];
        assert(findLastOccurrence(nums, 2) === 3, 'Last occurrence of 2 should be at index 3');
    },

    /**
     * Test case: Last occurrence not found.
     * @param {function} assert The assertion function.
     */
    testLastOccurrenceNotFound: (assert) => {
        const nums = [1, 2, 3];
        assert(findLastOccurrence(nums, 4) === -1, 'Last occurrence of 4 should be -1');
    },
};