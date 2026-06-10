```javascript
/**
 * @fileoverview Optimized solution for the Coin Change Problem using Dynamic Programming.
 *
 * This is the standard and most efficient way to solve the general Coin Change problem,
 * providing the optimal minimum number of coins for *any* set of denominations.
 * This contrasts with the greedy approach, which only works for canonical coin systems.
 *
 * Problem Description:
 * Given a set of coin denominations and an amount, find the minimum number of
 * coins required to make up that amount.
 *
 * Approach (Dynamic Programming - Bottom-Up):
 * Let `dp[i]` be the minimum number of coins needed to make the amount `i`.
 * To calculate `dp[i]`, we iterate through each coin denomination `d` in the given set.
 * If `i - d >= 0`, then we can potentially make amount `i` by using one coin `d`
 * plus the minimum coins needed for `i - d`.
 * So, `dp[i] = min(1 + dp[i - d])` for all valid denominations `d`.
 * The base case is `dp[0] = 0`. All other `dp[i]` are initialized to `Infinity`.
 */

/**
 * Solves the Coin Change problem using a dynamic programming (bottom-up) approach.
 * This guarantees the optimal minimum number of coins for any coin system.
 *
 * @param {Array<number>} denominations - An array of available coin denominations.
 *   Must be positive integers.
 * @param {number} amount - The target amount to make change for. Must be a non-negative integer.
 * @returns {number} The minimum number of coins, or -1 if the amount cannot be made.
 *
 * Time Complexity: O(amount * D), where `amount` is the target amount and `D` is
 *                  the number of denominations. We fill a `dp` array of size `amount + 1`,
 *                  and for each entry, we iterate through `D` denominations.
 * Space Complexity: O(amount) for the `dp` array.
 */
function coinChangeDP(denominations, amount) {
  // Edge cases:
  if (amount < 0) {
    return -1; // Cannot make change for negative amount
  }
  if (amount === 0) {
    return 0; // 0 coins needed for 0 amount
  }
  if (!denominations || denominations.length === 0) {
    return -1; // No denominations available
  }

  // `dp[i]` will store the minimum number of coins needed to make amount `i`.
  // Initialize `dp` array with `Infinity` for all amounts, except `dp[0]`.
  // `dp[0]` is 0 because 0 coins are needed to make amount 0.
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  // Iterate from amount 1 up to the target amount.
  for (let i = 1; i <= amount; i++) {
    // For each amount `i`, try to use each available coin denomination.
    for (const coin of denominations) {
      // If the current coin `coin` can be used to form amount `i` (i.e., `i - coin` is non-negative)
      // and the subproblem `dp[i - coin]` has a valid solution (not Infinity).
      if (i - coin >= 0 && dp[i - coin] !== Infinity) {
        // Update `dp[i]` with the minimum of its current value
        // and (1 + minimum coins for `i - coin` (i.e., `dp[i - coin]`) plus the current coin).
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
  }

  // After filling the `dp` array, `dp[amount]` will hold the minimum coins.
  // If `dp[amount]` is still `Infinity`, it means the amount cannot be made.
  return dp[amount] === Infinity ? -1 : dp[amount];
}

export default coinChangeDP;
```