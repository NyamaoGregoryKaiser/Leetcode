/**
 * @fileoverview Implementations for the 0/1 Knapsack Problem.
 */

/**
 * --- Problem Description ---
 * Given weights and values of 'n' items, put these items in a knapsack of capacity 'W'
 * to get the maximum total value in the knapsack.
 * You cannot break an item, and you can only take an item or not take it (0/1 choice).
 *
 * Example:
 * Items:
 *   Item 1: { weight: 1, value: 6 }
 *   Item 2: { weight: 2, value: 10 }
 *   Item 3: { weight: 3, value: 12 }
 * Knapsack Capacity (W): 5
 *
 * Output: 22
 * Explanation: Take Item 2 (weight 2, value 10) and Item 3 (weight 3, value 12).
 * Total weight = 2 + 3 = 5 (within capacity)
 * Total value = 10 + 12 = 22
 *
 * Constraints:
 * 1 <= n <= 100
 * 1 <= W <= 1000
 * 1 <= weights[i], values[i] <= 1000
 */

/**
 * 1. Brute Force (Recursive)
 * This approach tries all possible combinations of items by either including or
 * excluding each item. It's a direct recursive translation of the problem.
 *
 * @param {number[]} weights An array of item weights.
 * @param {number[]} values An array of item values.
 * @param {number} capacity The maximum capacity of the knapsack.
 * @param {number} n The number of items available (or current item index).
 * @returns {number} The maximum value that can be obtained.
 *
 * Time Complexity: O(2^n) - For each item, we have two choices (include or exclude).
 * Space Complexity: O(n) - Due to the recursion stack depth.
 */
function knapsack_brute_force(weights, values, capacity, n = weights.length) {
    // Base Case: If no items left or knapsack capacity is 0
    if (n === 0 || capacity === 0) {
        return 0;
    }

    // If weight of the n-th item is more than Knapsack capacity W,
    // then this item cannot be included
    if (weights[n - 1] > capacity) {
        return knapsack_brute_force(weights, values, capacity, n - 1);
    } else {
        // Return the maximum of two cases:
        // 1. n-th item included
        // 2. n-th item not included
        return Math.max(
            values[n - 1] + knapsack_brute_force(weights, values, capacity - weights[n - 1], n - 1), // Include item n-1
            knapsack_brute_force(weights, values, capacity, n - 1)                                   // Exclude item n-1
        );
    }
}

/**
 * 2. Memoization (Top-Down Dynamic Programming)
 * This approach optimizes the brute-force recursion by storing the results of subproblems
 * in a memoization table (2D array).
 *
 * The state `dp(n, w)` represents the maximum value for `n` items with `w` capacity.
 * Recurrence Relation:
 *   - If `weights[n-1] > w`: `dp(n, w) = dp(n-1, w)` (cannot include item)
 *   - Else: `dp(n, w) = max( values[n-1] + dp(n-1, w - weights[n-1]), dp(n-1, w) )`
 * Base Cases:
 *   - `dp(0, w) = 0` (no items)
 *   - `dp(n, 0) = 0` (no capacity)
 *
 * @param {number[]} weights An array of item weights.
 * @param {number[]} values An array of item values.
 * @param {number} capacity The maximum capacity of the knapsack.
 * @returns {number} The maximum value that can be obtained.
 *
 * Time Complexity: O(n * W) - Where 'n' is the number of items and 'W' is the knapsack capacity.
 * Space Complexity: O(n * W) - For the memoization table and the recursion stack.
 */
function knapsack_memo(weights, values, capacity) {
    const n = weights.length;
    // memo[i][j] stores the max value for first 'i' items with 'j' capacity.
    // Initialize with -1 to indicate not computed.
    const memo = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(-1));

    /**
     * Helper recursive function for knapsack with memoization.
     * @param {number} currentN Number of items to consider (from 0 to currentN-1).
     * @param {number} currentCapacity Remaining knapsack capacity.
     * @returns {number} Maximum value.
     */
    function dp(currentN, currentCapacity) {
        // Base cases
        if (currentN === 0 || currentCapacity === 0) {
            return 0;
        }

        // Check if already computed
        if (memo[currentN][currentCapacity] !== -1) {
            return memo[currentN][currentCapacity];
        }

        let result;
        // If weight of the current item (item at index currentN-1) is greater than current capacity
        if (weights[currentN - 1] > currentCapacity) {
            // Cannot include this item, move to the next item
            result = dp(currentN - 1, currentCapacity);
        } else {
            // Max of two cases:
            // 1. Include current item: add its value and recurse with reduced capacity and remaining items.
            // 2. Exclude current item: recurse with same capacity and remaining items.
            result = Math.max(
                values[currentN - 1] + dp(currentN - 1, currentCapacity - weights[currentN - 1]),
                dp(currentN - 1, currentCapacity)
            );
        }

        // Store result in memo table
        memo[currentN][currentCapacity] = result;
        return result;
    }

    // Start recursion with all items and full capacity
    return dp(n, capacity);
}


/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 * This approach builds up the solution iteratively using a 2D DP table.
 *
 * `dp[i][w]` will store the maximum value that can be obtained with the first `i` items
 * and a knapsack capacity of `w`.
 *
 * Initialization:
 *   - `dp[0][w] = 0` for all `w` (0 items, 0 value)
 *   - `dp[i][0] = 0` for all `i` (0 capacity, 0 value)
 *
 * Recurrence Relation:
 *   For `i` from 1 to `n` (number of items):
 *     For `w` from 1 to `W` (knapsack capacity):
 *       - If `weights[i-1] <= w` (current item can fit):
 *         `dp[i][w] = max( values[i-1] + dp[i-1][w - weights[i-1]], dp[i-1][w] )`
 *       - Else (current item cannot fit):
 *         `dp[i][w] = dp[i-1][w]`
 *
 * @param {number[]} weights An array of item weights.
 * @param {number[]} values An array of item values.
 * @param {number} capacity The maximum capacity of the knapsack.
 * @returns {number} The maximum value that can be obtained.
 *
 * Time Complexity: O(n * W) - Two nested loops iterate through n * W states.
 * Space Complexity: O(n * W) - For the 2D DP table.
 */
function knapsack_tab(weights, values, capacity) {
    const n = weights.length;
    // dp[i][w] will store the maximum value for first 'i' items with 'w' capacity.
    // Table size is (n+1) x (capacity+1).
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

    // Fill the dp table
    for (let i = 1; i <= n; i++) { // Iterate through items
        for (let w = 1; w <= capacity; w++) { // Iterate through capacities
            const currentItemWeight = weights[i - 1]; // Current item (0-indexed array, 1-indexed dp)
            const currentItemValue = values[i - 1];

            if (currentItemWeight <= w) {
                // Current item can be included.
                // Take max of:
                // 1. Include current item: its value + max value from (previous items, remaining capacity)
                // 2. Exclude current item: max value from (previous items, same capacity)
                dp[i][w] = Math.max(
                    currentItemValue + dp[i - 1][w - currentItemWeight],
                    dp[i - 1][w]
                );
            } else {
                // Current item is too heavy, cannot include it.
                // Value is same as max value from (previous items, same capacity)
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // The result is in the bottom-right cell of the dp table
    return dp[n][capacity];
}

/**
 * 4. Tabulation with Space Optimization (using 1D DP array)
 * We observe that `dp[i][w]` only depends on `dp[i-1][...]`. This means we only need
 * the previous row to compute the current row. We can optimize the space to O(W)
 * by using a 1D DP array.
 *
 * To correctly update `dp[w]` (which represents `dp[i][w]`) using values from
 * `dp[i-1][...]` (which are also stored in the `dp` array before current item's updates),
 * we must iterate the capacity `w` from `capacity` down to `weights[i-1]`.
 * If we iterate upwards, `dp[w - weights[i-1]]` would already be updated for the current `i`,
 * effectively allowing multiple uses of the same item (unbounded knapsack), which is incorrect for 0/1.
 *
 * @param {number[]} weights An array of item weights.
 * @param {number[]} values An array of item values.
 * @param {number} capacity The maximum capacity of the knapsack.
 * @returns {number} The maximum value that can be obtained.
 *
 * Time Complexity: O(n * W) - Two nested loops iterate through n * W states.
 * Space Complexity: O(W) - A single 1D DP array of size (capacity+1) is used.
 */
function knapsack_tab_optimized(weights, values, capacity) {
    const n = weights.length;
    // dp[w] will store the maximum value for the current set of items with 'w' capacity.
    // Initialized to 0.
    const dp = Array(capacity + 1).fill(0);

    // Iterate through items
    for (let i = 0; i < n; i++) {
        const currentItemWeight = weights[i];
        const currentItemValue = values[i];

        // Iterate through capacities from right to left
        // This ensures that when we compute dp[w], dp[w - currentItemWeight] still holds
        // the value from the *previous* item iteration (dp[i-1]), preventing multiple uses
        // of the *current* item (dp[i][w - currentItemWeight]).
        for (let w = capacity; w >= currentItemWeight; w--) {
            // Two choices:
            // 1. Include current item: its value + max value from (previous items, remaining capacity w - currentItemWeight)
            //    This is `currentItemValue + dp[w - currentItemWeight]`
            // 2. Exclude current item: max value from (previous items, same capacity)
            //    This is `dp[w]` (its current value before updating for item 'i')
            dp[w] = Math.max(dp[w], currentItemValue + dp[w - currentItemWeight]);
        }
    }

    // The result is in dp[capacity]
    return dp[capacity];
}

module.exports = {
    knapsack_brute_force,
    knapsack_memo,
    knapsack_tab,
    knapsack_tab_optimized
};