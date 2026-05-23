```javascript
/**
 * @fileoverview Utility functions for array manipulations.
 * This file can be extended with more general array helpers if needed across problems.
 */

/**
 * Reverses a portion of an array in-place.
 * Used by algorithms like 'Rotate Array'.
 *
 * @param {number[]} nums - The array to modify.
 * @param {number} start - The starting index (inclusive).
 * @param {number} end - The ending index (inclusive).
 * @returns {void} Modifies the array in-place.
 *
 * Time Complexity: O(N) where N is the length of the sub-array being reversed.
 * Space Complexity: O(1) as it performs in-place swaps.
 */
function reverse(nums, start, end) {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]]; // ES6 array destructuring for swap
        start++;
        end--;
    }
}

// Export common helper functions
module.exports = {
    reverse,
};
```