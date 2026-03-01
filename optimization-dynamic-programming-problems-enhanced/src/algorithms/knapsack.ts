/**
 * src/algorithms/knapsack.ts
 *
 * This file implements various approaches to solve the 0/1 Knapsack Problem.
 * The 0/1 Knapsack problem is a classic optimization problem where you want to
 * maximize the total value of items you can put into a knapsack, given a weight
 * capacity, and each item can either be taken or not taken (0 or 1).
 */

/**
 * Approach 1: Recursive (Brute Force)
 *
 * Solves the 0/1 Knapsack problem using plain recursion.
 * For each item, it considers two possibilities: either include it or exclude it.
 *
 * Time Complexity: O(2^N) where N is the number of items.
 *   - Each item has two choices, leading to an exponential number of subproblems.
 * Space Complexity: O(N)
 *   - Due to the recursion stack depth.
 *
 * @param weights An array of weights of items.
 * @param values An array of values of items.
 * @param capacity The maximum weight capacity of the knapsack.
 * @param n The current number of items under consideration (initially weights.length).
 * @returns The maximum value that can be put in the knapsack.
 */
export function knapsackRecursive(
    weights: number[],
    values: number[],
    capacity: number,
    n: number = weights.length
): number {
    // Base case: If no items left or knapsack has no capacity
    if (n === 0 || capacity === 0) {
        return 0;
    }

    // If the weight of the current item (n-1) is more than the knapsack capacity,
    // this item cannot be included.
    if (weights[n - 1] > capacity) {
        return knapsackRecursive(weights, values, capacity, n - 1);
    } else {
        // If the current item can be included, we have two choices:
        // 1. Include the item: Add its value and recursively solve for remaining capacity and items.
        //    (values[n-1] + knapsackRecursive(weights, values, capacity - weights[n-1], n-1))
        // 2. Exclude the item: Recursively solve for the same capacity and remaining items.
        //    (knapsackRecursive(weights, values, capacity, n-1))
        // Take the maximum of these two choices.
        return Math.max(
            values[n - 1] + knapsackRecursive(weights, values, capacity - weights[n - 1], n - 1),
            knapsackRecursive(weights, values, capacity, n - 1)
        );
    }
}

/**
 * Approach 2: Memoization (Top-Down Dynamic Programming)
 *
 * Solves the 0/1 Knapsack problem using recursion with memoization.
 * Stores the results of subproblems in a 2D array (DP table) to avoid recomputing.
 *
 * Time Complexity: O(N*W) where N is the number of items and W is the capacity.
 *   - Each state (n, capacity) is computed only once.
 * Space Complexity: O(N*W)
 *   - For the memoization table and recursion stack.
 *
 * @param weights An array of weights of items.
 * @param values An array of values of items.
 * @param capacity The maximum weight capacity of the knapsack.
 * @param n The current number of items under consideration (initially weights.length).
 * @param memo Optional: A 2D array (matrix) used for memoization.
 * @returns The maximum value that can be put in the knapsack.
 */
export function knapsackMemoization(
    weights: number[],
    values: number[],
    capacity: number,
    n: number = weights.length,
    memo?: number[][]
): number {
    // Initialize memo table if not provided (first call)
    if (memo === undefined) {
        // memo[i][j] will store the max value for 'i' items with 'j' capacity.
        // Dimensions will be (N+1) x (Capacity+1)
        memo = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(-1));
    }

    // Base case: If no items left or knapsack has no capacity
    if (n === 0 || capacity === 0) {
        return 0;
    }

    // Check if the result for this state (n, capacity) is already computed
    if (memo[n][capacity] !== -1) {
        return memo[n][capacity];
    }

    // If the weight of the current item (n-1) is more than the knapsack capacity,
    // this item cannot be included.
    if (weights[n - 1] > capacity) {
        memo[n][capacity] = knapsackMemoization(weights, values, capacity, n - 1, memo);
    } else {
        // If the current item can be included, consider both choices:
        // 1. Include the item: values[n-1] + result for remaining capacity and items.
        // 2. Exclude the item: result for same capacity and remaining items.
        memo[n][capacity] = Math.max(
            values[n - 1] + knapsackMemoization(weights, values, capacity - weights[n - 1], n - 1, memo),
            knapsackMemoization(weights, values, capacity, n - 1, memo)
        );
    }

    return memo[n][capacity];
}

/**
 * Approach 3: Tabulation (Bottom-Up Dynamic Programming)
 *
 * Solves the 0/1 Knapsack problem iteratively using a 2D DP table.
 * Builds up the solution from smaller subproblems to larger ones.
 *
 * Time Complexity: O(N*W) where N is the number of items and W is the capacity.
 *   - Two nested loops iterate N*W times.
 * Space Complexity: O(N*W)
 *   - For the DP table.
 *
 * @param weights An array of weights of items.
 * @param values An array of values of items.
 * @param capacity The maximum weight capacity of the knapsack.
 * @returns The maximum value that can be put in the knapsack.
 */
export function knapsackTabulation(
    weights: number[],
    values: number[],
    capacity: number
): number {
    const n = weights.length;

    // Create a DP table. dp[i][j] will store the maximum value that can be
    // obtained with 'i' items and 'j' capacity.
    // Dimensions: (n+1) x (capacity+1).
    const dp: number[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    // Fill the DP table
    // dp[0][j] = 0 (0 items, 0 value)
    // dp[i][0] = 0 (0 capacity, 0 value)
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= capacity; j++) {
            // Get weight and value of the current item (i-1)
            const currentWeight = weights[i - 1];
            const currentValue = values[i - 1];

            // If the current item's weight is less than or equal to the current capacity 'j'
            if (currentWeight <= j) {
                // Two choices:
                // 1. Include the item: currentValue + dp[i-1][j - currentWeight]
                //    (value of current item + max value from previous items with remaining capacity)
                // 2. Exclude the item: dp[i-1][j]
                //    (max value from previous items with same capacity)
                dp[i][j] = Math.max(
                    currentValue + dp[i - 1][j - currentWeight],
                    dp[i - 1][j]
                );
            } else {
                // If the current item's weight is greater than current capacity 'j',
                // it cannot be included. So, value is same as with previous items.
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    // The maximum value is stored at dp[n][capacity]
    return dp[n][capacity];
}