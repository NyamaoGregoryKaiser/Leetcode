/**
 * @fileoverview Problem 3: Find Peak Element.
 * A peak element is an element that is strictly greater than its neighbors.
 * Given a 0-indexed integer array `nums`, find a peak element, and return its index.
 * If the array contains multiple peaks, return the index to any of the peaks.
 * You may imagine that `nums[-1] = nums[n] = -∞`.
 * You must write an algorithm that runs in `O(log N)` time.
 */

/**
 * Finds the index of a peak element in an array.
 * A peak element is strictly greater than its neighbors.
 * The edge elements `nums[-1]` and `nums[n]` are considered to be -∞.
 *
 * The core idea is that if `nums[mid] < nums[mid + 1]`, it means we are on an increasing slope
 * heading towards a peak somewhere to the right (including `mid + 1`).
 * If `nums[mid] > nums[mid + 1]`, we are on a decreasing slope (or `mid` is the peak itself),
 * so a peak must be to the left of or at `mid`.
 *
 * Time Complexity: O(log N) - The search space is halved in each step.
 * Space Complexity: O(1) - Constant space used.
 *
 * @param {number[]} nums The input array of integers.
 * @returns {number} The index of any peak element.
 */
function findPeakElement(nums) {
    if (!nums || nums.length === 0) {
        return -1; // Or throw an error, depending on problem constraints
    }
    if (nums.length === 1) {
        return 0; // Single element is always a peak
    }

    let low = 0;
    let high = nums.length - 1;

    while (low < high) { // Loop until low and high converge to a single element
        const mid = Math.floor(low + (high - low) / 2);

        // Compare mid with its right neighbor (mid + 1).
        // We can safely do this because high will always be at least mid + 1,
        // so mid + 1 will not go out of bounds before the loop terminates.
        if (nums[mid] < nums[mid + 1]) {
            // We are on an ascending slope. This means a peak must exist to the right
            // of mid (including mid + 1). So, discard the left half.
            low = mid + 1;
        } else {
            // nums[mid] > nums[mid + 1] (or nums[mid] is already the peak).
            // We are on a descending slope, or mid is the peak.
            // A peak must be at mid or to its left. Discard the right half.
            // We cannot set high = mid - 1 because mid itself might be the peak.
            high = mid;
        }
    }

    // When the loop terminates, low === high, and this index points to a peak element.
    return low;
}

module.exports = {
    findPeakElement
};