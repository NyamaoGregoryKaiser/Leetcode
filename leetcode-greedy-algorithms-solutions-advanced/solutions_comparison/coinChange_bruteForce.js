```javascript
/**
 * @fileoverview Brute-force (Recursive) solution for the Coin Change Problem.
 *
 * This implementation explores all possible combinations of coins to find the
 * minimum number of coins required to make a given amount. This is significantly
 * less efficient than the greedy (when applicable) or dynamic programming approach
 * but demonstrates a non-optimized way to solve the problem for comparison.
 *
 * Problem Description:
 * Given a set of coin denominations and an amount, find the minimum number of
 * coins required to make up that amount.
 *
 * Approach:
 * For a given amount `A` and a set of denominations `D`:
 * `minCoins(A) = 1 + minCoins(A - d_i)` for all `d_i` in `D` such that `A - d_i >= 0`.
 * This approach tries every coin for every sub-amount.
 */

/**
 * Solves the Coin Change problem using a brute-force recursive approach.
 *
 * @param {Array<number>} denominations - An array of available coin denominations.
 *   Must be positive integers.
 * @param {number} amount - The target amount to make change for. Must be a non-negative integer.
 * @returns {number} The minimum number of coins, or -1 if the amount cannot be made.
 *
 * Time Complexity: O(Amount^D) in the worst case, where D is the number of denominations.
 *                  This can be very slow as it recomputes solutions for the same subproblems
 *                  repeatedly without memoization.
 * Space Complexity: O(Amount) for the recursion stack depth.
 */
function coinChangeBruteForce(denominations, amount) {
  // Base cases:
  if (amount < 0) {
    return -1; // Cannot make change for negative amount
  }
  if (amount === 0) {
    return 0; // 0 coins needed for 0 amount
  }

  let minCount = Infinity;

  // Try each denomination
  for (const coin of denominations) {
    if (amount >= coin) {
      // Recursively find the minimum coins for the remaining amount
      const result = coinChangeBruteForce(denominations, amount - coin);

      // If a valid result is found for the subproblem (not -1), update minCount
      if (result !== -1) {
        minCount = Math.min(minCount, 1 + result);
      }
    }
  }

  // If minCount is still Infinity, it means no combination of coins can make the amount
  return minCount === Infinity ? -1 : minCount;
}

export default coinChangeBruteForce;
```