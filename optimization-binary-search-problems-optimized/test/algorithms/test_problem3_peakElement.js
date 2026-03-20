/**
 * @fileoverview Test suite for Problem 3: Find Peak Element.
 */

const { findPeakElement } = require('../../src/algorithms/problems/problem3_peakElement');

module.exports = {
    /**
     * Test case: Basic peak in the middle.
     * @param {function} assert The assertion function.
     */
    testPeakElementBasic: (assert) => {
        const nums = [1, 2, 3, 1];
        assert(findPeakElement(nums) === 2, 'Peak in [1,2,3,1] should be at index 2 (value 3)');
    },

    /**
     * Test case: Peak at the beginning of the array.
     * @param {function} assert The assertion function.
     */
    testPeakElementAtBeginning: (assert) => {
        const nums = [3, 2, 1];
        assert(findPeakElement(nums) === 0, 'Peak in [3,2,1] should be at index 0 (value 3)');
    },

    /**
     * Test case: Peak at the end of the array.
     * @param {function} assert The assertion function.
     */
    testPeakElementAtEnd: (assert) => {
        const nums = [1, 2, 3, 4];
        assert(findPeakElement(nums) === 3, 'Peak in [1,2,3,4] should be at index 3 (value 4)');
    },

    /**
     * Test case: Multiple peaks, any one is acceptable.
     * e.g., [1,2,1,3,5,6,4] has peaks at index 1 (2) and index 5 (6).
     * The algorithm will return the peak found based on its specific logic.
     * For this specific implementation, it will return index 5.
     * @param {function} assert The assertion function.
     */
    testPeakElementMultiplePeaks: (assert) => {
        const nums = [1, 2, 1, 3, 5, 6, 4];
        const result = findPeakElement(nums);
        // We accept either index 1 (value 2) or index 5 (value 6)
        // With current implementation (high = mid, low = mid + 1), it tends to find the rightmost peak or one on an ascending slope.
        // It should find 6 at index 5.
        assert(result === 5, 'Peak in [1,2,1,3,5,6,4] should be at index 5 (value 6) with current algo');
        // Let's ensure a different array with multiple peaks also works,
        // and acknowledge that any valid peak index is okay.
        const nums2 = [1, 5, 2, 8, 3];
        const result2 = findPeakElement(nums2); // Should be 8 at index 3
        assert(result2 === 3, 'Peak in [1,5,2,8,3] should be at index 3 (value 8)');
    },

    /**
     * Test case: Single element array.
     * @param {function} assert The assertion function.
     */
    testPeakElementSingleElement: (assert) => {
        assert(findPeakElement([5]) === 0, 'Single element array should return index 0');
    },

    /**
     * Test case: Two element array (ascending).
     * @param {function} assert The assertion function.
     */
    testPeakElementTwoElementsAscending: (assert) => {
        assert(findPeakElement([1, 2]) === 1, 'Two elements ascending [1,2] should return index 1');
    },

    /**
     * Test case: Two element array (descending).
     * @param {function} assert The assertion function.
     */
    testPeakElementTwoElementsDescending: (assert) => {
        assert(findPeakElement([2, 1]) === 0, 'Two elements descending [2,1] should return index 0');
    },

    /**
     * Test case: Large array with a specific peak.
     * @param {function} assert The assertion function.
     */
    testPeakElementLargeArray: (assert) => {
        const size = 1000;
        const nums = Array.from({ length: size }, (_, i) => i); // [0, 1, ..., 999]
        // Create a peak in the middle
        nums[size / 2] = size * 2; // Making it significantly larger than neighbors
        // Expected behavior for [0, 1, ..., 499, 2000, 501, ..., 999]
        // This algorithm finds the rightmost peak in an increasing sequence
        // or the first peak it encounters when going downhill.
        // It should converge to index size/2.
        assert(findPeakElement(nums) === size / 2, `Large array with central peak at ${size / 2}`);
    },

    /**
     * Test case: All elements are the same (no peak according to definition).
     * This shouldn't happen based on problem constraints (nums[i] != nums[i+1]).
     * However, if it did, a valid implementation should return an index where it appears
     * to be a peak (e.g., first or last element, or if `n > 1`, no peak).
     * Note: LeetCode problem statement for "Peak Element" implies `nums[i] != nums[i+1]`.
     * If `nums = [1,1,1]`, this specific algorithm (which compares `nums[mid]` to `nums[mid+1]`)
     * would behave differently. However, adhering to common problem constraints.
     *
     * Given the constraint `nums[i] != nums[i+1]`, arrays like `[1,1,1]` are invalid.
     * The problem also implicitly guarantees a peak exists.
     */
};