```typescript
/**
 * src/algorithms/coin-change.ts
 *
 * This file implements a greedy approach to the Coin Change Problem.
 *
 * IMPORTANT NOTE:
 * The greedy approach to the Coin Change problem works ONLY for specific,
 * "canonical" coin systems (e.g., US currency: 1, 5, 10, 25, 100 cents;
 * Euro currency: 1, 2, 5, 10, 20, 50 cents, 1, 2 euros).
 * It fails for arbitrary coin denominations.
 *
 * Problem Description (Greedy Variant):
 * Given an amount and a set of coin denominations (typically sorted in descending order),
 * find the minimum number of coins required to make up that amount.
 * The greedy choice is to always pick the largest denomination coin that is less than or
 * equal to the remaining amount.
 *
 * Example (US currency):
 * Denominations: [25, 10, 5, 1]
 * Amount: 63
 *
 * Greedy selection:
 * 1. Take two 25-cent coins (50 cents). Remaining: 13. Coins: [25, 25]
 * 2. Take one 10-cent coin (10 cents). Remaining: 3.  Coins: [25, 25, 10]
 * 3. Take three 1-cent coins (3 cents). Remaining: 0.  Coins: [25, 25, 10, 1, 1, 1]
 * Total coins: 2 + 1 + 3 = 6 coins.
 * This is optimal for US currency.
 *
 * Example where greedy fails:
 * Denominations: [1, 3, 4]
 * Amount: 6
 *
 * Greedy selection:
 * 1. Take one 4-unit coin. Remaining: 2. Coins: [4]
 * 2. Take two 1-unit coins. Remaining: 0. Coins: [4, 1, 1]
 * Total coins: 3.
 *
 * Optimal for [1, 3, 4] and Amount 6:
 * Take two 3-unit coins. Remaining: 0. Coins: [3, 3]
 * Total coins: 2.
 *
 * For arbitrary coin systems, Dynamic Programming (DP) is required (e.g., using `min_coins[i] = min(min_coins[i - coin_j] + 1)`).
 */

/**
 * Solves the Coin Change Problem using a greedy approach.
 *
 * The algorithm attempts to use the largest possible coin at each step.
 *
 * Algorithm Steps:
 * 1. Ensure the `denominations` array is sorted in descending order.
 *    (If not, sort it first. It's assumed to be pre-sorted for efficiency here).
 * 2. Initialize `coinCount` to 0 and `resultCoins` to an empty array.
 * 3. Iterate through the `denominations` array from largest to smallest:
 *    a. While the current `amount` is greater than or equal to the current `denomination`:
 *       i. Subtract the `denomination` from the `amount`.
 *       ii. Increment `coinCount`.
 *       iii. Add the `denomination` to `resultCoins`.
 * 4. After iterating through all denominations, if the `amount` is 0, then a solution
 *    was found. Return `coinCount` and `resultCoins`.
 *    If `amount` is not 0, it means the exact amount cannot be made with the given denominations
 *    using the greedy strategy.
 *
 * Time Complexity:
 * - Sorting denominations (if not pre-sorted): O(D log D), where D is the number of denominations.
 * - Iterating through denominations and subtracting: In the worst case, for each denomination,
 *   we might repeatedly subtract it. The number of subtractions can be `amount / smallest_denomination`.
 *   So, approximately O(D * (Amount / min_denomination)).
 * - However, typically, `Amount / min_denomination` can be approximated as `Amount`.
 *   If denominations are fixed and `D` is small (e.g., 4-8 for real-world currency),
 *   this is effectively O(Amount). More precisely, it's O(D + Amount / min(denominations)).
 * - Total Time Complexity: O(D + A/min_denom) or O(D log D + D * A/min_denom) if sorting is included.
 *   For competitive programming, often simplified to O(D * Amount) if iterations are considered.
 *   Given fixed D, it's efficient for this specific greedy use case.
 *
 * Space Complexity:
 * - Storing `resultCoins`: O(Amount / min_denomination) in the worst case (e.g., all 1-unit coins).
 * - Total Space Complexity: O(Amount).
 *
 * @param denominations An array of available coin denominations, typically sorted in descending order.
 * @param amount The target amount to make change for.
 * @returns An object containing the minimum number of coins and the specific coins used.
 *          Returns `{ numCoins: -1, usedCoins: [] }` if the amount cannot be made greedily.
 */
export function greedyCoinChange(denominations: number[], amount: number): { numCoins: number, usedCoins: number[] } {
    // Edge case: Negative amount or zero amount
    if (amount < 0) {
        return { numCoins: -1, usedCoins: [] };
    }
    if (amount === 0) {
        return { numCoins: 0, usedCoins: [] };
    }

    // Ensure denominations are sorted in descending order for the greedy strategy.
    // Create a copy to avoid modifying the original array.
    const sortedDenominations = [...denominations].sort((a, b) => b - a);

    let currentAmount = amount;
    let numCoins = 0;
    const usedCoins: number[] = [];

    // Iterate through denominations from largest to smallest.
    for (const coin of sortedDenominations) {
        // While the current coin can be used and currentAmount is not zero
        while (currentAmount >= coin) {
            currentAmount -= coin;
            numCoins++;
            usedCoins.push(coin);

            // Optimization: if amount becomes 0, we found a solution
            if (currentAmount === 0) {
                return { numCoins, usedCoins };
            }
        }
    }

    // If after trying all denominations, the currentAmount is not zero,
    // it means the exact amount cannot be made using the greedy strategy.
    return { numCoins: -1, usedCoins: [] };
}

// --- Brute Force vs. Optimized (Greedy / DP) Discussion ---
/*
* Brute Force Approach:
*   A brute force solution would involve exploring all possible combinations of coins
*   to find the one that sums to the target amount with the minimum number of coins.
*   This can be implemented recursively. For each coin, you can either take it or not,
*   or for each amount, you can try subtracting each coin. This leads to a very high
*   time complexity, potentially exponential in the amount for small denominations
*   or in the number of denominations.

* Dynamic Programming (DP) Approach (for general denominations, where greedy fails):
*   A DP approach provides the optimal solution for *any* set of denominations.
*   Let `dp[i]` be the minimum number of coins to make change for amount `i`.
*   `dp[0] = 0`
*   For `i` from 1 to `amount`:
*     `dp[i] = infinity`
*     For each `coin` in `denominations`:
*       If `i >= coin` and `dp[i - coin]` is not `infinity`:
*         `dp[i] = min(dp[i], dp[i - coin] + 1)`
*   The final answer is `dp[amount]`.
*   Time Complexity: O(Amount * D), where D is the number of denominations.
*   Space Complexity: O(Amount).
*   This DP approach is generally preferred and correct for the *true* minimum coin change problem,
*   as the greedy solution is only correct for canonical coin systems.

* Optimized (Greedy) Approach:
*   As implemented above, this is an "optimized" approach specific to cases where
*   the greedy choice is known to be optimal. It's much faster than DP for those
*   specific cases because it avoids the nested loop structure of DP that iterates
*   through all subproblems up to `amount`. Its time complexity is closer to O(D + Amount / min_denomination).
*   The key is to *know* when greedy is applicable and when DP is necessary.
*/

// --- ASCII Art Diagram for Greedy Coin Change Logic ---
/*
Target Amount: 63
Denominations (sorted descending): [25, 10, 5, 1]

Knapsack-like process:
+-------------------------------------------------------------+
|                                                             | Amount = 63
+-------------------------------------------------------------+

1. Current Coin = 25
   - Amount (63) >= 25? Yes. Take 25.
     Amount = 63 - 25 = 38. Coins: [25]
   - Amount (38) >= 25? Yes. Take 25.
     Amount = 38 - 25 = 13. Coins: [25, 25]
   - Amount (13) >= 25? No. Move to next denomination.

+-------------------------------------------------------------+
|25¢ 25¢                                                      | Amount = 13
+-------------------------------------------------------------+

2. Current Coin = 10
   - Amount (13) >= 10? Yes. Take 10.
     Amount = 13 - 10 = 3. Coins: [25, 25, 10]
   - Amount (3) >= 10? No. Move to next denomination.

+-------------------------------------------------------------+
|25¢ 25¢ 10¢                                                  | Amount = 3
+-------------------------------------------------------------+

3. Current Coin = 5
   - Amount (3) >= 5? No. Move to next denomination.

+-------------------------------------------------------------+
|25¢ 25¢ 10¢                                                  | Amount = 3
+-------------------------------------------------------------+

4. Current Coin = 1
   - Amount (3) >= 1? Yes. Take 1.
     Amount = 3 - 1 = 2. Coins: [25, 25, 10, 1]
   - Amount (2) >= 1? Yes. Take 1.
     Amount = 2 - 1 = 1. Coins: [25, 25, 10, 1, 1]
   - Amount (1) >= 1? Yes. Take 1.
     Amount = 1 - 1 = 0. Coins: [25, 25, 10, 1, 1, 1]
   - Amount is 0. Done.

+-------------------------------------------------------------+
|25¢ 25¢ 10¢ 1¢ 1¢ 1¢                                         | Amount = 0
+-------------------------------------------------------------+

Final Result: 6 coins ([25, 25, 10, 1, 1, 1])
*/
```