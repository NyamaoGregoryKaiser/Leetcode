/**
 * @fileoverview Implementations for the Coin Change problem (finding minimum coins).
 */

/**
 * --- Problem Description ---
 * You are given an integer array `coins` representing coins of different denominations and an integer `amount`
 * representing a total amount of money.
 *
 * Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be
 * made up by any combination of the coins, return -1.
 *
 * You may assume that you have an infinite number of each kind of coin.
 *
 * Example 1:
 * Input: coins = [1,2,5], amount = 11
 * Output: 3
 * Explanation: 11 = 5 + 5 + 1
 *
 * Example 2:
 * Input: coins = [2], amount = 3
 * Output: -1
 *
 * Example 3:
 * Input: coins = [1], amount = 0
 * Output: 0
 *
 * Constraints:
 * 1 <= coins.length <= 12
 * 1 <= coins[i] <= 2^31 - 1
 * 0 <= amount <= 10^4
 */

/**
 * 1. Memoization (Top-Down Dynamic Programming)
 * This approach uses recursion with caching to avoid recomputing the minimum coins for the same amount.
 *
 * The state `dp(rem)` represents the minimum number of coins to make `rem` amount.
 * The recurrence relation is: `dp(rem) = min(1 + dp(rem - coin_i))` for all `coin_i` in `coins`.
 * Base cases:
 *   - `dp(0) = 0` (0 coins needed for 0 amount)
 *   - `dp(rem < 0) = Infinity` (invalid state, cannot make change)
 *
 * @param {number[]} coins An array of coin denominations.
 * @param {number} amount The total amount to make change for.
 * @returns {number} The fewest number of coins, or -1 if impossible.
 *
 * Time Complexity: O(coins.length * amount) - Each state `dp[rem]` is computed once. For each state, we iterate through `coins`.
 * Space Complexity: O(amount) - For the memoization table (map) and the recursion stack.
 */
function coinChange_memo(coins, amount) {
    if (amount < 0) return -1; // Invalid amount, though problem constraints state 0 <= amount
    if (amount === 0) return 0;

    const memo = new Map(); // Stores minimum coins for a given amount

    /**
     * Helper recursive function to find the minimum coins for a given remaining amount.
     * @param {number} currentAmount The amount for which to find the minimum coins.
     * @returns {number} The minimum coins needed, or Infinity if impossible.
     */
    function dp(currentAmount) {
        // Base cases
        if (currentAmount < 0) {
            return Infinity; // Cannot make change for negative amount
        }
        if (currentAmount === 0) {
            return 0; // 0 coins needed for 0 amount
        }

        // Check if already computed
        if (memo.has(currentAmount)) {
            return memo.get(currentAmount);
        }

        let minCoins = Infinity;

        // Try each coin denomination
        for (const coin of coins) {
            const result = dp(currentAmount - coin);
            if (result !== Infinity) { // If a valid combination was found for the subproblem
                minCoins = Math.min(minCoins, 1 + result);
            }
        }

        // Store the result before returning
        memo.set(currentAmount, minCoins);
        return minCoins;
    }

    const result = dp(amount);
    return result === Infinity ? -1 : result;
}

/**
 * 2. Tabulation (Bottom-Up Dynamic Programming)
 * This approach builds up the solution iteratively from the base case (amount 0)
 * to the target amount.
 *
 * `dp[i]` will store the minimum number of coins needed to make up amount `i`.
 * Initialization:
 *   - `dp[0] = 0`
 *   - `dp[i] = Infinity` for `i > 0`
 *
 * Recurrence:
 *   For each amount `i` from 1 to `amount`:
 *     For each `coin` in `coins`:
 *       If `i - coin >= 0`:
 *         `dp[i] = min(dp[i], 1 + dp[i - coin])`
 *
 * @param {number[]} coins An array of coin denominations.
 * @param {number} amount The total amount to make change for.
 * @returns {number} The fewest number of coins, or -1 if impossible.
 *
 * Time Complexity: O(coins.length * amount) - Two nested loops: one for amounts, one for coins.
 * Space Complexity: O(amount) - For the DP table `dp`.
 */
function coinChange_tab(coins, amount) {
    if (amount < 0) return -1;
    if (amount === 0) return 0;

    // dp[i] will store the minimum number of coins to make amount i
    // Initialize dp array with Infinity, except for dp[0]
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // 0 coins needed to make amount 0

    // Iterate through all amounts from 1 to the target amount
    for (let i = 1; i <= amount; i++) {
        // For each amount, consider every coin denomination
        for (const coin of coins) {
            // If the current coin can be used (i.e., amount - coin is non-negative)
            if (i - coin >= 0) {
                // Update dp[i] with the minimum of its current value and (1 + dp[i - coin])
                // (1 + dp[i - coin]) means using one 'coin' plus the minimum coins for the remaining amount
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
            }
        }
    }

    // If dp[amount] is still Infinity, it means the amount cannot be made up.
    return dp[amount] === Infinity ? -1 : dp[amount];
}

module.exports = {
    coinChange_memo,
    coinChange_tab
};