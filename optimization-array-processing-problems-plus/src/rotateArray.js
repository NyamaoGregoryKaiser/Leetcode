/**
 * @fileoverview Solutions for the "Rotate Array" problem.
 *
 * Problem Description:
 * Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.
 * You should use an in-place algorithm.
 *
 * Examples:
 * 1. Input: nums = [1,2,3,4,5,6,7], k = 3
 *    Output: [5,6,7,1,2,3,4]
 * 2. Input: nums = [-1,-100,3,99], k = 2
 *    Output: [3,99,-1,-100]
 */

/**
 * Helper function to reverse a portion of an array in-place.
 * @param {number[]} nums The array to modify.
 * @param {number} start The starting index of the portion to reverse.
 * @param {number} end The ending index of the portion to reverse.
 * @returns {void}
 */
function reverse(nums, start, end) {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
    }
}

/**
 * Rotates an array to the right by k steps using the Three Reversals method.
 * This is an optimal in-place solution.
 *
 * Algorithm:
 * 1. Normalize k: k can be greater than the array length, so take k % length.
 * 2. Reverse the entire array.
 * 3. Reverse the first k elements.
 * 4. Reverse the remaining (length - k) elements.
 *
 * Example: nums = [1,2,3,4,5,6,7], k = 3
 * 1. k = 3 % 7 = 3
 * 2. Reverse all: [7,6,5,4,3,2,1]
 * 3. Reverse first k (3) elements: [5,6,7,4,3,2,1]
 * 4. Reverse remaining (7-3=4) elements: [5,6,7,1,2,3,4]
 *
 * @param {number[]} nums The array to rotate. Modified in-place.
 * @param {number} k The number of steps to rotate.
 * @returns {void} The function modifies the input array directly.
 *
 * Time Complexity: O(N), where N is the length of the array.
 *    Each element is reversed at most three times.
 * Space Complexity: O(1), as the rotation is done in-place.
 */
function rotateArrayByReverse(nums, k) {
    if (!nums || nums.length === 0) {
        return;
    }

    const n = nums.length;
    k = k % n; // Handle k larger than array length

    if (k === 0) { // No rotation needed
        return;
    }

    // Step 1: Reverse the entire array
    reverse(nums, 0, n - 1); // Example: [1,2,3,4,5,6,7] -> [7,6,5,4,3,2,1]

    // Step 2: Reverse the first k elements
    reverse(nums, 0, k - 1); // Example: [7,6,5,4,3,2,1] -> [5,6,7,4,3,2,1]

    // Step 3: Reverse the remaining n - k elements
    reverse(nums, k, n - 1); // Example: [5,6,7,4,3,2,1] -> [5,6,7,1,2,3,4]
}

/**
 * Rotates an array to the right by k steps using temporary elements and splice/unshift.
 * This approach is generally less efficient for large arrays due to array re-indexing.
 *
 * Algorithm:
 * 1. Normalize k: k can be greater than the array length, so take k % length.
 * 2. If k is 0, no rotation needed.
 * 3. Extract the last k elements.
 * 4. Remove these k elements from the end of the original array.
 * 5. Add the extracted elements to the beginning of the array.
 *
 * @param {number[]} nums The array to rotate. Modified in-place.
 * @param {number} k The number of steps to rotate.
 * @returns {void} The function modifies the input array directly.
 *
 * Time Complexity: O(N) due to `splice` and `unshift` operations, which can shift all elements.
 * Space Complexity: O(k) for storing the elements to be moved.
 */
function rotateArrayBySplice(nums, k) {
    if (!nums || nums.length === 0) {
        return;
    }

    const n = nums.length;
    k = k % n; // Handle k larger than array length

    if (k === 0) { // No rotation needed
        return;
    }

    // Extract the last k elements
    const rotatedPart = nums.splice(n - k);

    // Add the extracted elements to the beginning
    nums.unshift(...rotatedPart);
}

/**
 * Rotates an array to the right by k steps using a temporary array.
 * This approach is straightforward but uses O(N) additional space.
 *
 * Algorithm:
 * 1. Normalize k: k can be greater than the array length, so take k % length.
 * 2. Create a new array `result` of the same size.
 * 3. For each element `nums[i]`, place it at `result[(i + k) % n]`.
 * 4. Copy elements from `result` back to `nums`.
 *
 * @param {number[]} nums The array to rotate. Modified in-place.
 * @param {number} k The number of steps to rotate.
 * @returns {void} The function modifies the input array directly.
 *
 * Time Complexity: O(N) for iterating through the array twice (once to fill the temp array, once to copy back).
 * Space Complexity: O(N) for the temporary array.
 */
function rotateArrayByTempArray(nums, k) {
    if (!nums || nums.length === 0) {
        return;
    }

    const n = nums.length;
    k = k % n; // Handle k larger than array length

    if (k === 0) { // No rotation needed
        return;
    }

    const temp = new Array(n);

    for (let i = 0; i < n; i++) {
        // The element at index i in original array goes to (i + k) % n in the new array.
        temp[(i + k) % n] = nums[i];
    }

    // Copy elements back to the original array
    for (let i = 0; i < n; i++) {
        nums[i] = temp[i];
    }
}


module.exports = {
    rotateArrayByReverse,
    rotateArrayBySplice, // Less efficient in-place
    rotateArrayByTempArray // O(N) space
};