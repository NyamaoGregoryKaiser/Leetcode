```javascript
/**
 * @fileoverview Brute-force solution for Maximum Subarray Sum.
 * This file is here for comparison with the optimal Kadane's algorithm.
 *
 * It calculates the sum of every possible contiguous subarray and finds the maximum.
 *
 * @param {number[]} nums - The input array of numbers.
 * @returns {number} The maximum sum of a contiguous subarray.
 *
 * Time Complexity: O(N^2), where N is the number of elements in `nums`.
 *                  The outer loop iterates N times, and the inner loop iterates up to N times.
 * Space Complexity: O(1), as no extra space proportional to input size is used.
 */
function maxSubarraySum_bruteForce(nums) {
    const n = nums.length;
    if (n === 0) {
        return 0; // Or throw error, depending on problem constraints
    }

    let maxSum = -Infinity; // Initialize with a very small number

    // Outer loop: iterates through all possible starting points for a subarray
    for (let i = 0; i < n; i++) {
        let currentSum = 0;
        // Inner loop: iterates through all possible ending points for the current starting point
        for (let j = i; j < n; j++) {
            currentSum += nums[j];
            maxSum = Math.max(maxSum, currentSum); // Update maxSum if currentSum is greater
        }
    }
    return maxSum;
}

module.exports = {
    maxSubarraySum_bruteForce
};
```