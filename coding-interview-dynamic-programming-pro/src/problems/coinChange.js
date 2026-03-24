/**
 * @fileoverview Implementations for the Coin Change problem (Minimum Coins).
 *
 * Problem Description:
 * You are given an integer array `coins` representing coins of different denominations and an integer `amount`
 * representing a total amount of money. Return the fewest number of coins that you need to make up that amount.
 * If that amount of money cannot be made up by any combination of the coins, return -1.
 * You may assume that you have an infinite number of each kind of coin.
 */

/**
 * Helper function for `coinChangeMemoization` and `coinChangeTabulation`.
 * Initializes DP table with a value representing infinity.
 * A common large value is `amount + 1` because the maximum number of coins
 * needed for an amount `X` cannot exceed `X` (if coins include 1).
 * This ensures that `amount + 1` is always greater than any valid number of coins.
 *
 * @param {number} amount The target amount.
 * @returns {number} An 'infinity' value for the DP table.
 */
const INF = (amount) => amount + 1;

/**
 * 1. Brute Force (Recursive)
 *
 * This approach tries all possible combinations of coins to make up the amount.
 * For each amount, it iterates through all available coin denominations.
 * If a coin `c` is less than or equal to the current `amount`, it recursively
 * calls itself for `amount - c` and adds 1 (for the current coin `c`).
 * It picks the minimum among all such possibilities.
 *
 * Characteristics:
 * - Simple direct translation of the problem.
 * - Very inefficient due to massive redundant computations (overlapping subproblems).
 *   Example: To calculate `f(10)` with coins `[1, 5, 10]`, it calculates `f(9)`, `f(5)`, `f(0)`.
 *   `f(9)` might then call `f(4)`. `f(5)` might also call `f(4)`.
 *
 * Time Complexity: O(C^A) where C is the number of coin denominations and A is the amount.
 *                  In the worst case, if the smallest coin is 1, the recursion depth can be `A`,
 *                  and at each step, we iterate through `C` options.
 * Space Complexity: O(A) due to recursion stack depth.
 *
 * @param {number[]} coins Array of coin denominations.
 * @param {number} amount The target amount.
 * @returns {number} The minimum number of coins, or -1 if impossible.
 */
function coinChangeBruteForce(coins, amount) {
    // Base cases
    if (amount < 0) return -1; // Amount cannot be negative
    if (amount === 0) return 0; // 0 coins needed for amount 0

    let minCoins = Infinity;

    // Try each coin
    for (const coin of coins) {
        if (amount >= coin) {
            const result = coinChangeBruteForce(coins, amount - coin);
            // If subproblem has a solution (not -1), then consider it
            if (result !== -1) {
                minCoins = Math.min(minCoins, result + 1);
            }
        }
    }

    // If minCoins is still Infinity, it means no combination worked.
    return minCoins === Infinity ? -1 : minCoins;
}

/**
 * 2. Memoization (Top-Down Dynamic Programming)
 *
 * This approach optimizes the brute force recursion by storing the results of subproblems
 * in a cache (`memo` array). Before computing `dp(amount)`, it checks if `dp(amount)` has
 * already been computed. If so, it returns the cached value. Otherwise, it computes it
 * recursively and stores the result before returning.
 *
 * Characteristics:
 * - Effectively eliminates redundant computations.
 * - "Top-down" because it starts from the desired `amount` and breaks it down.
 * - Handles the "overlapping subproblems" property of DP.
 *
 * Time Complexity: O(A * C) where A is the amount and C is the number of coin denominations.
 *                  Each `dp(i)` state is computed once, and for each state, we iterate through C coins.
 * Space Complexity: O(A) for the memoization table and recursion stack.
 *
 * @param {number[]} coins Array of coin denominations.
 * @param {number} amount The target amount.
 * @param {Array<number>} memo Cache to store computed results. Initialize with -2 for uncomputed states.
 * @returns {number} The minimum number of coins, or -1 if impossible.
 */
function coinChangeMemoization(coins, amount, memo = new Array(amount + 1).fill(-2)) {
    // Base cases
    if (amount < 0) return -1;
    if (amount === 0) return 0;

    // If already computed, return the cached value
    if (memo[amount] !== -2) {
        return memo[amount];
    }

    let minCoins = Infinity;

    // Try each coin
    for (const coin of coins) {
        if (amount >= coin) {
            const result = coinChangeMemoization(coins, amount - coin, memo);
            if (result !== -1) {
                minCoins = Math.min(minCoins, result + 1);
            }
        }
    }

    // Store the result in memo and return
    memo[amount] = minCoins === Infinity ? -1 : minCoins;
    return memo[amount];
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds the solution iteratively from the base cases up to the target amount.
 * It uses a DP table `dp` where `dp[i]` represents the minimum number of coins needed
 * to make up amount `i`.
 *
 * `dp[0]` is initialized to 0 (0 coins for 0 amount).
 * All other `dp[i]` are initialized to `amount + 1` (our 'infinity' value) to indicate
 * that they are not yet reachable or require more coins than `amount` itself.
 *
 * For each amount `i` from 1 to `amount`:
 *   For each `coin` in `coins`:
 *     If `i - coin >= 0`:
 *       `dp[i] = min(dp[i], dp[i - coin] + 1)`
 *
 * Characteristics:
 * - Iterative, avoids recursion stack.
 * - Often preferred for its clarity in building the solution step-by-step.
 * - "Bottom-up" because it starts from small amounts and builds towards the target.
 *
 * Time Complexity: O(A * C) where A is the amount and C is the number of coin denominations.
 *                  Outer loop runs `A` times, inner loop runs `C` times.
 * Space Complexity: O(A) for the DP table `dp`.
 *
 * @param {number[]} coins Array of coin denominations.
 * @param {number} amount The target amount.
 * @returns {number} The minimum number of coins, or -1 if impossible.
 */
function coinChangeTabulation(coins, amount) {
    if (amount < 0) return -1; // Handle negative amount case
    if (amount === 0) return 0;

    // dp[i] will store the minimum number of coins to make up amount i
    // Initialize with amount + 1 (representing infinity)
    const dp = new Array(amount + 1).fill(INF(amount));

    // Base case: 0 coins needed for amount 0
    dp[0] = 0;

    // Iterate through all amounts from 1 to `amount`
    for (let i = 1; i <= amount; i++) {
        // For each amount `i`, try to use each coin
        for (const coin of coins) {
            // If the current coin can be used (i.e., amount i - coin is non-negative)
            if (i - coin >= 0) {
                // If dp[i - coin] is reachable (not INF), then we can potentially update dp[i]
                if (dp[i - coin] !== INF(amount)) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
    }

    // If dp[amount] is still INF, it means amount cannot be made up
    return dp[amount] === INF(amount) ? -1 : dp[amount];
}

module.exports = {
    coinChangeBruteForce,
    coinChangeMemoization,
    coinChangeTabulation,
};