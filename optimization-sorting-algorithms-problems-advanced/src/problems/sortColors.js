const { swap } = require('../utils/arrayUtils');

/**
 * src/problems/sortColors.js
 *
 * Problem: Sort Colors (Dutch National Flag Problem)
 *
 * Given an array `nums` with `n` objects colored red, white, or blue, sort them
 * in-place so that objects of the same color are adjacent, with the colors in the
 * order red, white, and blue.
 *
 * We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
 *
 * You must solve this problem without using the library's sort function.
 *
 * Example:
 * Input: nums = [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 *
 * Example:
 * Input: nums = [2,0,1]
 * Output: [0,1,2]
 *
 * Constraints:
 * - n == nums.length
 * - 1 <= n <= 300
 * - nums[i] is 0, 1, or 2.
 */

/**
 * Approach 1: Two-Pass Counting Sort (Brute Force / Simpler for fixed small range)
 *
 * This approach first counts the occurrences of 0s, 1s, and 2s.
 * Then, it overwrites the array based on these counts.
 *
 * Time Complexity: O(N) - Two passes over the array.
 * Space Complexity: O(1) - Only a few variables for counts.
 * Stability: Stable (if implemented by placing counts sequentially).
 *
 * @param {number[]} nums The input array containing 0s, 1s, and 2s.
 * @returns {void} The array is sorted in-place.
 */
function sortColors_TwoPassCounting(nums) {
    if (!nums || nums.length <= 1) {
        return; // Already sorted or empty
    }

    let count0 = 0;
    let count1 = 0;
    let count2 = 0;

    // First pass: count occurrences of each color
    for (const num of nums) {
        if (num === 0) {
            count0++;
        } else if (num === 1) {
            count1++;
        } else if (num === 2) {
            count2++;
        }
    }

    // Second pass: overwrite the array based on counts
    let currentIdx = 0;
    for (let i = 0; i < count0; i++) {
        nums[currentIdx++] = 0;
    }
    for (let i = 0; i < count1; i++) {
        nums[currentIdx++] = 1;
    }
    for (let i = 0; i < count2; i++) {
        nums[currentIdx++] = 2;
    }
}


/**
 * Approach 2: One-Pass (Dutch National Flag Algorithm) - Optimal
 *
 * This algorithm uses three pointers: `low`, `mid`, and `high`.
 * - `low`: points to the next position where a 0 should be placed. Elements before `low` are 0s.
 * - `mid`: current element being examined. Elements between `low` and `mid` are 1s.
 * - `high`: points to the previous position where a 2 should be placed. Elements after `high` are 2s.
 *
 * Algorithm:
 * 1. Initialize `low = 0`, `mid = 0`, `high = n - 1`.
 * 2. While `mid <= high`:
 *    a. If `nums[mid]` is 0:
 *       Swap `nums[mid]` with `nums[low]`.
 *       Increment both `low` and `mid`.
 *    b. If `nums[mid]` is 1:
 *       Increment `mid`.
 *    c. If `nums[mid]` is 2:
 *       Swap `nums[mid]` with `nums[high]`.
 *       Decrement `high`. (Note: `mid` is NOT incremented here because the swapped element
 *       from `high` could be 0, 1, or 2, and needs to be re-examined.)
 *
 * Time Complexity: O(N) - Single pass over the array.
 * Space Complexity: O(1) - In-place sort, only a few pointers.
 * Stability: Not stable (swapping elements might change relative order of equal elements).
 *
 * @param {number[]} nums The input array containing 0s, 1s, and 2s.
 * @returns {void} The array is sorted in-place.
 */
function sortColors_OnePass(nums) {
    if (!nums || nums.length <= 1) {
        return; // Already sorted or empty
    }

    let low = 0;    // Pointer for the next position of 0
    let mid = 0;    // Pointer for the current element being examined
    let high = nums.length - 1; // Pointer for the next position of 2

    // Iterate until the mid pointer crosses the high pointer
    while (mid <= high) {
        if (nums[mid] === 0) {
            // If the current element is 0, swap it with the element at 'low'.
            // This moves 0s to the beginning of the array.
            swap(nums, low, mid);
            low++; // Increment low as we've placed a 0 correctly
            mid++; // Increment mid to check the next element
        } else if (nums[mid] === 1) {
            // If the current element is 1, it's already in its correct relative position
            // (between 0s and 2s), so just move to the next element.
            mid++;
        } else { // nums[mid] === 2
            // If the current element is 2, swap it with the element at 'high'.
            // This moves 2s to the end of the array.
            swap(nums, mid, high);
            high--; // Decrement high as we've placed a 2 correctly
            // Note: We do NOT increment mid here because the element swapped from 'high'
            // could be a 0, 1, or 2, and needs to be re-examined by the current 'mid' pointer.
        }
    }
}

module.exports = {
    sortColors_TwoPassCounting,
    sortColors_OnePass
};