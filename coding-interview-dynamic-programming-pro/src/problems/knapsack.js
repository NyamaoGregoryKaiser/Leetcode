/**
 * @fileoverview Implementations for the 0/1 Knapsack Problem.
 *
 * Problem Description:
 * Given weights and values of `N` items, put these items in a knapsack of capacity `W`
 * to get the maximum total value in the knapsack. You cannot break an item,
 * and you can only either take the item or not take it (0/1 property).
 */

/**
 * 1. Brute Force (Recursive)
 *
 * This approach considers each item and makes two choices: either include the item
 * in the knapsack or exclude it. It explores all possible subsets of items and picks
 * the one that yields maximum value without exceeding the knapsack capacity.
 *
 * The recursion logic:
 * `knapsack(weights, values, W, N)`
 * - Base cases:
 *   - If `N` (number of items considered) is 0 or `W` (knapsack capacity) is 0,
 *     the maximum value is 0.
 * - Recursive step for `N` items and capacity `W`:
 *   - If the weight of the `N-th` item is greater than `W`:
 *     We cannot include this item. So, the maximum value is `knapsack(weights, values, W, N-1)`.
 *   - Else (the `N-th` item can be included):
 *     We have two choices:
 *       1. Include the `N-th` item: `values[N-1] + knapsack(weights, values, W - weights[N-1], N-1)`
 *       2. Exclude the `N-th` item: `knapsack(weights, values, W, N-1)`
 *     We take the maximum of these two choices.
 *
 * Characteristics:
 * - Directly maps to the decision tree for each item.
 * - Highly inefficient due to redundant calculations of overlapping subproblems.
 *
 * Time Complexity: O(2^N) where N is the number of items. This is exponential
 *                  because each item presents two choices, leading to a decision tree
 *                  with 2^N leaves.
 * Space Complexity: O(N) due to recursion stack depth.
 *
 * @param {number[]} weights Array of weights of items.
 * @param {number[]} values Array of values of items.
 * @param {number} W Maximum capacity of the knapsack.
 * @param {number} N Number of items currently being considered (from 0 to N-1).
 * @returns {number} The maximum value that can be put in the knapsack.
 */
function knapsackBruteForce(weights, values, W, N) {
    // Base case: No items left or no capacity
    if (N === 0 || W === 0) {
        return 0;
    }

    // If weight of the N-th item is more than knapsack capacity W,
    // then this item cannot be included.
    if (weights[N - 1] > W) {
        return knapsackBruteForce(weights, values, W, N - 1);
    } else {
        // Return the maximum of two cases:
        // 1. N-th item included
        // 2. N-th item not included
        return Math.max(
            values[N - 1] + knapsackBruteForce(weights, values, W - weights[N - 1], N - 1), // Include N-th item
            knapsackBruteForce(weights, values, W, N - 1)                                   // Exclude N-th item
        );
    }
}

/**
 * 2. Memoization (Top-Down Dynamic Programming)
 *
 * This approach optimizes the brute force recursion by storing the results of subproblems
 * in a 2D cache (`memo` table). `memo[i][j]` stores the maximum value that can be obtained
 * with items from 0 to `i-1` and a knapsack capacity of `j`.
 *
 * Before computing `solve(N, W)`, it checks if `memo[N][W]` has already been computed.
 * If so, it returns the cached value. Otherwise, it computes it recursively and
 * stores the result before returning.
 *
 * Characteristics:
 * - Eliminates redundant computations.
 * - "Top-down" approach, starting from the desired `(N, W)` state and breaking it down.
 * - Solves the "overlapping subproblems" issue.
 *
 * Time Complexity: O(N*W) where N is the number of items and W is the knapsack capacity.
 *                  Each state `(i, j)` in the `N x W` DP table is computed only once.
 * Space Complexity: O(N*W) for the memoization table and O(N) for the recursion stack.
 *
 * @param {number[]} weights Array of weights of items.
 * @param {number[]} values Array of values of items.
 * @param {number} W Maximum capacity of the knapsack.
 * @param {number} N Number of items to consider (typically `weights.length`).
 * @param {Array<Array<number>>} memo Cache to store computed results.
 * @returns {number} The maximum value that can be put in the knapsack.
 */
function knapsackMemoization(weights, values, W, N, memo = null) {
    // Initialize memo table only once at the beginning of the top-level call
    if (memo === null) {
        memo = Array(N + 1).fill(null).map(() => Array(W + 1).fill(-1)); // -1 indicates not computed
    }

    // Base case: No items left or no capacity
    if (N === 0 || W === 0) {
        return 0;
    }

    // If result is already computed, return it
    if (memo[N][W] !== -1) {
        return memo[N][W];
    }

    let result;
    // If weight of the N-th item is more than knapsack capacity W,
    // then this item cannot be included.
    if (weights[N - 1] > W) {
        result = knapsackMemoization(weights, values, W, N - 1, memo);
    } else {
        // Return the maximum of two cases:
        // 1. N-th item included
        // 2. N-th item not included
        result = Math.max(
            values[N - 1] + knapsackMemoization(weights, values, W - weights[N - 1], N - 1, memo),
            knapsackMemoization(weights, values, W, N - 1, memo)
        );
    }

    // Store the computed result in memo and return
    memo[N][W] = result;
    return result;
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds the solution iteratively using a 2D DP table `dp`.
 * `dp[i][j]` represents the maximum value that can be obtained using the first `i` items
 * (items with indices `0` to `i-1`) with a knapsack capacity of `j`.
 *
 * Initialization:
 * - `dp[0][j]` for all `j`: 0 (no items, no value).
 * - `dp[i][0]` for all `i`: 0 (no capacity, no value).
 *
 * Iteration:
 * For `i` from 1 to `N` (number of items):
 *   For `j` from 1 to `W` (knapsack capacity):
 *     Let `currWeight = weights[i-1]` and `currValue = values[i-1]`.
 *     - If `currWeight > j` (current item is heavier than current capacity `j`):
 *       `dp[i][j] = dp[i-1][j]` (cannot include current item, value is same as with `i-1` items)
 *     - Else (current item can be included):
 *       `dp[i][j] = Math.max(dp[i-1][j],       // Exclude current item
 *                           currValue + dp[i-1][j - currWeight])` // Include current item
 *
 * Characteristics:
 * - Iterative, avoids recursion stack.
 * - "Bottom-up" approach, building solutions from smallest subproblems (fewer items, smaller capacity).
 *
 * Time Complexity: O(N*W)
 * Space Complexity: O(N*W) for the DP table `dp`.
 *
 * @param {number[]} weights Array of weights of items.
 * @param {number[]} values Array of values of items.
 * @param {number} W Maximum capacity of the knapsack.
 * @returns {number} The maximum value that can be put in the knapsack.
 */
function knapsackTabulation(weights, values, W) {
    const N = weights.length;

    // dp[i][j] will store the maximum value with first i items and capacity j
    const dp = Array(N + 1).fill(null).map(() => Array(W + 1).fill(0));

    // Fill the DP table
    // i: iterates through items (from 1 to N, representing items from index 0 to N-1)
    for (let i = 1; i <= N; i++) {
        // j: iterates through capacities (from 1 to W)
        for (let j = 1; j <= W; j++) {
            const currentItemWeight = weights[i - 1]; // Current item's weight
            const currentItemValue = values[i - 1];   // Current item's value

            // If the current item's weight is more than the current knapsack capacity j,
            // we cannot include this item. So, the max value is the same as without this item.
            if (currentItemWeight > j) {
                dp[i][j] = dp[i - 1][j];
            } else {
                // We have two choices:
                // 1. Exclude the current item: value is dp[i-1][j]
                // 2. Include the current item: value is currentItemValue + dp[i-1][j - currentItemWeight]
                //    (i.e., add its value to the max value obtained with previous items and remaining capacity)
                dp[i][j] = Math.max(dp[i - 1][j], currentItemValue + dp[i - 1][j - currentItemWeight]);
            }
        }
    }

    // The result is in dp[N][W]
    return dp[N][W];
}


/**
 * 4. Space-Optimized Tabulation
 *
 * This approach further optimizes the tabulation method's space complexity.
 * Notice that to compute `dp[i][j]`, we only need values from the previous row (`dp[i-1]`).
 * This means we don't need to store the entire `N x W` table. We can use only two rows:
 * one for the previous iteration (`prevRow`) and one for the current iteration (`currRow`).
 *
 * Even further, if we iterate the capacity `j` from `W` down to 1, we only need a single 1D array.
 * When calculating `dp[j]`, `dp[j - currentItemWeight]` will refer to a value from the *previous*
 * iteration (`dp[i-1]`) because it's at an index less than `j` and hasn't been updated yet
 * in the current iteration (`dp[i]`). If we iterated `j` from `1` to `W`, `dp[j - currentItemWeight]`
 * would already be from the *current* iteration, which is incorrect for 0/1 Knapsack.
 *
 * `dp[j]` represents the maximum value for a knapsack of capacity `j`.
 *
 * Initialization:
 * - `dp` array of size `W+1` initialized to 0.
 *
 * Iteration:
 * For each item `i` from 0 to `N-1`:
 *   `currWeight = weights[i]`, `currValue = values[i]`
 *   For `j` from `W` down to `currWeight`:
 *     `dp[j] = Math.max(dp[j], currValue + dp[j - currWeight])`
 *       - `dp[j]` (before update) represents: max value without current item.
 *       - `currValue + dp[j - currWeight]` represents: max value with current item.
 *
 * Characteristics:
 * - Most space-efficient iterative approach.
 * - Time complexity remains O(N*W).
 * - Requires careful iteration order (descending `j`) to ensure 0/1 property.
 *
 * Time Complexity: O(N*W)
 * Space Complexity: O(W) for the 1D DP array.
 *
 * @param {number[]} weights Array of weights of items.
 * @param {number[]} values Array of values of items.
 * @param {number} W Maximum capacity of the knapsack.
 * @returns {number} The maximum value that can be put in the knapsack.
 */
function knapsackSpaceOptimized(weights, values, W) {
    const N = weights.length;

    // dp[j] will store the maximum value for capacity j
    // Using a 1D array initialized to 0.
    const dp = Array(W + 1).fill(0);

    // Iterate through each item
    for (let i = 0; i < N; i++) {
        const currentItemWeight = weights[i];
        const currentItemValue = values[i];

        // Iterate through capacities from W down to currentItemWeight
        // This reverse iteration is crucial for 0/1 knapsack
        // It ensures that `dp[j - currentItemWeight]` refers to the value
        // computed from the *previous* item's consideration,
        // maintaining the "each item can be picked once" property.
        for (let j = W; j >= currentItemWeight; j--) {
            // Option 1: Don't include the current item. Value is dp[j] (from previous items).
            // Option 2: Include the current item. Value is currentItemValue + dp[j - currentItemWeight].
            //           dp[j - currentItemWeight] comes from previous item's consideration due to reverse loop.
            dp[j] = Math.max(dp[j], currentItemValue + dp[j - currentItemWeight]);
        }
    }

    // The result is the maximum value for the full capacity W
    return dp[W];
}

module.exports = {
    knapsackBruteForce,
    knapsackMemoization,
    knapsackTabulation,
    knapsackSpaceOptimized,
};