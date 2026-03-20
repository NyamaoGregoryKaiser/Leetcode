/**
 * @fileoverview Test suite for Problem 2: Search in Rotated Sorted Array.
 */

const { searchRotated } = require('../../src/algorithms/problems/problem2_rotatedSortedArraySearch');
const { generateRotatedSortedArray } = require('../../src/algorithms/utils/arrayUtils');

module.exports = {
    /**
     * Test case: Target found in the right part of a rotated array.
     * Original: [0,1,2,3,4,5,6], Rotated by 4: [4,5,6,0,1,2,3]
     * @param {function} assert The assertion function.
     */
    testRotatedTargetInRightHalf: (assert) => {
        const arr = [4, 5, 6, 7, 0, 1, 2];
        assert(searchRotated(arr, 0) === 4, 'Target 0 should be at index 4');
        assert(searchRotated(arr, 1) === 5, 'Target 1 should be at index 5');
        assert(searchRotated(arr, 2) === 6, 'Target 2 should be at index 6');
    },

    /**
     * Test case: Target found in the left part of a rotated array.
     * Original: [0,1,2,3,4,5,6], Rotated by 4: [4,5,6,0,1,2,3]
     * @param {function} assert The assertion function.
     */
    testRotatedTargetInLeftHalf: (assert) => {
        const arr = [4, 5, 6, 7, 0, 1, 2];
        assert(searchRotated(arr, 4) === 0, 'Target 4 should be at index 0');
        assert(searchRotated(arr, 7) === 3, 'Target 7 should be at index 3');
    },

    /**
     * Test case: Target not found in a rotated array.
     * @param {function} assert The assertion function.
     */
    testRotatedTargetNotFound: (assert) => {
        const arr = [4, 5, 6, 7, 0, 1, 2];
        assert(searchRotated(arr, 3) === -1, 'Target 3 should not be found');
        assert(searchRotated(arr, 8) === -1, 'Target 8 should not be found');
    },

    /**
     * Test case: Array not rotated (pivot at 0).
     * @param {function} assert The assertion function.
     */
    testRotatedNoRotation: (assert) => {
        const arr = [0, 1, 2, 4, 5, 6, 7];
        assert(searchRotated(arr, 4) === 3, 'Target 4 in unrotated array should be at index 3');
        assert(searchRotated(arr, 0) === 0, 'Target 0 in unrotated array should be at index 0');
    },

    /**
     * Test case: Empty array.
     * @param {function} assert The assertion function.
     */
    testRotatedEmptyArray: (assert) => {
        const arr = [];
        assert(searchRotated(arr, 5) === -1, 'Empty array should return -1');
    },

    /**
     * Test case: Single-element array (found).
     * @param {function} assert The assertion function.
     */
    testRotatedSingleElementArrayFound: (assert) => {
        const arr = [42];
        assert(searchRotated(arr, 42) === 0, 'Single element array (found)');
    },

    /**
     * Test case: Single-element array (not found).
     * @param {function} assert The assertion function.
     */
    testRotatedSingleElementArrayNotFound: (assert) => {
        const arr = [42];
        assert(searchRotated(arr, 100) === -1, 'Single element array (not found)');
    },

    /**
     * Test case: Two-element array.
     * @param {function} assert The assertion function.
     */
    testRotatedTwoElements: (assert) => {
        assert(searchRotated([1, 3], 1) === 0, '[1,3] target 1');
        assert(searchRotated([3, 1], 1) === 1, '[3,1] target 1');
        assert(searchRotated([3, 1], 3) === 0, '[3,1] target 3');
        assert(searchRotated([1, 3], 2) === -1, '[1,3] target 2 (not found)');
    },

    /**
     * Test case: Array with rotation point at index 1.
     * e.g., [3, 1, 2]
     * @param {function} assert The assertion function.
     */
    testRotatedPivotAtOne: (assert) => {
        const arr = [3, 1, 2];
        assert(searchRotated(arr, 1) === 1, '[3,1,2] target 1');
        assert(searchRotated(arr, 3) === 0, '[3,1,2] target 3');
        assert(searchRotated(arr, 2) === 2, '[3,1,2] target 2');
    },

    /**
     * Test case: Array with pivot at nums.length - 1 (e.g., [2,3,4,5,0,1]).
     * @param {function} assert The assertion function.
     */
    testRotatedPivotAtLastElement: (assert) => {
        const arr = [2, 3, 4, 5, 0, 1];
        assert(searchRotated(arr, 0) === 4, '[2,3,4,5,0,1] target 0');
        assert(searchRotated(arr, 1) === 5, '[2,3,4,5,0,1] target 1');
        assert(searchRotated(arr, 5) === 3, '[2,3,4,5,0,1] target 5');
    },

    /**
     * Test with generated rotated arrays.
     * @param {function} assert The assertion function.
     */
    testRotatedGeneratedArrays: (assert) => {
        const sizes = [5, 10, 50, 100];
        for (const size of sizes) {
            for (let i = 0; i < 5; i++) { // Run multiple times for randomness
                const rotatedArr = generateRotatedSortedArray(size, -size, size);
                const originalSorted = [...rotatedArr].sort((a, b) => a - b); // To find original index

                // Test existing targets
                for (let j = 0; j < 3; j++) { // Test a few random targets
                    const targetIdx = Math.floor(Math.random() * size);
                    const target = rotatedArr[targetIdx];
                    const foundIdx = searchRotated(rotatedArr, target);
                    assert(foundIdx === targetIdx, `Generated array size ${size}, target ${target} at index ${targetIdx} was found at ${foundIdx}`);
                }

                // Test non-existing targets
                const nonExistingTargets = [-size - 1, size + 1];
                for (const target of nonExistingTargets) {
                    assert(searchRotated(rotatedArr, target) === -1, `Generated array size ${size}, target ${target} (non-existent) not found`);
                }
            }
        }
    }
};