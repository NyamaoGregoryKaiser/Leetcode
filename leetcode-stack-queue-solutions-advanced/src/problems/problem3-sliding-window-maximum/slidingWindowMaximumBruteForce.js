/**
 * @file Implements the brute-force solution for the Sliding Window Maximum problem.
 * @module problems/slidingWindowMaximumBruteForce
 */

/**
 * Finds the maximum value within each sliding window of size `k` in an array `nums`
 * using a brute-force approach.
 *
 * Algorithm Steps:
 * 1. Initialize an empty result array.
 * 2. Iterate from the start of the array `nums` up to `N - k` (where `N` is `nums.length`).
 *    This outer loop defines the starting position of each window.
 * 3. For each window:
 *    a. Initialize a `currentMax` variable with the smallest possible number (`-Infinity`).
 *    b. Iterate from the current window's start (`i`) up to `i + k - 1`.
 *    c. In this inner loop, compare `nums[j]` with `currentMax` and update `currentMax`
 *       if `nums[j]` is larger.
 *    d. After the inner loop completes, `currentMax` holds the maximum for the current window.
 *       Add `currentMax` to the result array.
 *
 * @param {number[]} nums The input array of integers.
 * @param {number} k The size of the sliding window.
 * @returns {number[]} An array containing the maximum value for each sliding window.
 *
 * @example
 * slidingWindowMaximumBruteForce([1, 3, -1, -3, 5, 3, 6, 7], 3); // -> [3, 3, 5, 5, 6, 7]
 * slidingWindowMaximumBruteForce([1], 1); // -> [1]
 * slidingWindowMaximumBruteForce([1, 2, 3, 4, 5], 3); // -> [3, 4, 5]
 * slidingWindowMaximumBruteForce([5, 4, 3, 2, 1], 3); // -> [5, 4, 3]
 * slidingWindowMaximumBruteForce([], 0); // -> []
 */
function slidingWindowMaximumBruteForce(nums, k) {
    if (k <= 0 || !nums || nums.length === 0) {
        return [];
    }
    if (k === 1) {
        return nums;
    }
    if (k > nums.length) {
        // If k is larger than the array length, there's only one "window" which is the entire array.
        // The maximum for this single window is the max of the entire array.
        return [Math.max(...nums)];
    }

    const result = [];
    const n = nums.length;

    // Iterate through all possible starting positions of the sliding window.
    // The window starts at `i` and ends at `i + k - 1`.
    // The last possible starting index for a window of size k is `n - k`.
    for (let i = 0; i <= n - k; i++) {
        let currentMax = nums[i]; // Initialize currentMax with the first element of the window

        // Iterate through the current window to find its maximum element.
        for (let j = i + 1; j < i + k; j++) {
            if (nums[j] > currentMax) {
                currentMax = nums[j];
            }
        }
        result.push(currentMax);
    }

    return result;
}

/**
 * Time Complexity Analysis:
 * O(N * K), where N is the length of the input array `nums` and K is the window size.
 * The outer loop runs `N - K + 1` times (approximately N times).
 * The inner loop runs `K - 1` times (approximately K times) for each window to find the maximum.
 * Therefore, the total time complexity is roughly (N - K + 1) * (K - 1) which simplifies to O(N * K).
 *
 * Space Complexity Analysis:
 * O(N - K + 1), which simplifies to O(N).
 * This is the space used by the `result` array to store the maximums for each window.
 * The auxiliary space for variables is O(1).
 */

module.exports = slidingWindowMaximumBruteForce;