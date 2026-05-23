```javascript
/**
 * @fileoverview Problem: Maximum Subarray Sum
 * Given an integer array nums, find the contiguous subarray (containing at least one number)
 * which has the largest sum and return its sum.
 *
 * A subarray is a contiguous part of an array.
 *
 * Constraints:
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 */

/**
 * Approach 1: Brute Force (O(N^2)) - Find all subarrays and sum them.
 * This is a straightforward approach but inefficient for large arrays.
 *
 * @param {number[]} nums - The input array of numbers.
 * @returns {number} The maximum sum of a contiguous subarray.
 *
 * Time Complexity: O(N^2), where N is the number of elements in `nums`.
 *                  Outer loop runs N times, inner loop runs N times.
 * Space Complexity: O(1), no extra space proportional to input size is used.
 */
function maxSubarraySum_bruteForce(nums) {
    const n = nums.length;
    if (n === 0) {
        return 0;
    }

    let maxSum = -Infinity; // Initialize with a very small number

    // Outer loop: iterate through all possible starting points
    for (let i = 0; i < n; i++) {
        let currentSum = 0;
        // Inner loop: iterate through all possible ending points for the current starting point
        for (let j = i; j < n; j++) {
            currentSum += nums[j];
            maxSum = Math.max(maxSum, currentSum); // Update maxSum if currentSum is greater
        }
    }
    return maxSum;
}

/**
 * Approach 2: Kadane's Algorithm (Optimal, O(N)).
 * This dynamic programming approach efficiently finds the maximum subarray sum.
 * It maintains two variables:
 *  - `currentMax`: The maximum sum ending at the current position.
 *  - `globalMax`: The overall maximum sum found so far.
 *
 * The logic is:
 *  - For each element `num`, `currentMax` is either `num` itself (starting a new subarray)
 *    or `num` added to the `currentMax` from the previous position (extending the subarray).
 *    `currentMax = Math.max(num, currentMax + num);`
 *  - `globalMax` is updated whenever `currentMax` exceeds it.
 *    `globalMax = Math.max(globalMax, currentMax);`
 *
 * @param {number[]} nums - The input array of numbers.
 * @returns {number} The maximum sum of a contiguous subarray.
 *
 * Time Complexity: O(N), where N is the number of elements in `nums`.
 *                  We iterate through the array exactly once.
 * Space Complexity: O(1), as only a few variables are used to store state.
 */
function maxSubarraySum_kadane(nums) {
    const n = nums.length;
    if (n === 0) {
        return 0;
    }

    // Initialize currentMax and globalMax with the first element.
    // This handles cases with all negative numbers correctly (e.g., [-2, -1] should return -1).
    let currentMax = nums[0];
    let globalMax = nums[0];

    // Iterate starting from the second element
    for (let i = 1; i < n; i++) {
        const num = nums[i];

        // Decide whether to extend the current subarray or start a new one
        currentMax = Math.max(num, currentMax + num);

        // Update the overall maximum sum found so far
        globalMax = Math.max(globalMax, currentMax);
    }

    return globalMax;
}

module.exports = {
    maxSubarraySum_bruteForce, // Included for comparison, but not optimal for general use.
    maxSubarraySum_kadane
};
```