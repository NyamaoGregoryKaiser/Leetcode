```java
package com.example.dp.problems;

import java.util.Arrays;

/**
 * Implements various approaches to solve the 0/1 Knapsack Problem.
 * Given a set of items, each with a weight and a value, determine the number of each item to include
 * in a collection so that the total weight is less than or equal to a given capacity
 * and the total value is as large as possible.
 *
 * This is the 0/1 variant, meaning each item can either be taken or not taken (no fractional items).
 *
 * Example:
 * items = [{weight: 10, value: 60}, {weight: 20, value: 100}, {weight: 30, value: 120}]
 * capacity = 50
 * Max value = 220 (by taking items with weights 20 and 30)
 */
public class KnapsackProblem {

    /**
     * Approach 1: Brute Force Recursive Solution
     *
     * For each item, we have two choices:
     * 1. Include the item: If its weight is less than or equal to the remaining capacity.
     *    In this case, add its value and recurse with reduced capacity and remaining items.
     * 2. Exclude the item: Recurse with the same capacity and remaining items.
     *
     * The maximum of these two choices is taken.
     *
     * Time Complexity: O(2^N) - In the worst case, for each of N items, we explore two branches.
     * Space Complexity: O(N) - Due to recursion stack depth.
     *
     * @param weights Array of item weights.
     * @param values Array of item values.
     * @param capacity Maximum capacity of the knapsack.
     * @return Maximum value that can be obtained.
     */
    public int solveBruteForce(int[] weights, int[] values, int capacity) {
        return solveBruteForce(weights, values, capacity, weights.length - 1);
    }

    private int solveBruteForce(int[] weights, int[] values, int capacity, int itemIndex) {
        // Base case: If no items left or capacity is 0, no value can be added.
        if (itemIndex < 0 || capacity == 0) {
            return 0;
        }

        // If the weight of the current item is more than the knapsack capacity,
        // this item cannot be included. Move to the next item (previous index).
        if (weights[itemIndex] > capacity) {
            return solveBruteForce(weights, values, capacity, itemIndex - 1);
        } else {
            // Option 1: Include the current item
            int includeItem = values[itemIndex] + solveBruteForce(weights, values,
                                                        capacity - weights[itemIndex], itemIndex - 1);

            // Option 2: Exclude the current item
            int excludeItem = solveBruteForce(weights, values, capacity, itemIndex - 1);

            // Return the maximum of the two options
            return Math.max(includeItem, excludeItem);
        }
    }

    /**
     * Approach 2: Recursive Solution with Memoization (Top-Down Dynamic Programming)
     *
     * This approach optimizes the brute-force recursion by storing the results of subproblems
     * in a memoization table (dp array) to avoid redundant computations.
     * `dp[i][w]` stores the maximum value that can be obtained with items from index `0` to `i`
     * and a knapsack capacity of `w`.
     *
     * Time Complexity: O(N*W) - Each state `(itemIndex, capacity)` is computed only once.
     * Space Complexity: O(N*W) - For the memoization table + O(N) for recursion stack.
     *
     * @param weights Array of item weights.
     * @param values Array of item values.
     * @param capacity Maximum capacity of the knapsack.
     * @return Maximum value that can be obtained.
     */
    public int solveMemoized(int[] weights, int[] values, int capacity) {
        int N = weights.length;
        // dp[i][w] will store the maximum value for items 0...i-1 and capacity w.
        // Initialize with -1 to indicate not computed.
        int[][] dp = new int[N + 1][capacity + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return solveMemoized(weights, values, capacity, N, dp);
    }

    // Helper for memoized solution: using item count 'N' as index rather than 'itemIndex'
    private int solveMemoized(int[] weights, int[] values, int capacity, int N, int[][] dp) {
        // Base case: No items or no capacity left
        if (N == 0 || capacity == 0) {
            return 0;
        }

        // If the result for this subproblem is already computed, return it.
        if (dp[N][capacity] != -1) {
            return dp[N][capacity];
        }

        // If weight of Nth item (weights[N-1]) is more than current capacity,
        // it cannot be included. Move to the previous item.
        if (weights[N - 1] > capacity) {
            dp[N][capacity] = solveMemoized(weights, values, capacity, N - 1, dp);
        } else {
            // Option 1: Include the Nth item
            int includeItem = values[N - 1] + solveMemoized(weights, values,
                                                  capacity - weights[N - 1], N - 1, dp);

            // Option 2: Exclude the Nth item
            int excludeItem = solveMemoized(weights, values, capacity, N - 1, dp);

            dp[N][capacity] = Math.max(includeItem, excludeItem);
        }
        return dp[N][capacity];
    }

    /**
     * Approach 3: Iterative Solution (Bottom-Up Dynamic Programming)
     *
     * This approach fills a 2D DP table `dp[i][w]` where `dp[i][w]` represents the
     * maximum value that can be obtained with items `0` to `i-1` and a knapsack
     * capacity of `w`.
     *
     * The table is filled iteratively from smaller subproblems to larger ones.
     * Base cases: `dp[0][w] = 0` (no items) and `dp[i][0] = 0` (zero capacity).
     *
     * Recurrence relation:
     * If `weights[i-1] > w`: `dp[i][w] = dp[i-1][w]` (current item cannot be included)
     * Else: `dp[i][w] = Math.max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])`
     * (max of excluding current item vs. including current item)
     *
     * Time Complexity: O(N*W) - Two nested loops iterate through all states.
     * Space Complexity: O(N*W) - For the 2D DP table.
     *
     * @param weights Array of item weights.
     * @param values Array of item values.
     * @param capacity Maximum capacity of the knapsack.
     * @return Maximum value that can be obtained.
     */
    public int solveIterative(int[] weights, int[] values, int capacity) {
        int N = weights.length;

        // dp[i][w] will store the maximum value for items 0...i-1 and capacity w.
        int[][] dp = new int[N + 1][capacity + 1];

        // Fill dp table in bottom-up manner
        // i represents the number of items considered (from 0 to N)
        for (int i = 0; i <= N; i++) {
            // w represents the current knapsack capacity (from 0 to 'capacity')
            for (int w = 0; w <= capacity; w++) {
                // Base case: no items or no capacity -> max value is 0
                if (i == 0 || w == 0) {
                    dp[i][w] = 0;
                }
                // If the current item's weight (weights[i-1]) is less than or equal to current capacity 'w'
                else if (weights[i - 1] <= w) {
                    // Option 1: Include the current item. Value of current item + max value from remaining capacity
                    // and previous items.
                    int includeItem = values[i - 1] + dp[i - 1][w - weights[i - 1]];
                    // Option 2: Exclude the current item. Max value with previous items and same capacity.
                    int excludeItem = dp[i - 1][w];
                    dp[i][w] = Math.max(includeItem, excludeItem);
                }
                // If current item's weight is more than current capacity 'w', it cannot be included.
                else {
                    dp[i][w] = dp[i - 1][w]; // Take value from previous items with same capacity
                }
            }
        }
        return dp[N][capacity];
    }

    /**
     * Approach 4: Space-Optimized Iterative Solution
     *
     * The iterative DP solution uses a 2D table, but `dp[i][w]` only depends on values
     * from the previous row (`dp[i-1][...]`). This means we can optimize space by
     * using only one 1D array (representing the `dp[i-1]` row) to compute the current `dp[i]` row.
     *
     * When calculating `dp[i][w]`, we need `dp[i-1][w]` (exclude current item) and
     * `dp[i-1][w - weights[i-1]]` (include current item).
     *
     * To achieve this with a single 1D array, we must iterate the capacity `w` from right to left
     * (from `capacity` down to `weights[i-1]`). This ensures that when `dp[w - weights[i-1]]`
     * is accessed, it still holds the value from the *previous* row (`dp[i-1]`)
     * before it's overwritten by the current row's calculation.
     *
     * Time Complexity: O(N*W) - Same number of computations.
     * Space Complexity: O(W) - We only use a single 1D array of size `capacity + 1`.
     *
     * @param weights Array of item weights.
     * @param values Array of item values.
     * @param capacity Maximum capacity of the knapsack.
     * @return Maximum value that can be obtained.
     */
    public int solveSpaceOptimized(int[] weights, int[] values, int capacity) {
        int N = weights.length;

        // dp[w] will store the maximum value for the current set of items with capacity w.
        // It effectively represents the "previous" row's values.
        int[] dp = new int[capacity + 1];

        // Initialize dp array with 0s (base case for 0 capacity or no items)
        Arrays.fill(dp, 0);

        // Iterate through each item
        for (int i = 0; i < N; i++) { // i represents the current item index (0 to N-1)
            int currentWeight = weights[i];
            int currentValue = values[i];

            // Iterate capacity from right to left
            // This is crucial: to use dp[w - currentWeight] from the *previous* iteration (i.e., previous item set),
            // we must ensure it hasn't been updated for the *current* item set yet.
            // By going right to left, dp[w - currentWeight] is always from the (i-1)th item set.
            for (int w = capacity; w >= currentWeight; w--) {
                // dp[w] (without current item) vs. currentValue + dp[w - currentWeight] (with current item)
                dp[w] = Math.max(dp[w], currentValue + dp[w - currentWeight]);
            }
        }
        return dp[capacity];
    }

    /**
     * Helper method to get the DP table for iterative solution.
     *
     * @param weights Array of item weights.
     * @param values Array of item values.
     * @param capacity Maximum capacity of the knapsack.
     * @return The filled DP table.
     */
    public int[][] getKnapsackDpTableIterative(int[] weights, int[] values, int capacity) {
        int N = weights.length;
        int[][] dp = new int[N + 1][capacity + 1];

        for (int i = 0; i <= N; i++) {
            for (int w = 0; w <= capacity; w++) {
                if (i == 0 || w == 0) {
                    dp[i][w] = 0;
                } else if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp;
    }
}

```