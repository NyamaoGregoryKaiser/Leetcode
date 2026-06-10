```javascript
/**
 * @fileoverview Implementation of the Coin Change problem using a Greedy approach.
 * This implementation applies the greedy strategy where it is applicable.
 *
 * Problem Description:
 * Given a set of coin denominations and an amount, find the minimum number of
 * coins required to make up that amount.
 *
 * IMPORTANT NOTE ON GREEDY APPROACH FOR COIN CHANGE:
 * The greedy approach (always choosing the largest denomination possible)
 * works ONLY for specific "canonical" coin systems (e.g., US currency: 1, 5, 10, 25 cents;
 * Euro currency: 1, 2, 5, 10, 20, 50 cents, 1, 2 Euro).
 *
 * When the greedy approach *fails*:
 * Consider denominations: [1, 3, 4] and amount: 6
 * Greedy approach:
 * 1. Pick 4 (remaining amount: 2)
 * 2. Pick 1 (remaining amount: 1)
 * 3. Pick 1 (remaining amount: 0)
 * Total coins: 3 ([4, 1, 1])
 *
 * Optimal solution for [1, 3, 4] and amount: 6
 * 1. Pick 3 (remaining amount: 3)
 * 2. Pick 3 (remaining amount: 0)
 * Total coins: 2 ([3, 3])
 *
 * For a general coin system, Dynamic Programming (DP) is required to guarantee
 * an optimal solution. This file implements the greedy strategy for educational
 * purposes, but it's crucial to understand its limitations.
 * The `solutions_comparison/` directory includes a DP solution for the general case.
 *
 * Greedy Choice Property (when it works):
 * For canonical coin systems, taking the largest possible coin at each step
 * ensures that you minimize the total number of coins. The reasoning is usually
 * tied to the specific structure of the coin denominations which prevents smaller
 * coins from "combining" in a way that is more efficient than a larger coin.
 *
 * For example, in US currency:
 * - You'd never use two dimes (20 cents) instead of a quarter (25 cents) to make change for 25 cents.
 * - The sum of any number of smaller coins (excluding the next largest coin) is always less than the next largest coin.
 */

/**
 * Calculates the minimum number of coins needed to make a given amount using a greedy strategy.
 *
 * @param {Array<number>} denominations - An array of available coin denominations.
 *   Must be positive integers.
 * @param {number} amount - The target amount to make change for. Must be a non-negative integer.
 * @returns {Object} An object containing:
 *   - {number} minCoins: The minimum number of coins, or -1 if the amount cannot be made.
 *   - {Array<number>} coinsUsed: An array detailing the count of each coin used, e.g.,
 *     [{ denomination: 25, count: 2 }, { denomination: 10, count: 1 }]
 *   Note: This result is optimal ONLY for canonical coin systems.
 *
 * Time Complexity: O(D log D) for sorting denominations (if not pre-sorted) + O(D) for iteration,
 *                  where D is the number of denominations.
 *                  If denominations are already sorted, it's O(D).
 * Space Complexity: O(D) for storing sorted denominations and coins used.
 */
function coinChangeGreedy(denominations, amount) {
  // Edge cases:
  if (amount < 0) {
    return { minCoins: -1, coinsUsed: [] }; // Cannot make change for negative amount
  }
  if (amount === 0) {
    return { minCoins: 0, coinsUsed: [] }; // 0 coins needed for 0 amount
  }
  if (!denominations || denominations.length === 0) {
    return { minCoins: -1, coinsUsed: [] }; // No denominations available
  }

  // 1. Sort denominations in descending order.
  // This is crucial for the greedy strategy: always try the largest available coin first.
  const sortedDenominations = [...denominations].sort((a, b) => b - a);

  let remainingAmount = amount;
  let totalCoins = 0;
  const coinsUsedMap = new Map(); // To store the count of each denomination used

  // 2. Iterate through sorted denominations.
  for (const coin of sortedDenominations) {
    // If the current coin is greater than 0 (valid denomination)
    // and can be used to reduce the remaining amount.
    if (coin > 0 && remainingAmount >= coin) {
      // Calculate how many times this coin can be used.
      const numCoins = Math.floor(remainingAmount / coin);

      // Add to total coins and update remaining amount.
      totalCoins += numCoins;
      remainingAmount -= numCoins * coin;

      // Record which coins were used.
      coinsUsedMap.set(coin, (coinsUsedMap.get(coin) || 0) + numCoins);
    }

    // If the remaining amount becomes 0, we've found a solution.
    if (remainingAmount === 0) {
      break;
    }
  }

  // 3. Check if the amount was fully made.
  if (remainingAmount !== 0) {
    // If remainingAmount is not 0, it means the amount cannot be made with the given denominations
    // using the greedy strategy. This might happen for non-canonical coin systems.
    return { minCoins: -1, coinsUsed: [] };
  }

  // 4. Format the coinsUsed result.
  const coinsUsed = Array.from(coinsUsedMap.entries()).map(([denomination, count]) => ({
    denomination,
    count
  })).sort((a, b) => b.denomination - a.denomination); // Sort by denomination descending for consistent output

  return { minCoins: totalCoins, coinsUsed };
}

export default coinChangeGreedy;
```