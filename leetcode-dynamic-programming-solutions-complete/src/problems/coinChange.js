/**
 * src/problems/coinChange.js
 *
 * Problem: Coin Change (Minimum Number of Coins)
 *
 * Given an array of coin denominations `coins` and a target amount `amount`,
 * write a function to compute the fewest number of coins that you need to make up that amount.
 * If that amount of money cannot be made up by any combination of the coins, return -1.
 * You may assume that you have an infinite number of each kind of coin.
 *
 * Example:
 * coins = [1, 2, 5], amount = 11
 * Output: 3 (11 = 5 + 5 + 1)
 *
 * This file implements various approaches:
 * 1. Recursive (Brute Force)
 * 2. Memoization (Top-Down Dynamic Programming)
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 */

/**
 * Global constant for representing "infinity" or an unreachable state.
 * Used when an amount cannot be made up.
 */
const INF = Infinity;

/**
 * 1. Recursive (Brute Force) Solution
 *
 * For a given `amount`, we try each coin. If we use a coin `c`, the problem reduces to finding
 * the minimum coins for `amount - c`. We take the minimum of all such possibilities + 1 (for the current coin).
 *
 * Time Complexity: O(branches^depth) roughly O(C^A) where C is number of coins and A is amount.
 *                  Exponential, as many subproblems are re-computed.
 * Space Complexity: O(A) - Due to recursion stack depth.
 *
 * @param {number[]} coins - Array of coin denominations.
 * @param {number} amount - The target amount.
 * @returns {number} The fewest number of coins, or -1 if impossible.
 */
function coinChangeRecursive(coins, amount) {
    if (amount < 0) {
        return INF; // This path is invalid
    }
    if (amount === 0) {
        return 0; // Base case: 0 amount needs 0 coins
    }

    let minCoins = INF;

    // Try each coin
    for (const coin of coins) {
        // Recursive call for the remaining amount
        const result = coinChangeRecursive(coins, amount - coin);
        // If the subproblem was solvable and provides a better count
        if (result !== INF) {
            minCoins = Math.min(minCoins, result + 1);
        }
    }

    return minCoins === INF ? -1 : minCoins;
}

/**
 * 2. Memoization (Top-Down Dynamic Programming) Solution
 *
 * Optimizes the recursive solution by caching results of subproblems.
 * `memo[i]` stores the minimum coins needed to make amount `i`.
 *
 * Time Complexity: O(A * C) - Where A is the amount and C is the number of coin denominations.
 *                             Each state `amount` is computed once, and for each state, we iterate
 *                             through all `C` coins.
 * Space Complexity: O(A) - For the memoization table and recursion stack.
 *
 * @param {number[]} coins - Array of coin denominations.
 * @param {number} amount - The target amount.
 * @param {Array<number|undefined>} memo - Cache for storing results, initialized with undefined.
 * @returns {number} The fewest number of coins, or -1 if impossible.
 */
function coinChangeMemoized(coins, amount, memo = new Array(amount + 1).fill(undefined)) {
    if (amount < 0) {
        return INF;
    }
    if (amount === 0) {
        return 0;
    }
    // Return cached value if available
    if (memo[amount] !== undefined) {
        return memo[amount];
    }

    let minCoins = INF;

    for (const coin of coins) {
        const result = coinChangeMemoized(coins, amount - coin, memo);
        if (result !== INF) {
            minCoins = Math.min(minCoins, result + 1);
        }
    }

    // Store the computed result in memo
    memo[amount] = minCoins;
    return minCoins === INF ? -1 : minCoins;
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming) Solution
 *
 * Builds the solution iteratively using a DP table. `dp[i]` will store the minimum number
 * of coins needed to make amount `i`.
 *
 * Time Complexity: O(A * C) - Outer loop for amount `i` from 1 to `A`, inner loop for `C` coins.
 * Space Complexity: O(A) - For the DP table `dp`.
 *
 * @param {number[]} coins - Array of coin denominations.
 * @param {number} amount - The target amount.
 * @returns {number} The fewest number of coins, or -1 if impossible.
 */
function coinChangeTabulated(coins, amount) {
    if (amount < 0) {
        return -1; // Invalid amount
    }
    if (amount === 0) {
        return 0; // 0 amount needs 0 coins
    }

    // dp[i] will store the minimum number of coins needed to make amount i
    // Initialize with Infinity, meaning unreachable
    const dp = new Array(amount + 1).fill(INF);

    // Base case: 0 amount needs 0 coins
    dp[0] = 0;

    // Iterate through all amounts from 1 to `amount`
    for (let i = 1; i <= amount; i++) {
        // For each amount `i`, try every coin
        for (const coin of coins) {
            // If the current coin can be used (i.e., `i - coin` is a non-negative amount)
            // and `dp[i - coin]` is reachable (not INF)
            if (i - coin >= 0 && dp[i - coin] !== INF) {
                // Update dp[i] with the minimum of its current value
                // and (coins needed for dp[i - coin]) + 1 (for the current coin)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    // If dp[amount] is still INF, it means the amount cannot be made up
    return dp[amount] === INF ? -1 : dp[amount];
}

module.exports = {
    coinChangeRecursive,
    coinChangeMemoized,
    coinChangeTabulated,
};