```javascript
/**
 * @fileoverview Solutions for the "Sort Colors" (Dutch National Flag) problem.
 * Problem Description: Given an array `nums` with n objects colored red, white, or blue,
 * sort them in-place so that objects of the same color are adjacent, with the colors
 * in the order red, white, and blue.
 * We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
 * You must solve this problem without using the library's sort function.
 *
 * Example:
 * Input: nums = [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 */

const { swap } = require('../utils/arrayUtils');

/**
 * Approach 1: Two-pass counting sort variant.
 * First pass counts the occurrences of 0s, 1s, and 2s.
 * Second pass overwrites the array based on counts.
 *
 * Time Complexity: O(N)
 *   - Two passes over the array, each taking O(N) time.
 * Space Complexity: O(1) (for storing counts, if counts array is fixed size (3 elements)).
 *
 * @param {Array<number>} nums The array of colors (0, 1, or 2) to be sorted in-place.
 * @returns {void} The array is modified in-place.
 */
function sortColors_twoPass(nums) {
  if (!Array.isArray(nums)) {
    throw new Error('Input must be an array.');
  }
  if (nums.length <= 1) {
    return; // Already sorted
  }

  let count0 = 0;
  let count1 = 0;
  let count2 = 0;

  // First pass: Count occurrences of each color
  for (const num of nums) {
    if (num === 0) {
      count0++;
    } else if (num === 1) {
      count1++;
    } else if (num === 2) {
      count2++;
    } else {
      throw new Error('Array contains invalid color values. Only 0, 1, 2 are allowed.');
    }
  }

  // Second pass: Overwrite the array
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
 * Approach 2: Optimal one-pass solution (Dutch National Flag Algorithm).
 * This algorithm uses three pointers: `low`, `mid`, and `high`.
 * - `low` points to the last 0. Everything to its left is 0.
 * - `high` points to the first 2. Everything to its right is 2.
 * - `mid` iterates through the array.
 *
 * Logic:
 * - If `nums[mid]` is 0: Swap `nums[mid]` with `nums[low]`, then increment both `low` and `mid`.
 * - If `nums[mid]` is 1: Increment `mid`. (It's already in its correct relative position).
 * - If `nums[mid]` is 2: Swap `nums[mid]` with `nums[high]`, then decrement `high`.
 *   Crucially, `mid` is NOT incremented here because the element swapped into `nums[mid]`
 *   could be a 0, 1, or 2, and needs to be re-evaluated.
 *
 * Time Complexity: O(N)
 *   - Single pass over the array. Each element is visited at most twice (once by `mid`, once possibly by `low`/`high` swap).
 * Space Complexity: O(1) (in-place).
 *
 * @param {Array<number>} nums The array of colors (0, 1, or 2) to be sorted in-place.
 * @returns {void} The array is modified in-place.
 */
function sortColors_onePass(nums) {
  if (!Array.isArray(nums)) {
    throw new Error('Input must be an array.');
  }
  const n = nums.length;
  if (n <= 1) {
    return; // Already sorted
  }

  let low = 0;        // Pointer for 0s (elements to the left of `low` are 0s)
  let mid = 0;        // Current element pointer (iterates through the array)
  let high = n - 1;   // Pointer for 2s (elements to the right of `high` are 2s)

  // Iterate as long as the middle pointer hasn't crossed the high pointer.
  // When mid crosses high, all elements have been processed.
  while (mid <= high) {
    if (nums[mid] === 0) {
      // If current element is 0, swap it with the element at `low`
      // and move both `low` and `mid` pointers forward.
      swap(nums, low, mid);
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      // If current element is 1, it's already in its correct relative position,
      // so just move `mid` pointer forward.
      mid++;
    } else if (nums[mid] === 2) {
      // If current element is 2, swap it with the element at `high`
      // and move `high` pointer backward.
      // IMPORTANT: DO NOT increment `mid` here. The element swapped into `nums[mid]`
      // could be 0, 1, or 2, and needs to be re-evaluated in the next iteration.
      swap(nums, mid, high);
      high--;
    } else {
      throw new Error('Array contains invalid color values. Only 0, 1, 2 are allowed.');
    }
  }
}

module.exports = {
  sortColors_twoPass,
  sortColors_onePass,
};
```