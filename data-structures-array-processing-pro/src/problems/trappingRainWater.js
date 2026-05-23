```javascript
/**
 * @fileoverview Problem: Trapping Rain Water
 * Given n non-negative integers representing an elevation map where the width of each bar is 1,
 * compute how much water it can trap after raining.
 *
 * Constraints:
 * n == height.length
 * 1 <= n <= 2 * 10^4
 * 0 <= height[i] <= 10^5
 */

/**
 * Approach 1: Brute Force (O(N^2)).
 * For each bar, calculate how much water it can trap.
 * The amount of water trapped above a bar at index `i` is
 * `min(max_left[i], max_right[i]) - height[i]`, if this value is positive.
 *
 * For each bar:
 * 1. Find the maximum height of a bar to its left (including itself).
 * 2. Find the maximum height of a bar to its right (including itself).
 * 3. The water it can trap is `max(0, min(max_left, max_right) - height[i])`.
 * Sum these amounts for all bars.
 *
 * @param {number[]} height - An array representing the elevation map.
 * @returns {number} The total amount of trapped rain water.
 *
 * Time Complexity: O(N^2), where N is the number of bars.
 *                  For each bar (N), we scan left (N) and scan right (N) to find max heights.
 * Space Complexity: O(1), no extra space proportional to input size.
 */
function trappingRainWater_bruteForce(height) {
    const n = height.length;
    if (n < 3) { // Need at least 3 bars to trap water
        return 0;
    }

    let totalWater = 0;

    // We cannot trap water at the very first or very last bar.
    // So, iterate from the second bar to the second-to-last bar.
    for (let i = 1; i < n - 1; i++) {
        let maxLeft = 0;
        let maxRight = 0;

        // Find max height to the left of current bar (including current bar)
        for (let j = 0; j <= i; j++) {
            maxLeft = Math.max(maxLeft, height[j]);
        }

        // Find max height to the right of current bar (including current bar)
        for (let j = i; j < n; j++) {
            maxRight = Math.max(maxRight, height[j]);
        }

        // Water trapped above current bar is min(maxLeft, maxRight) - height[i]
        // Ensure it's not negative (e.g., if height[i] is higher than both maxLeft/maxRight)
        totalWater += Math.max(0, Math.min(maxLeft, maxRight) - height[i]);
    }

    return totalWater;
}

/**
 * Approach 2: Dynamic Programming (O(N) Time, O(N) Space).
 * Precompute `max_left` and `max_right` arrays to avoid re-calculating them for each bar.
 *
 * 1. Create `leftMax` array: `leftMax[i]` stores the maximum height encountered from index 0 to `i`.
 * 2. Create `rightMax` array: `rightMax[i]` stores the maximum height encountered from index `n-1` to `i`.
 * 3. Iterate through the `height` array. For each bar `i`, the water trapped is
 *    `max(0, min(leftMax[i], rightMax[i]) - height[i])`. Sum these values.
 *
 * @param {number[]} height - An array representing the elevation map.
 * @returns {number} The total amount of trapped rain water.
 *
 * Time Complexity: O(N), for three passes over the array (one for `leftMax`, one for `rightMax`, one for calculating water).
 * Space Complexity: O(N), for storing `leftMax` and `rightMax` arrays.
 */
function trappingRainWater_dp(height) {
    const n = height.length;
    if (n < 3) {
        return 0;
    }

    const leftMax = new Array(n).fill(0);
    const rightMax = new Array(n).fill(0);

    // Populate leftMax array
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    // Populate rightMax array
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    let totalWater = 0;
    // Calculate trapped water
    for (let i = 0; i < n; i++) {
        totalWater += Math.max(0, Math.min(leftMax[i], rightMax[i]) - height[i]);
    }

    return totalWater;
}

/**
 * Approach 3: Two Pointers (Optimal, O(N) Time, O(1) Space).
 * This is the most efficient solution. It avoids extra space by maintaining two pointers
 * (`left` and `right`) and two variables to track `maxLeft` and `maxRight` encountered so far.
 *
 * The core idea is that if `height[left] < height[right]`:
 *  - We know the water trapped at `left` depends only on `maxLeft` (the left wall).
 *    The `right` wall is guaranteed to be at least `height[left]`, so `min(maxLeft, maxRight)`
 *    will be determined by `maxLeft`.
 *  - We increment `left`.
 *
 * Conversely, if `height[left] >= height[right]`:
 *  - The water trapped at `right` depends only on `maxRight` (the right wall).
 *    The `left` wall is guaranteed to be at least `height[right]`.
 *  - We decrement `right`.
 *
 * We update `maxLeft` and `maxRight` as we move the pointers.
 *
 * @param {number[]} height - An array representing the elevation map.
 * @returns {number} The total amount of trapped rain water.
 *
 * Time Complexity: O(N), as the two pointers traverse the array once.
 * Space Complexity: O(1), only a few variables are used.
 */
function trappingRainWater_twoPointers(height) {
    const n = height.length;
    if (n < 3) {
        return 0;
    }

    let left = 0;
    let right = n - 1;
    let maxLeft = 0;
    let maxRight = 0;
    let totalWater = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            // If current left bar is smaller than current right bar,
            // we can confidently calculate water for `height[left]`.
            // The water depends on `maxLeft` (the actual left wall) and `height[left]`.
            // The right wall will always be at least `height[left]` (either current `height[right]`
            // or some future `maxRight`).
            if (height[left] >= maxLeft) {
                maxLeft = height[left]; // Update maxLeft if current bar is higher
            } else {
                totalWater += maxLeft - height[left]; // Trap water
            }
            left++; // Move left pointer
        } else {
            // If current right bar is smaller than or equal to current left bar,
            // we can confidently calculate water for `height[right]`.
            // The water depends on `maxRight` (the actual right wall) and `height[right]`.
            // The left wall will always be at least `height[right]`.
            if (height[right] >= maxRight) {
                maxRight = height[right]; // Update maxRight if current bar is higher
            } else {
                totalWater += maxRight - height[right]; // Trap water
            }
            right--; // Move right pointer
        }
    }

    return totalWater;
}

module.exports = {
    trappingRainWater_bruteForce, // Included for comparison purposes.
    trappingRainWater_dp,
    trappingRainWater_twoPointers
};
```