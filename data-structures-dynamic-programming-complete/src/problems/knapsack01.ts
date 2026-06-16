```typescript
/**
 * src/problems/knapsack01.ts
 *
 * 0/1 Knapsack Problem
 *
 * Given weights and values of N items, put some items in a knapsack of capacity W
 * to get the maximum total value. Each item can only be picked once.
 * (This is the "0/1" knapsack problem because for each item, you can either take it (1) or not take it (0)).
 */

/**
 * Problem Description: 0/1 Knapsack
 *
 * Input:
 * - `weights`: An array of numbers representing the weight of each item.
 * - `values`: An array of numbers representing the value of each item.
 * - `capacity`: A number representing the maximum weight the knapsack can hold.
 *
 * Output: The maximum total value of items that can be placed in the knapsack.
 *
 * Constraints:
 * - `weights.length` === `values.length` (N items)
 * - All weights and values are non-negative.
 * - Capacity is non-negative.
 *
 * Example:
 * weights = [1, 2, 3]
 * values = [6, 10, 12]
 * capacity = 5
 *
 * Output: 22
 * (Items chosen: item 2 (weight 2, value 10) and item 3 (weight 3, value 12). Total weight 5, total value 22)
 *
 * Key Concept: Overlapping subproblems and optimal substructure.
 * - For each item, we have two choices:
 *   1. Include the item: if its weight is less than or equal to the remaining capacity.
 *      Add its value to the maximum value obtainable from the remaining items and reduced capacity.
 *   2. Exclude the item: Find the maximum value obtainable from the remaining items and the same capacity.
 * - Take the maximum of these two choices.
 */

// --- 1. Brute Force Recursive Solution ---
/**
 * Implements the 0/1 Knapsack problem using a brute-force recursive approach.
 * This solution explores all possible subsets of items, leading to exponential time complexity.
 *
 * Time Complexity: O(2^N), where N is the number of items. For each item, we have two choices (take or not take).
 * Space Complexity: O(N) due to the recursion stack depth.
 *
 * @param {number[]} weights - Array of item weights.
 * @param {number[]} values - Array of item values.
 * @param {number} capacity - Maximum knapsack capacity.
 * @returns {number} The maximum value that can be obtained.
 */
export function knapsack01_BruteForce(weights: number[], values: number[], capacity: number): number {
    const n = weights.length; // Number of items

    // Helper function for recursion
    // `idx` is the current item index we are considering (from n-1 down to 0)
    // `currentCapacity` is the remaining capacity of the knapsack
    function solve(idx: number, currentCapacity: number): number {
        // Base case: If no items left or no capacity remaining
        if (idx === 0 || currentCapacity === 0) {
            return 0;
        }

        // If the weight of the current item is greater than the remaining capacity,
        // we cannot include this item. Move to the next item (previous index).
        if (weights[idx - 1] > currentCapacity) {
            return solve(idx - 1, currentCapacity);
        } else {
            // We have two choices for the current item:
            // 1. Include the item: Add its value and recurse with reduced capacity and previous item.
            //    `values[idx - 1]` is the value of the current item.
            //    `solve(idx - 1, currentCapacity - weights[idx - 1])` is the max value from remaining items with reduced capacity.
            const includeItem = values[idx - 1] + solve(idx - 1, currentCapacity - weights[idx - 1]);

            // 2. Exclude the item: Recurse with the same capacity and previous item.
            const excludeItem = solve(idx - 1, currentCapacity);

            // Return the maximum of these two choices.
            return Math.max(includeItem, excludeItem);
        }
    }

    return solve(n, capacity);
}

// --- 2. Top-Down Dynamic Programming (Memoization) Solution ---
/**
 * Implements the 0/1 Knapsack problem using memoization (top-down DP).
 * This optimizes the brute-force approach by storing results of subproblems
 * in a DP table (or map) to avoid redundant computations.
 *
 * Time Complexity: O(N*W), where N is the number of items and W is the knapsack capacity.
 *                  Each state (idx, currentCapacity) is computed only once.
 * Space Complexity: O(N*W) for the memoization table + O(N) for recursion stack depth.
 *
 * @param {number[]} weights - Array of item weights.
 * @param {number[]} values - Array of item values.
 * @param {number} capacity - Maximum knapsack capacity.
 * @returns {number} The maximum value that can be obtained.
 */
export function knapsack01_Memoized(weights: number[], values: number[], capacity: number): number {
    const n = weights.length;

    // dp table to store results. dp[i][j] will store the max value using first `i` items with capacity `j`.
    // Initialize with -1 to indicate not computed yet.
    const dp: number[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(-1));

    function solve(idx: number, currentCapacity: number): number {
        // Base case: No items or no capacity.
        if (idx === 0 || currentCapacity === 0) {
            return 0;
        }

        // If this subproblem has already been solved, return the stored result.
        if (dp[idx][currentCapacity] !== -1) {
            return dp[idx][currentCapacity];
        }

        let result: number;
        // If current item's weight is more than current capacity, skip it.
        if (weights[idx - 1] > currentCapacity) {
            result = solve(idx - 1, currentCapacity);
        } else {
            // Take the maximum of including or excluding the current item.
            const includeItem = values[idx - 1] + solve(idx - 1, currentCapacity - weights[idx - 1]);
            const excludeItem = solve(idx - 1, currentCapacity);
            result = Math.max(includeItem, excludeItem);
        }

        // Store the computed result before returning.
        dp[idx][currentCapacity] = result;
        return result;
    }

    return solve(n, capacity);
}

// --- 3. Bottom-Up Dynamic Programming (Tabulation) Solution ---
/**
 * Implements the 0/1 Knapsack problem using tabulation (bottom-up DP).
 * This iterative approach builds up the solution from base cases to the final result,
 * explicitly filling a 2D DP table.
 *
 * Time Complexity: O(N*W), where N is the number of items and W is the knapsack capacity.
 *                  Each cell in the dp table is computed once.
 * Space Complexity: O(N*W) for the dp table.
 *
 * @param {number[]} weights - Array of item weights.
 * @param {number[]} values - Array of item values.
 * @param {number} capacity - Maximum knapsack capacity.
 * @returns {number} The maximum value that can be obtained.
 */
export function knapsack01_Tabulated(weights: number[], values: number[], capacity: number): number {
    const n = weights.length;

    // dp[i][w] represents the maximum value that can be obtained from the first `i` items
    // with a knapsack capacity of `w`.
    // Size (n+1) x (capacity+1) to handle base cases (0 items or 0 capacity).
    const dp: number[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    // Fill the dp table
    // i iterates through items (from 1 to N, mapping to weights[i-1] and values[i-1])
    // w iterates through capacities (from 1 to W)
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            // Get current item's weight and value (using 0-based indexing for arrays)
            const currentWeight = weights[i - 1];
            const currentValue = values[i - 1];

            // Option 1: Exclude the current item.
            // The max value would be the same as without considering this item (i-1 items)
            // for the same capacity `w`.
            const excludeItem = dp[i - 1][w];

            // Option 2: Include the current item, ONLY IF its weight is <= current capacity `w`.
            let includeItem = 0; // Default if item cannot be included
            if (currentWeight <= w) {
                // Add the current item's value
                // Plus the max value from previous items (i-1) with reduced capacity (w - currentWeight)
                includeItem = currentValue + dp[i - 1][w - currentWeight];
            }

            // Store the maximum of the two options for dp[i][w].
            dp[i][w] = Math.max(excludeItem, includeItem);
        }
    }

    // The result is in the bottom-right corner of the dp table.
    return dp[n][capacity];
}


// --- 4. Space-Optimized Tabulation Solution ---
/**
 * Implements the 0/1 Knapsack problem using space-optimized tabulation.
 * This version reduces the space complexity from O(N*W) to O(W) by observing
 * that the current row's computation only depends on the previous row.
 * We can use a single 1D array, `dp[w]`, where `dp[w]` represents the maximum value
 * for a knapsack of capacity `w` using items considered so far.
 *
 * To ensure `dp[w - currentWeight]` refers to the *previous* iteration's value (i.e., before
 * the current item was considered), we must iterate `w` from `capacity` down to `currentWeight`.
 * If we iterate `w` upwards, `dp[w - currentWeight]` might already be updated with the
 * current item, leading to incorrect "multiple inclusions" (which is for unbounded knapsack).
 *
 * Time Complexity: O(N*W), where N is the number of items and W is the knapsack capacity.
 * Space Complexity: O(W) for the 1D dp array.
 *
 * @param {number[]} weights - Array of item weights.
 * @param {number[]} values - Array of item values.
 * @param {number} capacity - Maximum knapsack capacity.
 * @returns {number} The maximum value that can be obtained.
 */
export function knapsack01_SpaceOptimized(weights: number[], values: number[], capacity: number): number {
    const n = weights.length;

    // dp array of size (capacity + 1). dp[w] will store the maximum value for capacity `w`.
    // Initialize with 0s, as 0 value is obtained with 0 items or 0 capacity.
    const dp: number[] = Array(capacity + 1).fill(0);

    // Iterate through each item
    for (let i = 0; i < n; i++) {
        const currentWeight = weights[i];
        const currentValue = values[i];

        // Iterate through capacity from right to left (capacity down to currentWeight).
        // This ensures that when we calculate `dp[w]`, `dp[w - currentWeight]` still
        // holds the value from the *previous* item's consideration.
        for (let w = capacity; w >= currentWeight; w--) {
            // We have two choices for the current item `i`:
            // 1. Exclude item `i`: The value remains `dp[w]` (max value without item `i`).
            // 2. Include item `i`: Value is `currentValue` + `dp[w - currentWeight]`
            //    (`dp[w - currentWeight]` is the max value for the remaining capacity `w - currentWeight`
            //     considering items *before* item `i`).
            dp[w] = Math.max(dp[w], currentValue + dp[w - currentWeight]);
        }
    }

    // The result is the maximum value for the full knapsack capacity.
    return dp[capacity];
}

```