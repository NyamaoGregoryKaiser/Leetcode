```javascript
/**
 * Dynamic Programming: Coin Change Problem (Minimum Number of Coins)
 *
 * Problem: You are given an integer array `coins` representing coin denominations and an integer `amount`
 * representing a total amount of money. Return the fewest number of coins that you need to make up
 * that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
 * You may assume that you have an infinite number of each kind of coin.
 *
 * Example:
 * coins = [1, 2, 5], amount = 11
 * Output: 3 (11 = 5 + 5 + 1)
 */

/**
 * Approach 1: Memoization (Top-Down Dynamic Programming)
 *
 * This approach uses recursion with memoization to avoid redundant calculations.
 * For each amount `i`, we try to use each coin `c` and find the minimum coins for `i - c`.
 *
 * Recurrence Relation:
 * dp[i] = 1 + min(dp[i - c] for all c in coins if i - c >= 0)
 * Base Case:
 * dp[0] = 0 (0 coins needed for amount 0)
 * dp[i] = Infinity initially for i > 0
 *
 * Time Complexity: O(amount * num_coins) - Each state `i` is computed once, and for each state,
 *                  we iterate through `num_coins` denominations.
 * Space Complexity: O(amount) - For the memoization table (cache) and recursion stack.
 *
 * @param {number[]} coins An array of coin denominations.
 * @param {number} amount The target amount.
 * @param {Object<number, number>} memo An object used as a cache for storing computed results.
 * @returns {number} The minimum number of coins needed, or -1 if impossible.
 */
function coinChangeMemoization(coins, amount, memo = {}) {
    // Base cases
    if (amount < 0) {
        return -1; // Cannot make negative amount
    }
    if (amount === 0) {
        return 0; // 0 coins needed for amount 0
    }

    // Check if result is already memoized
    if (amount in memo) {
        return memo[amount];
    }

    let minCoins = Infinity;

    // Try each coin
    for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];
        const res = coinChangeMemoization(coins, amount - coin, memo);

        // If a valid combination is found for amount - coin
        if (res !== -1) {
            minCoins = Math.min(minCoins, res + 1); // +1 for the current coin
        }
    }

    // Store the result in memo
    memo[amount] = (minCoins === Infinity) ? -1 : minCoins;
    return memo[amount];
}

/**
 * Approach 2: Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds the solution iteratively from smaller amounts up to the target amount.
 * It uses a 1D DP array where `dp[i]` stores the minimum number of coins needed to make amount `i`.
 *
 * Initialization:
 * dp[0] = 0 (0 coins for amount 0)
 * dp[i] = Infinity for all i > 0
 *
 * Iteration:
 * For each amount `i` from 1 to `amount`:
 *   For each `coin` in `coins`:
 *     If `i - coin >= 0` and `dp[i - coin]` is not Infinity:
 *       `dp[i] = min(dp[i], dp[i - coin] + 1)`
 *
 * Time Complexity: O(amount * num_coins) - Outer loop runs `amount` times, inner loop `num_coins` times.
 * Space Complexity: O(amount) - For the 1D DP array.
 *
 * @param {number[]} coins An array of coin denominations.
 * @param {number} amount The target amount.
 * @returns {number} The minimum number of coins needed, or -1 if impossible.
 */
function coinChangeTabulation(coins, amount) {
    // dp[i] will store the minimum number of coins to make amount i
    // Initialize with amount + 1, acting as "Infinity" to ensure Math.min works correctly.
    // amount + 1 is greater than any possible valid number of coins.
    const dp = new Array(amount + 1).fill(amount + 1);

    // Base case: 0 coins needed for amount 0
    dp[0] = 0;

    // Iterate through all amounts from 1 to `amount`
    for (let i = 1; i <= amount; i++) {
        // For each amount, consider all available coin denominations
        for (let j = 0; j < coins.length; j++) {
            const coin = coins[j];

            // If the current coin can be used to form amount `i`
            if (i - coin >= 0) {
                // dp[i] = minimum of (current dp[i], 1 + dp[amount remaining after using current coin])
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    // If dp[amount] is still amount + 1, it means the amount cannot be made
    return dp[amount] > amount ? -1 : dp[amount];
}

module.exports = {
    coinChangeMemoization,
    coinChangeTabulation,
};
```