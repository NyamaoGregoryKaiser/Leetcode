```javascript
/**
 * @fileoverview Problem: Rotate Array
 * Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
 * The rotation should be performed in-place.
 *
 * Constraints:
 * 1 <= nums.length <= 10^5
 * -2^31 <= nums[i] <= 2^31 - 1
 * 0 <= k <= 10^5
 */

const { reverse } = require('../utils/arrayHelpers');

/**
 * Approach 1: Using a temporary array.
 * Creates a new array to store rotated elements, then copies them back.
 * Not in-place.
 *
 * @param {number[]} nums - The array to rotate.
 * @param {number} k - The number of steps to rotate.
 * @returns {void} Modifies the original array in-place by copying from a new array.
 *
 * Time Complexity: O(N), where N is the number of elements in `nums`.
 *                  We iterate through the array twice (once to fill temp, once to copy back).
 * Space Complexity: O(N), for the temporary array `temp`.
 */
function rotateArray_tempArray(nums, k) {
    const n = nums.length;
    k %= n; // Handle cases where k is greater than n

    if (k === 0 || n === 0) {
        return; // No rotation needed
    }

    const temp = new Array(n);

    // Fill the temporary array with rotated elements
    for (let i = 0; i < n; i++) {
        temp[(i + k) % n] = nums[i];
    }

    // Copy elements back to the original array
    for (let i = 0; i < n; i++) {
        nums[i] = temp[i];
    }
}

/**
 * Approach 2: Using the reverse technique (Optimal, In-place).
 * This method is based on the observation that reversing the entire array, then reversing
 * the first k elements, and finally reversing the remaining n-k elements, achieves the rotation.
 *
 * Example: nums = [1,2,3,4,5,6,7], k = 3
 * 1. Reverse all: [7,6,5,4,3,2,1]
 * 2. Reverse first k (first 3): [5,6,7,4,3,2,1]
 * 3. Reverse remaining (last n-k = 4): [5,6,7,1,2,3,4] (Desired output)
 *
 * @param {number[]} nums - The array to rotate.
 * @param {number} k - The number of steps to rotate.
 * @returns {void} Modifies the original array in-place.
 *
 * Time Complexity: O(N), where N is the number of elements in `nums`.
 *                  Each reversal takes O(N) time, and we perform 3 reversals.
 * Space Complexity: O(1), as the rotation is done in-place.
 */
function rotateArray_reverse(nums, k) {
    const n = nums.length;
    k %= n; // Normalize k (e.g., k=7 on array of length 5 is same as k=2)

    if (k === 0 || n === 0) {
        return; // No rotation needed
    }

    // Example: nums = [1,2,3,4,5,6,7], k = 3
    // Step 1: Reverse the entire array
    // [7,6,5,4,3,2,1]
    reverse(nums, 0, n - 1);

    // Step 2: Reverse the first k elements
    // [5,6,7,4,3,2,1] (k=3, so reverse indices 0 to 2)
    reverse(nums, 0, k - 1);

    // Step 3: Reverse the remaining n-k elements
    // [5,6,7,1,2,3,4] (n-k=4, so reverse indices 3 to 6)
    reverse(nums, k, n - 1);
}

/**
 * Approach 3: Cyclic Replacements (In-place, slightly more complex logic).
 * This approach moves each element to its correct rotated position.
 * It's crucial to handle cycles to ensure all elements are moved.
 *
 * @param {number[]} nums - The array to rotate.
 * @param {number} k - The number of steps to rotate.
 * @returns {void} Modifies the original array in-place.
 *
 * Time Complexity: O(N), where N is the number of elements in `nums`.
 *                  Each element is visited and moved exactly once.
 * Space Complexity: O(1), as the rotation is done in-place.
 */
function rotateArray_cyclicReplacement(nums, k) {
    const n = nums.length;
    k %= n; // Normalize k

    if (k === 0 || n === 0) {
        return;
    }

    let count = 0; // Number of elements moved
    let start = 0; // Starting point for each cycle

    // Iterate through `start` indices until all elements have been moved.
    // Each `start` initiates a new cycle.
    // The number of cycles is gcd(n, k).
    while (count < n) {
        let current = start;
        let prev = nums[start]; // Value to be moved to the current position

        do {
            const next = (current + k) % n; // Calculate the target position
            const temp = nums[next];       // Store the value at the target position
            nums[next] = prev;             // Move `prev` to the target position
            prev = temp;                   // The stored value becomes the `prev` for the next iteration
            current = next;                // Move to the next position in the cycle
            count++;                       // Increment count of moved elements
        } while (start !== current); // Continue the cycle until we return to the starting position
        start++; // Move to the next starting point for a new cycle
    }
}


module.exports = {
    rotateArray_tempArray,
    rotateArray_reverse,
    rotateArray_cyclicReplacement
};
```