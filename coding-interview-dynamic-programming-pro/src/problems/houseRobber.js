/**
 * @fileoverview Implementations for the House Robber problem.
 *
 * Problem Description:
 * You are a professional robber planning to rob houses along a street. Each house has a certain
 * amount of money stashed, the only constraint stopping you from robbing each of them is that
 * adjacent houses have security systems connected and it will automatically contact the police
 * if two adjacent houses are robbed on the same night.
 * Given an integer array `nums` representing the amount of money in each house,
 * return the maximum amount of money you can rob tonight without alerting the police.
 */

/**
 * 1. Brute Force (Recursive)
 *
 * This approach considers two options for each house:
 * 1. Rob the current house: If robbed, you cannot rob the next house (`i+1`), so you move to `i+2`.
 *    Total value: `nums[i] + solve(i+2)`
 * 2. Don't rob the current house: You can then consider robbing the next house (`i+1`).
 *    Total value: `solve(i+1)`
 *
 * The function returns the maximum of these two options.
 *
 * Characteristics:
 * - Simple translation of the decision tree.
 * - Inefficient due to recalculating the same subproblems repeatedly.
 *
 * Time Complexity: O(2^N) where N is the number of houses.
 *                  This is exponential as each decision branches into two possibilities.
 * Space Complexity: O(N) due to recursion stack depth.
 *
 * @param {number[]} nums Array of money in each house.
 * @param {number} i Current house index being considered.
 * @returns {number} Maximum amount that can be robbed from house `i` to `N-1`.
 */
function houseRobberBruteForce(nums, i = 0) {
    // Base case: If we've passed the last house, no more money to rob.
    if (i >= nums.length) {
        return 0;
    }

    // Option 1: Rob current house `i`
    // Add current house's money, then skip next house (i+1) and go to (i+2)
    const robCurrent = nums[i] + houseRobberBruteForce(nums, i + 2);

    // Option 2: Don't rob current house `i`
    // Move to the next house (i+1)
    const skipCurrent = houseRobberBruteForce(nums, i + 1);

    // Return the maximum of the two options
    return Math.max(robCurrent, skipCurrent);
}


/**
 * 2. Memoization (Top-Down Dynamic Programming)
 *
 * This approach optimizes the brute force recursion by storing the results of subproblems
 * in a cache (`memo` array). `memo[i]` stores the maximum amount that can be robbed
 * from house `i` to `N-1`.
 *
 * Before computing `solve(i)`, it checks if `memo[i]` has already been computed.
 * If so, it returns the cached value. Otherwise, it computes it recursively and
 * stores the result before returning.
 *
 * Characteristics:
 * - Eliminates redundant computations.
 * - "Top-down" approach, starting from the overall problem and breaking it down.
 * - Solves the "overlapping subproblems" issue.
 *
 * Time Complexity: O(N) where N is the number of houses.
 *                  Each state `i` is computed only once.
 * Space Complexity: O(N) for the memoization table and O(N) for the recursion stack.
 *
 * @param {number[]} nums Array of money in each house.
 * @param {number} i Current house index being considered.
 * @param {Array<number>} memo Cache to store computed results.
 * @returns {number} Maximum amount that can be robbed from house `i` to `N-1`.
 */
function houseRobberMemoization(nums, i = 0, memo = []) {
    // Base case: If we've passed the last house, no more money to rob.
    if (i >= nums.length) {
        return 0;
    }

    // If result is already computed for this index, return it.
    if (memo[i] !== undefined) {
        return memo[i];
    }

    // Option 1: Rob current house `i`
    const robCurrent = nums[i] + houseRobberMemoization(nums, i + 2, memo);

    // Option 2: Don't rob current house `i`
    const skipCurrent = houseRobberMemoization(nums, i + 1, memo);

    // Store the computed result in memo and return
    memo[i] = Math.max(robCurrent, skipCurrent);
    return memo[i];
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds the solution iteratively using a 1D DP array `dp`.
 * `dp[i]` represents the maximum amount that can be robbed *up to and including* house `i`.
 *
 * Initialization:
 * - `dp[0] = nums[0]` (if exists)
 * - `dp[1] = max(nums[0], nums[1])` (if exists)
 *
 * Iteration:
 * For `i` from 2 to `N-1`:
 *   `dp[i] = Math.max(dp[i-1],          // Don't rob house i, take max from previous houses
 *                     nums[i] + dp[i-2])` // Rob house i, add its value to max from houses up to i-2
 *
 * The final answer is `dp[N-1]`.
 *
 * Characteristics:
 * - Iterative, avoids recursion stack.
 * - "Bottom-up" approach, building solutions from smaller subproblems (fewer houses).
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N) for the DP array `dp`.
 *
 * @param {number[]} nums Array of money in each house.
 * @returns {number} Maximum amount that can be robbed.
 */
function houseRobberTabulation(nums) {
    const N = nums.length;

    // Base cases
    if (N === 0) return 0;
    if (N === 1) return nums[0];

    // dp[i] will store the maximum amount that can be robbed up to house i
    const dp = new Array(N);

    // Initialize base cases for the DP table
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    // Fill the DP table iteratively
    for (let i = 2; i < N; i++) {
        // Option 1: Don't rob current house (i). Max amount is dp[i-1].
        // Option 2: Rob current house (i). Max amount is nums[i] + dp[i-2] (since i-1 cannot be robbed).
        dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
    }

    // The maximum amount is stored in the last element of the dp array.
    return dp[N - 1];
}

/**
 * 4. Space-Optimized Tabulation
 *
 * This approach further optimizes the tabulation method by reducing space complexity.
 * Notice that to compute `dp[i]`, we only need `dp[i-1]` and `dp[i-2]`.
 * This means we only need to store two previous values instead of the entire `dp` array.
 *
 * We can use three variables:
 * - `prev2`: Represents `dp[i-2]`
 * - `prev1`: Represents `dp[i-1]`
 * - `current`: Represents `dp[i]`
 *
 * Initialization:
 * - For `N=0`: `prev2=0, prev1=0`
 * - For `N=1`: `prev2=0, prev1=nums[0]`
 *
 * Iteration:
 * For `i` from 2 to `N-1`:
 *   `current = Math.max(prev1, nums[i] + prev2)`
 *   `prev2 = prev1`
 *   `prev1 = current`
 *
 * The final answer is `prev1`.
 *
 * Characteristics:
 * - Most space-efficient iterative approach.
 * - Time complexity remains O(N).
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1) - Only a constant number of variables are used.
 *
 * @param {number[]} nums Array of money in each house.
 * @returns {number} Maximum amount that can be robbed.
 */
function houseRobberSpaceOptimized(nums) {
    const N = nums.length;

    // Base cases
    if (N === 0) return 0;
    if (N === 1) return nums[0];

    // prev2 stores dp[i-2], prev1 stores dp[i-1]
    let prev2 = 0;        // Represents dp[-1] for i=1, or dp[0] for i=2
    let prev1 = nums[0];  // Represents dp[0] for i=1, or dp[1] for i=2

    // For N=1, the loop won't run, `prev1` already holds the result.
    // We need to handle `N=2` specifically or adjust `prev1` for `N=2`
    // Let's reconsider the initialization for dp[0] and dp[1] from tabulation.
    // When N=1, result is nums[0]. prev1 = nums[0] captures this.
    // When N=2, result is max(nums[0], nums[1]).
    // Let's make `prev1` hold the max robbed up to current house `i-1`.
    // And `prev2` hold the max robbed up to house `i-2`.

    // prev2: max money robbed up to (i-2)th house
    // prev1: max money robbed up to (i-1)th house
    prev2 = 0; // max value up to index -1 (non-existent house)
    prev1 = nums[0]; // max value up to index 0

    // Loop starts from the second house (index 1)
    for (let i = 1; i < N; i++) {
        // current_max_for_i: Max of (not robbing current house, robbing current house)
        // not robbing current house: current max is same as max up to previous house (prev1)
        // robbing current house: current house's money + max up to house (i-2) (prev2)
        const currentMax = Math.max(prev1, nums[i] + prev2);

        // Update prev2 and prev1 for the next iteration
        prev2 = prev1;
        prev1 = currentMax;
    }

    return prev1; // prev1 will hold the max money for the entire N houses.
}


module.exports = {
    houseRobberBruteForce,
    houseRobberMemoization,
    houseRobberTabulation,
    houseRobberSpaceOptimized,
};