```javascript
/**
 * Dynamic Programming: 0/1 Knapsack Problem
 *
 * Problem: Given weights and values of N items, put these items in a knapsack of capacity W
 * to get the maximum total value in the knapsack. Each item can either be put in the knapsack
 * or not (0/1 choice) and we cannot break an item.
 *
 * Example:
 * N = 3 items
 * Weights: [10, 20, 30]
 * Values:  [60, 100, 120]
 * Capacity W = 50
 *
 * Output: 220 (Items with weights 20 and 30 are chosen, 100 + 120 = 220. Total weight = 50)
 */

/**
 * Approach 1: Memoization (Top-Down Dynamic Programming)
 *
 * This approach uses recursion with memoization. The state is defined by `(index, currentCapacity)`,
 * representing the maximum value we can get using items from `index` onwards with `currentCapacity` remaining.
 *
 * Recurrence Relation:
 * `dp(index, currentCapacity)`:
 *   1. Don't include item `index`: `dp(index + 1, currentCapacity)`
 *   2. Include item `index` (if possible): `values[index] + dp(index + 1, currentCapacity - weights[index])`
 *   `dp(index, currentCapacity) = max(option1, option2)`
 *
 * Base Cases:
 * `dp(index, currentCapacity) = 0` if `index` reaches `N` (no more items) or `currentCapacity <= 0`.
 *
 * Time Complexity: O(N * W) - Each state `(index, currentCapacity)` is computed once.
 * Space Complexity: O(N * W) - For the memoization table and recursion stack.
 *   (N = number of items, W = knapsack capacity)
 *
 * @param {number[]} weights An array of item weights.
 * @param {number[]} values An array of item values.
 * @param {number} capacity The maximum capacity of the knapsack.
 * @param {number} index The current item index being considered (starts from 0).
 * @param {Map<string, number>} memo A Map used as a cache for storing computed results.
 * @returns {number} The maximum value that can be obtained.
 */
function knapsack01Memoization(weights, values, capacity, index = 0, memo = new Map()) {
    // Base cases
    // If no items left or knapsack capacity is 0 or less
    if (index === weights.length || capacity <= 0) {
        return 0;
    }

    // Check if result for current state (index, capacity) is already memoized
    const key = `${index}-${capacity}`;
    if (memo.has(key)) {
        return memo.get(key);
    }

    let result;

    // Option 1: Exclude the current item (item at `index`)
    const valueExcludingCurrent = knapsack01Memoization(weights, values, capacity, index + 1, memo);

    // Option 2: Include the current item (if its weight doesn't exceed currentCapacity)
    if (weights[index] <= capacity) {
        const valueIncludingCurrent = values[index] + knapsack01Memoization(weights, values, capacity - weights[index], index + 1, memo);
        result = Math.max(valueExcludingCurrent, valueIncludingCurrent);
    } else {
        // Cannot include the current item because its weight is too high
        result = valueExcludingCurrent;
    }

    // Store the result in memo
    memo.set(key, result);
    return result;
}

/**
 * Approach 2: Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds a 2D DP table `dp` where `dp[i][w]` stores the maximum value
 * that can be obtained with items `0` to `i-1` (first `i` items) and a knapsack
 * capacity of `w`.
 *
 * Initialization:
 * `dp[0][w] = 0` for all `w` (no items, value is 0)
 * `dp[i][0] = 0` for all `i` (capacity 0, value is 0)
 *
 * Iteration:
 * For `i` from 1 to `N` (number of items):
 *   For `w` from 1 to `W` (knapsack capacity):
 *     If `weights[i-1] <= w` (current item can fit):
 *       `dp[i][w] = max(dp[i-1][w],              // Exclude current item
 *                       values[i-1] + dp[i-1][w - weights[i-1]]) // Include current item
 *     Else (current item cannot fit):
 *       `dp[i][w] = dp[i-1][w]` // Exclude current item (same as previous row)
 *
 * Time Complexity: O(N * W) - Two nested loops iterate through all cells of the DP table.
 * Space Complexity: O(N * W) - For the 2D DP table.
 *   (N = number of items, W = knapsack capacity)
 *
 * @param {number[]} weights An array of item weights.
 * @param {number[]} values An array of item values.
 * @param {number} capacity The maximum capacity of the knapsack.
 * @returns {number} The maximum value that can be obtained.
 */
function knapsack01Tabulation(weights, values, capacity) {
    const N = weights.length;

    // dp[i][w] will store the maximum value using first 'i' items with capacity 'w'
    // dp table dimensions: (N+1) x (capacity+1)
    const dp = Array(N + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    // Fill the DP table
    for (let i = 1; i <= N; i++) {
        const currentItemWeight = weights[i - 1]; // Current item's weight (0-indexed array vs 1-indexed loop)
        const currentItemValue = values[i - 1];   // Current item's value

        for (let w = 1; w <= capacity; w++) {
            // Case 1: If current item's weight is less than or equal to current knapsack capacity `w`
            if (currentItemWeight <= w) {
                // Option A: Don't include the current item. Value is same as with previous i-1 items.
                //           This is `dp[i-1][w]`
                // Option B: Include the current item. Value is `current item's value` + `max value from
                //           previous i-1 items with remaining capacity (w - currentItemWeight)`.
                //           This is `currentItemValue + dp[i-1][w - currentItemWeight]`
                dp[i][w] = Math.max(dp[i - 1][w], currentItemValue + dp[i - 1][w - currentItemWeight]);
            } else {
                // Case 2: If current item's weight is greater than `w`, we cannot include it.
                // Value is same as with previous i-1 items and same capacity.
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // The result is in the bottom-right cell of the DP table
    return dp[N][capacity];
}

/**
 * Approach 3: Space-Optimized Tabulation
 *
 * We can optimize the space complexity of the tabulation method from O(N * W) to O(W).
 * Notice that to compute the current row `dp[i][...]`, we only need values from the previous row `dp[i-1][...]`.
 * This means we can use only two rows (current and previous) or even a single 1D array.
 *
 * When using a single 1D array `dp[w]`, we need to iterate `w` from `capacity` down to `weights[i-1]`.
 * This ensures that when we calculate `dp[w]`, `dp[w - weights[i-1]]` still refers to the
 * value from the *previous* item's calculation, not the current one. If we iterate upwards,
 * `dp[w - weights[i-1]]` might already be updated with the current item, leading to an
 * "unbounded knapsack" behavior (allowing multiple uses of the same item).
 *
 * Time Complexity: O(N * W) - Same nested loops.
 * Space Complexity: O(W) - Uses a single 1D array.
 *   (N = number of items, W = knapsack capacity)
 *
 * @param {number[]} weights An array of item weights.
 * @param {number[]} values An array of item values.
 * @param {number} capacity The maximum capacity of the knapsack.
 * @returns {number} The maximum value that can be obtained.
 */
function knapsack01SpaceOptimized(weights, values, capacity) {
    const N = weights.length;

    // dp[w] will store the maximum value for capacity `w` using items considered so far.
    // Initialize with zeros.
    const dp = Array(capacity + 1).fill(0);

    // Iterate through each item
    for (let i = 0; i < N; i++) {
        const currentItemWeight = weights[i];
        const currentItemValue = values[i];

        // Iterate capacity `w` from `capacity` down to `currentItemWeight`
        // This ensures that when `dp[w - currentItemWeight]` is accessed, it refers to
        // the state *before* considering the current item (from the previous row/iteration).
        for (let w = capacity; w >= currentItemWeight; w--) {
            // Option 1: Don't include the current item. Value is `dp[w]` (already present from previous iteration).
            // Option 2: Include the current item. Value is `currentItemValue` + `dp[w - currentItemWeight]`
            dp[w] = Math.max(dp[w], currentItemValue + dp[w - currentItemWeight]);
        }
    }

    // The result is dp[capacity]
    return dp[capacity];
}

module.exports = {
    knapsack01Memoization,
    knapsack01Tabulation,
    knapsack01SpaceOptimized,
};
```