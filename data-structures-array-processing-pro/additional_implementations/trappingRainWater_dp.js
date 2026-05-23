```javascript
/**
 * @fileoverview Dynamic Programming solution for Trapping Rain Water.
 * This is an O(N) time and O(N) space complexity approach.
 *
 * @param {number[]} height - An array representing the elevation map.
 * @returns {number} The total amount of trapped rain water.
 *
 * Time Complexity: O(N), for three passes over the array (one for `leftMax`, one for `rightMax`, one for calculating water).
 * Space Complexity: O(N), for storing `leftMax` and `rightMax` arrays.
 */
function trappingRainWater_dp(height) {
    const n = height.length;
    if (n < 3) { // Need at least 3 bars to trap water
        return 0;
    }

    const leftMax = new Array(n).fill(0);
    const rightMax = new Array(n).fill(0);

    // Populate leftMax array: `leftMax[i]` stores max height from index 0 to i.
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    // Populate rightMax array: `rightMax[i]` stores max height from index n-1 to i.
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    let totalWater = 0;
    // Calculate trapped water for each bar
    for (let i = 0; i < n; i++) {
        // Water trapped above current bar is min(maxLeft, maxRight) - currentHeight
        // Ensure result is non-negative
        totalWater += Math.max(0, Math.min(leftMax[i], rightMax[i]) - height[i]);
    }

    return totalWater;
}

module.exports = {
    trappingRainWater_dp
};
```