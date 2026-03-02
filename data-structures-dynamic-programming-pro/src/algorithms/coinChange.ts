/**
 * src/algorithms/coinChange.ts
 *
 * Problem: Coin Change
 * You are given an integer array `coins` representing coins of different denominations and an integer `amount`
 * representing a total amount of money.
 * Return the fewest number of coins that you need to make up that amount.
 * If that amount of money cannot be made up by any combination of the coins, return -1.
 * You may assume that you have an infinite number of each kind of coin.
 */

import { createMemoCache, getMemoKey } from '../utils/memoizationCache';
import { MemoCache } from '../types';

// Using a large number to represent infinity for minimum calculations
const INF = Number.MAX_SAFE_INTEGER;

// --- Approach 1: Recursive (Brute Force) ---
/**
 * Calculates the minimum number of coins for a given amount using a naive recursive approach.
 * This method explores all possible combinations, leading to redundant computations.
 *
 * Time Complexity: O(amount^number_of_coins) - Exponential, as it recomputes many overlapping subproblems.
 * Space Complexity: O(amount) - Due to the recursion stack depth.
 *
 * @param coins An array of coin denominations.
 * @param amount The total amount to make change for.
 * @returns The minimum number of coins, or -1 if impossible.
 */
export function coinChange_bruteForce(coins: number[], amount: number): number {
    if (amount < 0) {
        throw new Error("Amount cannot be negative.");
    }
    if (amount === 0) {
        return 0;
    }

    let minCoins = INF;

    for (const coin of coins) {
        if (amount - coin >= 0) {
            const result = coinChange_bruteForce(coins, amount - coin);
            if (result !== -1) { // If a valid path exists from the subproblem
                minCoins = Math.min(minCoins, 1 + result);
            }
        }
    }

    return minCoins === INF ? -1 : minCoins;
}

// --- Approach 2: Recursive with Memoization (Top-Down Dynamic Programming) ---
/**
 * Calculates the minimum number of coins for a given amount using recursion with memoization.
 * It stores the results of subproblems (minimum coins for a specific sub-amount) to avoid recomputing them.
 *
 * Time Complexity: O(amount * number_of_coins) - Each subproblem (amount) is computed once,
 *                  and each computation involves iterating through all coin denominations.
 * Space Complexity: O(amount) - For the memoization cache and the recursion stack depth.
 *
 * @param coins An array of coin denominations.
 * @param amount The total amount to make change for.
 * @param memo Optional: A cache to store computed minimum coin counts for sub-amounts.
 * @returns The minimum number of coins, or -1 if impossible.
 */
export function coinChange_memoized(coins: number[], amount: number, memo?: MemoCache<number>): number {
    if (amount < 0) {
        throw new Error("Amount cannot be negative.");
    }
    if (amount === 0) {
        return 0;
    }

    if (!memo) {
        memo = createMemoCache<number>();
    }

    const key = getMemoKey(amount);
    if (memo.has(key)) {
        return memo.get(key)!;
    }

    let minCoins = INF;

    for (const coin of coins) {
        if (amount - coin >= 0) {
            const result = coinChange_memoized(coins, amount - coin, memo);
            if (result !== -1) {
                minCoins = Math.min(minCoins, 1 + result);
            }
        }
    }

    // Store -1 if minCoins is still INF, otherwise store the actual count
    const finalResult = minCoins === INF ? -1 : minCoins;
    memo.set(key, finalResult);
    return finalResult;
}

// --- Approach 3: Iterative with Tabulation (Bottom-Up Dynamic Programming) ---
/**
 * Calculates the minimum number of coins for a given amount using an iterative, bottom-up approach with tabulation.
 * It builds a DP table `dp` where `dp[i]` stores the minimum number of coins required to make change for amount `i`.
 *
 * Time Complexity: O(amount * number_of_coins) - Outer loop runs `amount` times, inner loop runs `number_of_coins` times.
 * Space Complexity: O(amount) - For the DP array.
 *
 * @param coins An array of coin denominations.
 * @param amount The total amount to make change for.
 * @returns The minimum number of coins, or -1 if impossible.
 */
export function coinChange_tabulated(coins: number[], amount: number): number {
    if (amount < 0) {
        throw new Error("Amount cannot be negative.");
    }
    if (amount === 0) {
        return 0;
    }

    // Create a DP table, dp[i] will store the minimum coins needed for amount i.
    // Initialize with INF (a value larger than any possible answer) for all amounts, except dp[0].
    const dp: number[] = Array(amount + 1).fill(INF);

    // Base case: 0 coins are needed for amount 0.
    dp[0] = 0;

    // Iterate through all possible amounts from 1 to `amount`.
    for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
        // For each `currentAmount`, iterate through all available `coins`.
        for (const coin of coins) {
            // If the current coin can be used (i.e., `currentAmount - coin` is non-negative)
            // AND the subproblem `dp[currentAmount - coin]` was solvable (not INF)
            if (currentAmount - coin >= 0 && dp[currentAmount - coin] !== INF) {
                // Update `dp[currentAmount]` with the minimum of its current value
                // and 1 (for the current coin) + the minimum coins for the remaining amount (`dp[currentAmount - coin]`).
                dp[currentAmount] = Math.min(dp[currentAmount], 1 + dp[currentAmount - coin]);
            }
        }
    }

    // If `dp[amount]` is still INF, it means the amount cannot be made up by any combination of coins.
    return dp[amount] === INF ? -1 : dp[amount];
}