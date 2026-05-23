```javascript
/**
 * @fileoverview Brute-force solution for Trapping Rain Water.
 * This file is here for comparison with the DP and Two-Pointer solutions.
 *
 * For each bar, it calculates how much water it can trap by finding the maximum
 * height to its left and right.
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

    // We cannot trap water at the very first or very last bar,
    // as there are no walls on both sides.
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
        // Ensure the result is not negative (if current bar is taller than its walls)
        totalWater += Math.max(0, Math.min(maxLeft, maxRight) - height[i]);
    }

    return totalWater;
}

module.exports = {
    trappingRainWater_bruteForce
};
```