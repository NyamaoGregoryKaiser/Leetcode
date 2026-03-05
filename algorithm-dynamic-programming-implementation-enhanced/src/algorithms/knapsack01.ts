```typescript
/**
 * @fileoverview Implementations for the 0/1 Knapsack Problem.
 * Given n items, each with a weight[i] and a value[i], and a knapsack with a maximum capacity,
 * determine the maximum total value that can be carried in the knapsack such that
 * the total weight does not exceed the capacity. Each item can either be included or not included.
 */

/**
 * 1. Recursive (Brute Force)
 * Solves the 0/1 Knapsack problem using a naive recursive approach.
 * For each item, it has two choices: include it or exclude it.
 * This leads to recomputing solutions for the same subproblems.
 *
 * Time Complexity: O(2^n) - Exponential, as for each item, we explore two branches.
 * Space Complexity: O(n) - Due to recursion stack depth.
 *
 * @param weights An array of weights for each item.
 * @param values An array of values for each item.
 * @param capacity The maximum capacity of the knapsack.
 * @param n The current number of items to consider (initially total items).
 * @returns The maximum value that can be carried.
 */
export function knapsack01_recursive(
    weights: number[],
    values: number[],
    capacity: number,
    n: number = weights.length
): number {
    // Base case: If no items left or knapsack capacity is 0, no value can be obtained.
    if (n === 0 || capacity === 0) {
        return 0;
    }

    // If the weight of the current item (n-1) is more than the knapsack capacity,
    // this item cannot be included. Move to the next item.
    if (weights[n - 1] > capacity) {
        return knapsack01_recursive(weights, values, capacity, n - 1);
    } else {
        // Two choices for the current item (n-1):
        // 1. Include the item:
        //    Add its value and recursively call for remaining capacity and items.
        const includeItem =
            values[n - 1] + knapsack01_recursive(weights, values, capacity - weights[n - 1], n - 1);

        // 2. Exclude the item:
        //    Recursively call for the same capacity and remaining items.
        const excludeItem = knapsack01_recursive(weights, values, capacity, n - 1);

        // Return the maximum of the two choices.
        return Math.max(includeItem, excludeItem);
    }
}

/**
 * 2. Memoization (Top-Down Dynamic Programming)
 * Solves the 0/1 Knapsack problem using memoization to store results of subproblems.
 * `memo[n][w]` stores the maximum value for `n` items and `w` capacity.
 *
 * Time Complexity: O(n * capacity) - Each state `(n, w)` is computed once.
 * Space Complexity: O(n * capacity) - For the memoization table and recursion stack.
 *
 * @param weights An array of weights for each item.
 * @param values An array of values for each item.
 * @param capacity The maximum capacity of the knapsack.
 * @returns The maximum value that can be carried.
 */
export function knapsack01_memoized(
    weights: number[],
    values: number[],
    capacity: number
): number {
    const n = weights.length;
    // Initialize memoization table with -1 to indicate uncomputed states.
    // memo[i][j] will store the max value using first 'i' items with 'j' capacity.
    const memo: number[][] = Array(n + 1)
        .fill(0)
        .map(() => Array(capacity + 1).fill(-1));

    function solve(currentItemIndex: number, currentCapacity: number): number {
        // Base case: If no items left or knapsack capacity is 0, no value.
        if (currentItemIndex === 0 || currentCapacity === 0) {
            return 0;
        }

        // Check if the result is already computed
        if (memo[currentItemIndex][currentCapacity] !== -1) {
            return memo[currentItemIndex][currentCapacity];
        }

        // If current item's weight is more than current capacity, skip it.
        if (weights[currentItemIndex - 1] > currentCapacity) {
            memo[currentItemIndex][currentCapacity] = solve(currentItemIndex - 1, currentCapacity);
            return memo[currentItemIndex][currentCapacity];
        } else {
            // Two choices: include or exclude the current item
            const includeItem =
                values[currentItemIndex - 1] +
                solve(currentItemIndex - 1, currentCapacity - weights[currentItemIndex - 1]);
            const excludeItem = solve(currentItemIndex - 1, currentCapacity);

            memo[currentItemIndex][currentCapacity] = Math.max(includeItem, excludeItem);
            return memo[currentItemIndex][currentCapacity];
        }
    }

    // Start with all items and full capacity
    return solve(n, capacity);
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 * Solves the 0/1 Knapsack problem iteratively using a 2D DP table.
 * `dp[i][j]` represents the maximum value that can be obtained using the first `i` items
 * with a knapsack capacity of `j`.
 *
 * `dp[i][j] = max(dp[i-1][j], values[i-1] + dp[i-1][j - weights[i-1]])`
 *
 * Time Complexity: O(n * capacity) - Two nested loops.
 * Space Complexity: O(n * capacity) - For the DP table.
 *
 * @param weights An array of weights for each item.
 * @param values An array of values for each item.
 * @param capacity The maximum capacity of the knapsack.
 * @returns The maximum value that can be carried.
 */
export function knapsack01_tabulated(
    weights: number[],
    values: number[],
    capacity: number
): number {
    const n = weights.length;
    // dp[i][j] will store the maximum value for first 'i' items with capacity 'j'.
    // The DP table has (n+1) rows and (capacity+1) columns.
    const dp: number[][] = Array(n + 1)
        .fill(0)
        .map(() => Array(capacity + 1).fill(0));

    // Fill the DP table
    // Iterate over items (from 1 to n)
    for (let i = 1; i <= n; i++) {
        // Iterate over capacities (from 1 to capacity)
        for (let j = 1; j <= capacity; j++) {
            const currentItemWeight = weights[i - 1]; // Current item's weight
            const currentItemValue = values[i - 1];   // Current item's value

            // If the current item's weight is less than or equal to the current capacity 'j'
            if (currentItemWeight <= j) {
                // We have two options:
                // 1. Include the current item: value + max value from previous items with remaining capacity.
                const valueWithItem = currentItemValue + dp[i - 1][j - currentItemWeight];
                // 2. Exclude the current item: value from previous items with the same capacity.
                const valueWithoutItem = dp[i - 1][j];
                dp[i][j] = Math.max(valueWithItem, valueWithoutItem);
            } else {
                // If the current item's weight is greater than the current capacity 'j',
                // we cannot include this item. So, we take the value from previous items.
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    // The result is in the bottom-right cell of the DP table.
    return dp[n][capacity];
}

/**
 * 4. Space-Optimized Tabulation
 * Solves the 0/1 Knapsack problem with reduced space complexity.
 * Since `dp[i][j]` only depends on `dp[i-1][...]` (values from the previous row),
 * we can optimize space to O(capacity) by only maintaining two rows (current and previous)
 * or even a single row if we iterate carefully from right to left for capacity.
 *
 * Time Complexity: O(n * capacity) - Two nested loops.
 * Space Complexity: O(capacity) - Uses a single 1D array of size `capacity + 1`.
 *
 * @param weights An array of weights for each item.
 * @param values An array of values for each item.
 * @param capacity The maximum capacity of the knapsack.
 * @returns The maximum value that can be carried.
 */
export function knapsack01_spaceOptimized(
    weights: number[],
    values: number[],
    capacity: number
): number {
    const n = weights.length;
    // dp array represents the current row's maximum values for each capacity.
    // dp[j] will store the maximum value for current items with capacity 'j'.
    const dp: number[] = new Array(capacity + 1).fill(0);

    // Iterate over items
    for (let i = 0; i < n; i++) {
        const currentItemWeight = weights[i];
        const currentItemValue = values[i];

        // Iterate over capacity from right to left.
        // This is crucial for space optimization. If we iterate left to right,
        // dp[j - currentItemWeight] would already contain the value for the *current* item,
        // effectively making it an unbounded knapsack. By going right to left,
        // dp[j - currentItemWeight] still holds the value from the *previous* item's consideration,
        // ensuring each item is considered only once (0/1 property).
        for (let j = capacity; j >= currentItemWeight; j--) {
            // max(value without current item, value with current item)
            // dp[j] (without current item) is its value from the previous iteration (i-1)
            // dp[j - currentItemWeight] (from previous iteration i-1) + currentItemValue
            dp[j] = Math.max(dp[j], dp[j - currentItemWeight] + currentItemValue);
        }
    }

    // The result is the maximum value for the full capacity after considering all items.
    return dp[capacity];
}
```