```javascript
/**
 * src/problems/findPeakElement.js
 * Implements algorithms to find a peak element in an array.
 */

/**
 * Find Peak Element (Optimized - Binary Search Approach)
 *
 * A peak element is an element that is greater than its neighbors.
 * Given an input array `nums`, where `nums[i] ≠ nums[i+1]`, find a peak element
 * and return its index. The array may contain multiple peaks, in which case
 * return the index to any one of the peaks.
 *
 * You may imagine that `nums[-1] = nums[n] = -∞`.
 * This allows us to handle boundary elements (first and last) easily.
 * For example, if `nums[0] > nums[1]`, then `nums[0]` is a peak because `nums[-1]` is `-∞`.
 *
 * The core idea is that if `nums[mid] < nums[mid + 1]`, it means we are on an increasing
 * slope, so a peak *must* exist to the right of `mid`.
 * If `nums[mid] > nums[mid + 1]`, it means we are on a decreasing slope (or at a peak),
 * so a peak *could* be at `mid` or to its left.
 *
 * @param {number[]} nums - The input array.
 * @returns {number} The index of any peak element.
 *
 * Time Complexity: O(log N) - The search space is halved in each step.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function findPeakElement(nums) {
    if (!nums || nums.length === 0) {
        return -1; // Or throw an error, depending on problem constraints
    }
    if (nums.length === 1) {
        return 0; // Single element is always a peak
    }

    let left = 0;
    let right = nums.length - 1;

    // Use a while loop with `left < right` for finding an "extreme" point.
    // The loop terminates when `left === right`, and that index is the peak.
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);

        // Compare mid element with its right neighbor
        if (nums[mid] < nums[mid + 1]) {
            // We are on an increasing slope. This means a peak MUST be to the right of mid.
            // So, discard mid and everything to its left.
            left = mid + 1;
        } else {
            // nums[mid] > nums[mid + 1]
            // We are on a decreasing slope or at a peak.
            // This means mid *could* be a peak, or a peak is to its left.
            // So, keep mid in the search space.
            right = mid;
        }
    }

    // When left === right, we have found a peak element.
    return left;
}


/**
 * Find Peak Element (Brute Force - Linear Scan)
 *
 * This function provides a brute-force approach for comparison.
 * It iterates through the array and checks each element against its neighbors.
 *
 * @param {number[]} nums - The input array.
 * @returns {number} The index of the first peak element found, or -1 if none.
 *
 * Time Complexity: O(N) - In the worst case, it iterates through all N elements.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function findPeakElementBruteForce(nums) {
    if (!nums || nums.length === 0) {
        return -1;
    }
    if (nums.length === 1) {
        return 0;
    }

    // Check first element
    if (nums[0] > nums[1]) {
        return 0;
    }

    // Check last element
    if (nums[nums.length - 1] > nums[nums.length - 2]) {
        return nums.length - 1;
    }

    // Check elements in between
    for (let i = 1; i < nums.length - 1; i++) {
        if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
            return i;
        }
    }

    // Should not happen based on problem constraints (nums[-1] = nums[n] = -∞ guarantees a peak exists)
    return -1;
}

module.exports = {
    findPeakElement,
    findPeakElementBruteForce
};
```