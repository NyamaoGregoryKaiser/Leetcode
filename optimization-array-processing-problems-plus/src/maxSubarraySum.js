/**
 * @fileoverview Solutions for the "Maximum Subarray Sum" problem (Kadane's Algorithm).
 *
 * Problem Description:
 * Given an integer array `nums`, find the contiguous subarray (containing at least one number)
 * which has the largest sum and return its sum.
 * A subarray is a contiguous part of an array.
 *
 * Examples:
 * 1. Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 *    Output: 6 (Subarray: [4,-1,2,1])
 * 2. Input: nums = [1]
 *    Output: 1 (Subarray: [1])
 * 3. Input: nums = [5,4,-1,7,8]
 *    Output: 23 (Subarray: [5,4,-1,7,8])
 */

/**
 * Finds the maximum sum of a contiguous subarray using Kadane's Algorithm.
 * This is an optimal dynamic programming approach.
 *
 * Algorithm (Kadane's Algorithm):
 * 1. Initialize `maxSoFar` to negative infinity (or the first element) to store the maximum sum found globally.
 * 2. Initialize `currentMax` to 0 (or the first element) to store the maximum sum ending at the current position.
 * 3. Iterate through the array:
 *    a. For each element `num`, update `currentMax`: `currentMax = Math.max(num, currentMax + num)`.
 *       This means, either start a new subarray from `num` or extend the existing `currentMax` subarray.
 *    b. Update `maxSoFar`: `maxSoFar = Math.max(maxSoFar, currentMax)`.
 *       This ensures `maxSoFar` always holds the maximum sum found so far.
 * 4. Return `maxSoFar`.
 *
 * Edge Case: If all numbers are negative, the result should be the largest negative number (the one closest to zero).
 * Kadane's algorithm handles this naturally by taking `Math.max(num, currentMax + num)`. If `currentMax + num` is
 * less than `num` (e.g., `currentMax` became negative), it "resets" `currentMax` to `num`.
 *
 * Example: nums = [-2,1,-3,4,-1,2,1,-5,4]
 *
 * | i | num | currentMax (prev) | currentMax (new) | maxSoFar (prev) | maxSoFar (new) | Subarray for currentMax |
 * |---|-----|-------------------|------------------|-----------------|----------------|-------------------------|
 * | - | -   | 0                 | -                | -Infinity       | -              | -                       |
 * | 0 | -2  | 0                 | max(-2, 0-2) = -2| -Infinity       | max(-Infinity,-2) = -2 | [-2]                    |
 * | 1 | 1   | -2                | max(1, -2+1) = 1 | -2              | max(-2, 1) = 1 | [1]                     |
 * | 2 | -3  | 1                 | max(-3, 1-3) = -2| 1               | max(1, -2) = 1 | [-3] (resets to -3, then 1-3 = -2) |
 * | 3 | 4   | -2                | max(4, -2+4) = 4 | 1               | max(1, 4) = 4 | [4]                     |
 * | 4 | -1  | 4                 | max(-1, 4-1) = 3 | 4               | max(4, 3) = 4 | [4,-1]                  |
 * | 5 | 2   | 3                 | max(2, 3+2) = 5 | 4               | max(4, 5) = 5 | [4,-1,2]                |
 * | 6 | 1   | 5                 | max(1, 5+1) = 6 | 5               | max(5, 6) = 6 | [4,-1,2,1]              |
 * | 7 | -5  | 6                 | max(-5, 6-5) = 1| 6               | max(6, 1) = 6 | [-5] (or starts with [-5], but 6-5 is 1) |
 * | 8 | 4   | 1                 | max(4, 1+4) = 5 | 6               | max(6, 5) = 6 | [...,4] (or starts with [4], but 1+4 is 5) |
 *
 * Final Result: 6
 *
 * @param {number[]} nums The input array of numbers.
 * @returns {number} The maximum sum of a contiguous subarray.
 *
 * Time Complexity: O(N), where N is the length of the array, as we iterate through the array once.
 * Space Complexity: O(1), as only a few variables are used.
 */
function maxSubarraySumKadane(nums) {
    if (!nums || nums.length === 0) {
        // According to problem statement, array contains at least one number.
        // If it could be empty, returning 0 or throwing error would be options.
        throw new Error("Input array must not be empty.");
    }

    let maxSoFar = nums[0];     // Stores the maximum sum found anywhere in the array
    let currentMax = nums[0];   // Stores the maximum sum ending at the current position

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        // The current max sum is either the current number itself (starting a new subarray)
        // or the current number added to the previous currentMax sum.
        currentMax = Math.max(num, currentMax + num);

        // Update the overall maximum sum found so far.
        maxSoFar = Math.max(maxSoFar, currentMax);
    }

    return maxSoFar;
}

/**
 * Finds the maximum sum of a contiguous subarray using a brute-force approach.
 * This method checks every possible subarray sum.
 *
 * Algorithm:
 * 1. Initialize `maxSum` to negative infinity (or the first element).
 * 2. Iterate from `i = 0` to `n-1` (start of subarray).
 * 3.   For each `i`, iterate from `j = i` to `n-1` (end of subarray).
 * 4.     Calculate the sum of elements from `nums[i]` to `nums[j]`.
 * 5.     Update `maxSum` if the current subarray sum is greater.
 *
 * @param {number[]} nums The input array of numbers.
 * @returns {number} The maximum sum of a contiguous subarray.
 *
 * Time Complexity: O(N^2), where N is the length of the array, due to nested loops.
 * Space Complexity: O(1) auxiliary space.
 */
function maxSubarraySumBruteForce(nums) {
    if (!nums || nums.length === 0) {
        throw new Error("Input array must not be empty.");
    }

    let maxSum = nums[0]; // Initialize with the first element

    for (let i = 0; i < nums.length; i++) {
        let currentSum = 0;
        for (let j = i; j < nums.length; j++) {
            currentSum += nums[j];
            maxSum = Math.max(maxSum, currentSum);
        }
    }

    return maxSum;
}

module.exports = {
    maxSubarraySumKadane,
    maxSubarraySumBruteForce
};