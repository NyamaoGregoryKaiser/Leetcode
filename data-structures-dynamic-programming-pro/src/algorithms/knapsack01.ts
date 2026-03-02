/**
 * src/algorithms/knapsack01.ts
 *
 * Problem: 0/1 Knapsack Problem
 * Given `n` items, where each item `i` has a weight `weights[i]` and a value `values[i]`,
 * and a knapsack with a maximum capacity `capacity`.
 * Determine the maximum total value of items that can be placed into the knapsack
 * such that the total weight does not exceed the capacity.
 * Each item can either be put into the knapsack (1) or not (0) - you cannot break an item.
 */

import { createMemoCache, getMemoKey } from '../utils/memoizationCache';
import { KnapsackItem, MemoCache } from '../types';

// --- Approach 1: Recursive (Brute Force) ---
/**
 * Solves the 0/1 Knapsack problem using a naive recursive approach.
 * This method explores all possible subsets of items, leading to exponential time complexity.
 * For each item, it considers two choices: include it or exclude it.
 *
 * Time Complexity: O(2^N) - Where N is the number of items.
 * Space Complexity: O(N) - Due to the recursion stack depth.
 *
 * @param items An array of KnapsackItem objects, each with a weight and a value.
 * @param capacity The maximum weight the knapsack can hold.
 * @param currentIndex The index of the current item being considered.
 * @returns The maximum total value.
 */
export function knapsack01_bruteForce(items: KnapsackItem[], capacity: number, currentIndex: number = 0): number {
    // Base case 1: If no items left or capacity is 0
    if (currentIndex >= items.length || capacity <= 0) {
        return 0;
    }

    // If the current item's weight exceeds the remaining capacity, skip it.
    if (items[currentIndex].weight > capacity) {
        return knapsack01_bruteForce(items, capacity, currentIndex + 1);
    }

    // Consider two choices for the current item:
    // Choice 1: Include the current item
    const valueIncludingCurrent = items[currentIndex].value + knapsack01_bruteForce(
        items,
        capacity - items[currentIndex].weight,
        currentIndex + 1
    );

    // Choice 2: Exclude the current item
    const valueExcludingCurrent = knapsack01_bruteForce(items, capacity, currentIndex + 1);

    // Return the maximum of the two choices
    return Math.max(valueIncludingCurrent, valueExcludingCurrent);
}

// --- Approach 2: Recursive with Memoization (Top-Down Dynamic Programming) ---
/**
 * Solves the 0/1 Knapsack problem using recursion with memoization.
 * It stores the results of subproblems (max value for a given capacity and number of items)
 * to avoid recomputing them.
 *
 * Time Complexity: O(N * C) - Where N is the number of items and C is the knapsack capacity.
 *                  Each state (currentIndex, remainingCapacity) is computed once.
 * Space Complexity: O(N * C) - For the memoization cache and the recursion stack depth.
 *
 * @param items An array of KnapsackItem objects.
 * @param capacity The maximum weight the knapsack can hold.
 * @param currentIndex The index of the current item being considered.
 * @param memo Optional: A cache to store computed maximum values.
 * @returns The maximum total value.
 */
export function knapsack01_memoized(items: KnapsackItem[], capacity: number, currentIndex: number = 0, memo?: MemoCache<number>): number {
    // Initialize memoization cache if not provided
    if (!memo) {
        memo = createMemoCache<number>();
    }

    const key = getMemoKey(currentIndex, capacity);
    if (memo.has(key)) {
        return memo.get(key)!;
    }

    // Base case 1: If no items left or capacity is 0
    if (currentIndex >= items.length || capacity <= 0) {
        return 0;
    }

    let result: number;
    // If the current item's weight exceeds the remaining capacity, skip it.
    if (items[currentIndex].weight > capacity) {
        result = knapsack01_memoized(items, capacity, currentIndex + 1, memo);
    } else {
        // Consider two choices for the current item:
        // Choice 1: Include the current item
        const valueIncludingCurrent = items[currentIndex].value + knapsack01_memoized(
            items,
            capacity - items[currentIndex].weight,
            currentIndex + 1,
            memo
        );

        // Choice 2: Exclude the current item
        const valueExcludingCurrent = knapsack01_memoized(items, capacity, currentIndex + 1, memo);

        result = Math.max(valueIncludingCurrent, valueExcludingCurrent);
    }

    memo.set(key, result);
    return result;
}

// --- Approach 3: Iterative with Tabulation (Bottom-Up Dynamic Programming) ---
/**
 * Solves the 0/1 Knapsack problem using an iterative, bottom-up approach with tabulation.
 * It builds a 2D DP table `dp` where `dp[i][c]` represents the maximum value that can be obtained
 * from the first `i` items with a knapsack capacity of `c`.
 *
 * Time Complexity: O(N * C) - Where N is the number of items and C is the knapsack capacity.
 *                  Two nested loops iterate N*C times.
 * Space Complexity: O(N * C) - For the 2D DP table.
 *
 * @param items An array of KnapsackItem objects.
 * @param capacity The maximum weight the knapsack can hold.
 * @returns The maximum total value.
 */
export function knapsack01_tabulated(items: KnapsackItem[], capacity: number): number {
    const numItems = items.length;

    // Create a 2D DP table: dp[i][c] will store the max value using first 'i' items with capacity 'c'.
    // Dimensions: (numItems + 1) x (capacity + 1)
    // Initialize with zeros. dp[0][...] and dp[...][0] are base cases (0 value).
    const dp: number[][] = Array(numItems + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    // Fill the DP table
    for (let i = 1; i <= numItems; i++) {
        const currentItem = items[i - 1]; // items array is 0-indexed, DP table is 1-indexed for items
        for (let c = 1; c <= capacity; c++) {
            // Option 1: Exclude the current item
            // Max value is the same as with i-1 items and same capacity
            const excludeItemValue = dp[i - 1][c];

            // Option 2: Include the current item (if it fits)
            let includeItemValue = 0;
            if (currentItem.weight <= c) {
                // Current item's value + max value from previous items with remaining capacity
                includeItemValue = currentItem.value + dp[i - 1][c - currentItem.weight];
            }

            // Take the maximum of including or excluding the current item
            dp[i][c] = Math.max(excludeItemValue, includeItemValue);
        }
    }

    // The result is at the bottom-right corner of the DP table
    return dp[numItems][capacity];
}

// --- Approach 4: Iterative with Space Optimization (O(C) space) ---
/**
 * Solves the 0/1 Knapsack problem using an iterative approach with space optimization.
 * It observes that to compute the current row of the DP table, we only need values from the
 * previous row. This allows reducing the space complexity from O(N*C) to O(C).
 *
 * To correctly handle the 0/1 constraint (each item used at most once), when iterating
 * through capacities for a given item, we must iterate `backwards` from `capacity` down to `item.weight`.
 * This ensures that `dp[c - item.weight]` refers to the value from the *previous* item's calculation,
 * not the *current* item's calculation (which would be used in unbounded knapsack).
 *
 * Time Complexity: O(N * C) - Two nested loops.
 * Space Complexity: O(C) - For the 1D DP array.
 *
 * @param items An array of KnapsackItem objects.
 * @param capacity The maximum weight the knapsack can hold.
 * @returns The maximum total value.
 */
export function knapsack01_spaceOptimized(items: KnapsackItem[], capacity: number): number {
    // Create a 1D DP array: dp[c] will store the max value for capacity 'c'.
    // Initialize with zeros.
    const dp: number[] = Array(capacity + 1).fill(0);

    // Iterate through each item
    for (const item of items) {
        // Iterate through capacities from `capacity` down to `item.weight`.
        // Iterating backwards is crucial for 0/1 knapsack:
        // When considering dp[c - item.weight], we need the value from the *previous* item's state.
        // If we iterate forwards, dp[c - item.weight] would already be updated with the *current* item,
        // effectively allowing the same item to be picked multiple times (unbounded knapsack).
        for (let c = capacity; c >= item.weight; c--) {
            // Option 1: Don't include the current item (dp[c] already holds this value from previous iteration)
            // Option 2: Include the current item (item.value + dp[c - item.weight])
            dp[c] = Math.max(dp[c], item.value + dp[c - item.weight]);
        }
    }

    // The last element of the DP array contains the maximum value for the full capacity.
    return dp[capacity];
}