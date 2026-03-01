/**
 * src/algorithms/house-robber.ts
 *
 * This file implements various approaches to solve the "House Robber" problem.
 * You are a professional robber planning to rob houses along a street. Each house
 * has a certain amount of money stashed. The only constraint stopping you from
 * robbing each of them is that adjacent houses have security systems connected
 * and it will automatically contact the police if two adjacent houses were broken
 * into on the same night. Given an integer array `nums` representing the amount
 * of money in each house, return the maximum amount of money you can rob tonight
 * without alerting the police.
 * This is a classic 1D DP problem, demonstrating linear recurrence relations.
 */

/**
 * Approach 1: Recursive (Brute Force)
 *
 * Solves the House Robber problem using plain recursion.
 * For each house, it considers two possibilities: rob it or skip it.
 *
 * Time Complexity: O(2^N) where N is the number of houses.
 *   - Each call generates two more calls in the worst case.
 * Space Complexity: O(N)
 *   - Due to the recursion stack depth.
 *
 * @param nums An array representing the amount of money in each house.
 * @param i Current index of the house being considered (initially 0).
 * @returns The maximum amount of money that can be robbed.
 */
export function houseRobberRecursive(nums: number[], i: number = 0): number {
    // Base case: If we've gone past the last house, no more money to rob.
    if (i >= nums.length) {
        return 0;
    }

    // Two choices for the current house `i`:
    // 1. Rob the current house: Add its value, then move to house `i+2` (skip adjacent).
    //    `nums[i] + houseRobberRecursive(nums, i + 2)`
    // 2. Skip the current house: Move to house `i+1`.
    //    `houseRobberRecursive(nums, i + 1)`
    // Take the maximum of these two choices.
    return Math.max(
        nums[i] + houseRobberRecursive(nums, i + 2),
        houseRobberRecursive(nums, i + 1)
    );
}

/**
 * Approach 2: Memoization (Top-Down Dynamic Programming)
 *
 * Solves the House Robber problem using recursion with memoization.
 * Stores results of subproblems in an array (DP table) to avoid recomputing.
 *
 * Time Complexity: O(N) where N is the number of houses.
 *   - Each state `i` is computed only once.
 * Space Complexity: O(N)
 *   - For the memoization table and recursion stack.
 *
 * @param nums An array representing the amount of money in each house.
 * @param i Current index of the house being considered (initially 0).
 * @param memo Optional: An array used for memoization.
 * @returns The maximum amount of money that can be robbed.
 */
export function houseRobberMemoization(nums: number[], i: number = 0, memo?: number[]): number {
    // Initialize memo table if not provided (first call)
    if (memo === undefined) {
        // memo[i] will store the max money from robbing houses starting at index `i`.
        // Initialize with -1 to indicate uncomputed states.
        memo = Array(nums.length).fill(-1);
    }

    // Base case: If we've gone past the last house, no more money to rob.
    if (i >= nums.length) {
        return 0;
    }

    // Check if the result for this state `i` is already computed
    if (memo[i] !== -1) {
        return memo[i];
    }

    // Two choices for the current house `i`:
    // 1. Rob the current house: `nums[i]` + max from `i+2`
    // 2. Skip the current house: Max from `i+1`
    memo[i] = Math.max(
        nums[i] + houseRobberMemoization(nums, i + 2, memo),
        houseRobberMemoization(nums, i + 1, memo)
    );

    return memo[i];
}

/**
 * Approach 3: Tabulation (Bottom-Up Dynamic Programming)
 *
 * Solves the House Robber problem iteratively using a 1D DP table.
 * Builds up the solution from smaller subproblems to larger ones.
 *
 * Time Complexity: O(N) where N is the number of houses.
 *   - A single loop iterates N times.
 * Space Complexity: O(N)
 *   - For the DP table.
 *
 * @param nums An array representing the amount of money in each house.
 * @returns The maximum amount of money that can be robbed.
 */
export function houseRobberTabulation(nums: number[]): number {
    const n = nums.length;

    // Handle edge cases for small input arrays
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return nums[0];
    }
    if (n === 2) {
        return Math.max(nums[0], nums[1]);
    }

    // Create a DP table. dp[i] will store the maximum amount of money that can be
    // robbed up to house `i` (including or excluding house `i`).
    const dp: number[] = Array(n).fill(0);

    // Initialize base cases for the DP table
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]); // For the first two houses, either rob 0 or 1.

    // Fill the DP table iteratively
    // For each house `i` (starting from index 2):
    // dp[i] = maximum of:
    // 1. Rob house `i`: `nums[i]` + `dp[i-2]` (cannot rob adjacent `i-1`)
    // 2. Skip house `i`: `dp[i-1]` (take max from previous houses)
    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
    }

    // The result is the maximum amount from robbing up to the last house.
    return dp[n - 1];
}

/**
 * Approach 4: Space-Optimized Tabulation
 *
 * Solves the House Robber problem iteratively using only two variables
 * to store previous results, significantly reducing space complexity.
 * Since `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`, we only need to
 * keep track of the results for the previous two houses.
 *
 * Time Complexity: O(N) where N is the number of houses.
 *   - A single loop iterates N times.
 * Space Complexity: O(1)
 *   - Only a constant number of variables are used, regardless of N.
 *
 * @param nums An array representing the amount of money in each house.
 * @returns The maximum amount of money that can be robbed.
 */
export function houseRobberSpaceOptimized(nums: number[]): number {
    const n = nums.length;

    // Handle edge cases for small input arrays
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return nums[0];
    }
    if (n === 2) {
        return Math.max(nums[0], nums[1]);
    }

    // Initialize variables to store the maximum amounts for previous two houses
    // `prev2` represents dp[i-2]
    // `prev1` represents dp[i-1]
    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);
    let currentMax = 0;

    // Iterate from the third house (index 2) up to the last house
    for (let i = 2; i < n; i++) {
        // Calculate currentMax using the same recurrence relation:
        // currentMax = max(rob current house + money from 2 houses ago, skip current house + money from 1 house ago)
        currentMax = Math.max(nums[i] + prev2, prev1);

        // Update prev2 and prev1 for the next iteration
        prev2 = prev1;
        prev1 = currentMax;
    }

    // The result is the `prev1` after the loop, which holds the max money for the last house.
    return prev1;
}