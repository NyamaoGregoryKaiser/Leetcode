/**
 * src/problems/knapsack01.js
 *
 * Problem: 0/1 Knapsack Problem
 *
 * Given a set of `items`, each with a `weight` and a `value`, and a maximum `capacity`
 * of a knapsack, determine the maximum total value that can be placed in the knapsack
 * such that the total weight does not exceed the capacity.
 *
 * Each item can either be put into the knapsack (1) or not (0) - hence "0/1".
 * You cannot break items (i.e., you must take the whole item or leave it).
 *
 * Example:
 * weights = [1, 2, 3]
 * values = [6, 10, 12]
 * capacity = 5
 * Output: 22 (Items with weight 2 and 3, values 10 and 12, total weight 5, total value 22)
 *
 * This file implements various approaches:
 * 1. Recursive (Brute Force)
 * 2. Memoization (Top-Down Dynamic Programming)
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 */

const { create2DArray } = require('../utils/helpers');

/**
 * 1. Recursive (Brute Force) Solution
 *
 * For each item, we have two choices:
 * a) Include the item: if its weight is less than or equal to the remaining capacity,
 *    add its value and recursively solve for the remaining items and reduced capacity.
 * b) Exclude the item: recursively solve for the remaining items with the same capacity.
 * We take the maximum of these two choices.
 *
 * Time Complexity: O(2^n) - Exponential, where n is the number of items.
 * Space Complexity: O(n) - Due to recursion stack depth.
 *
 * @param {number[]} weights - Array of weights of items.
 * @param {number[]} values - Array of values of items.
 * @param {number} capacity - The maximum weight capacity of the knapsack.
 * @param {number} n - The number of items currently under consideration (index of current item + 1).
 * @returns {number} The maximum value that can be put in the knapsack.
 */
function knapsack01Recursive(weights, values, capacity, n = weights.length) {
    // Base case: If no items left or knapsack has no capacity
    if (n === 0 || capacity === 0) {
        return 0;
    }

    // If the weight of the nth item (weights[n-1]) is more than the current capacity,
    // then this item cannot be included. So we move to the next item.
    if (weights[n - 1] > capacity) {
        return knapsack01Recursive(weights, values, capacity, n - 1);
    }
    // Else (weights[n-1] <= capacity), we have two options:
    else {
        // Option 1: Include the nth item
        // Add its value and recur for remaining items and reduced capacity
        const includeItem = values[n - 1] + knapsack01Recursive(weights, values, capacity - weights[n - 1], n - 1);

        // Option 2: Exclude the nth item
        // Recur for remaining items with the same capacity
        const excludeItem = knapsack01Recursive(weights, values, capacity, n - 1);

        // Return the maximum of these two options
        return Math.max(includeItem, excludeItem);
    }
}

/**
 * 2. Memoization (Top-Down Dynamic Programming) Solution
 *
 * Optimizes the recursive solution by caching results of subproblems.
 * `memo[n][w]` stores the maximum value for `n` items and `w` capacity.
 *
 * Time Complexity: O(n*W) - Where n is the number of items and W is the capacity.
 *                             Each state (n, w) is computed only once.
 * Space Complexity: O(n*W) - For the memoization table and recursion stack.
 *
 * @param {number[]} weights - Array of weights of items.
 * @param {number[]} values - Array of values of items.
 * @param {number} capacity - The maximum weight capacity of the knapsack.
 * @param {number} n - The number of items currently under consideration.
 * @param {Array<Array<number|undefined>>} memo - Cache for storing results.
 * @returns {number} The maximum value.
 */
function knapsack01Memoized(weights, values, capacity, n = weights.length, memo) {
    // Initialize memo table only once on the first call
    if (memo === undefined) {
        // memo[i][j] stores max value for first 'i' items with capacity 'j'
        memo = create2DArray(n + 1, capacity + 1, undefined);
    }

    // Base case: If no items left or knapsack has no capacity
    if (n === 0 || capacity === 0) {
        return 0;
    }

    // Return cached value if already computed
    if (memo[n][capacity] !== undefined) {
        return memo[n][capacity];
    }

    let result;
    // If the weight of the nth item (weights[n-1]) is more than the current capacity,
    // this item cannot be included.
    if (weights[n - 1] > capacity) {
        result = knapsack01Memoized(weights, values, capacity, n - 1, memo);
    }
    // Else (weights[n-1] <= capacity), we have two options:
    else {
        // Option 1: Include the nth item
        const includeItem = values[n - 1] + knapsack01Memoized(weights, values, capacity - weights[n - 1], n - 1, memo);

        // Option 2: Exclude the nth item
        const excludeItem = knapsack01Memoized(weights, values, capacity, n - 1, memo);

        result = Math.max(includeItem, excludeItem);
    }

    // Store the computed result in memo
    memo[n][capacity] = result;
    return result;
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming) Solution
 *
 * Builds the solution iteratively using a 2D DP table.
 * `dp[i][j]` stores the maximum value that can be obtained from the first `i` items
 * with a knapsack capacity of `j`.
 *
 * Time Complexity: O(n*W) - Two nested loops iterate through all (n+1)*(W+1) states.
 * Space Complexity: O(n*W) - For the DP table `dp`.
 *
 * @param {number[]} weights - Array of weights of items.
 * @param {number[]} values - Array of values of items.
 * @param {number} capacity - The maximum weight capacity of the knapsack.
 * @returns {number} The maximum value.
 */
function knapsack01Tabulated(weights, values, capacity) {
    const n = weights.length; // Number of items

    // dp[i][j] will store the maximum value using first 'i' items with capacity 'j'
    // DP table dimensions: (n+1) x (capacity+1)
    const dp = create2DArray(n + 1, capacity + 1, 0);

    // Build DP table iteratively
    // i represents the number of items considered (from 1 to n)
    for (let i = 1; i <= n; i++) {
        // w represents the current knapsack capacity (from 1 to capacity)
        for (let w = 1; w <= capacity; w++) {
            const currentItemWeight = weights[i - 1]; // Weight of the current item (i-th item)
            const currentItemValue = values[i - 1];   // Value of the current item (i-th item)

            // Option 1: Current item cannot be included (its weight > current capacity)
            // In this case, the max value is the same as without this item.
            if (currentItemWeight > w) {
                dp[i][w] = dp[i - 1][w];
            }
            // Option 2: Current item can be included. We have two sub-options:
            // a) Include the current item: value of current item + max value from (i-1) items with (w - currentItemWeight) capacity
            // b) Exclude the current item: max value from (i-1) items with current capacity (w)
            // Take the maximum of these two sub-options.
            else {
                const valueIfIncluded = currentItemValue + dp[i - 1][w - currentItemWeight];
                const valueIfExcluded = dp[i - 1][w];
                dp[i][w] = Math.max(valueIfIncluded, valueIfExcluded);
            }
        }
    }

    // The result is in the bottom-right cell of the DP table
    return dp[n][capacity];
}

module.exports = {
    knapsack01Recursive,
    knapsack01Memoized,
    knapsack01Tabulated,
};