/**
 * @fileoverview Problem 5: Find First and Last Position of Element in Sorted Array.
 * Given a sorted array of integers `nums` and a target value, find the starting and ending position
 * of the given target value. If the target is not found in the array, return `[-1, -1]`.
 * You must write an algorithm with `O(log N)` runtime complexity.
 */

/**
 * Helper function to find the first occurrence of the target in a sorted array.
 * This is a direct application of the "find first occurrence" binary search template.
 *
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums The sorted array.
 * @param {number} target The value to search for.
 * @returns {number} The index of the first occurrence of the target, or -1 if not found.
 */
function findFirstOccurrence(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    let firstIdx = -1;

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (nums[mid] === target) {
            firstIdx = mid;
            high = mid - 1; // Try to find an even earlier occurrence
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return firstIdx;
}

/**
 * Helper function to find the last occurrence of the target in a sorted array.
 * This is a direct application of the "find last occurrence" binary search template.
 *
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums The sorted array.
 * @param {number} target The value to search for.
 * @returns {number} The index of the last occurrence of the target, or -1 if not found.
 */
function findLastOccurrence(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    let lastIdx = -1;

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (nums[mid] === target) {
            lastIdx = mid;
            low = mid + 1; // Try to find an even later occurrence
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return lastIdx;
}

/**
 * Finds the starting and ending position of a given target value in a sorted array.
 * It uses two separate binary searches: one for the first occurrence and one for the last.
 *
 * Time Complexity: O(log N) - Two binary searches are performed.
 * Space Complexity: O(1) - Constant space used.
 *
 * @param {number[]} nums The sorted array of integers.
 * @param {number} target The target value.
 * @returns {number[]} An array `[start_index, end_index]` or `[-1, -1]` if target is not found.
 */
function findFirstAndLastPosition(nums, target) {
    if (!nums || nums.length === 0) {
        return [-1, -1];
    }

    const first = findFirstOccurrence(nums, target);
    // If the first occurrence is not found, the target is not in the array at all.
    if (first === -1) {
        return [-1, -1];
    }

    const last = findLastOccurrence(nums, target);

    return [first, last];
}

module.exports = {
    findFirstAndLastPosition,
    findFirstOccurrence, // Exporting helpers for potential re-use or direct testing
    findLastOccurrence
};