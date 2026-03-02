/**
 * src/algorithms/fibonacci.ts
 *
 * Problem: Fibonacci Numbers
 * Calculate the Nth Fibonacci number.
 * The Fibonacci sequence is defined as F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.
 */

import { createMemoCache, getMemoKey } from '../utils/memoizationCache';
import { MemoCache } from '../types';

// --- Approach 1: Recursive (Brute Force) ---
/**
 * Calculates the Nth Fibonacci number using a naive recursive approach.
 * This method recalculates the same subproblems multiple times, leading to inefficiency.
 *
 * Time Complexity: O(2^N) - Exponential, due to redundant computations.
 * Space Complexity: O(N) - Due to the recursion stack depth.
 *
 * @param n The index of the Fibonacci number to calculate (n >= 0).
 * @returns The Nth Fibonacci number.
 */
export function fibonacci_bruteForce(n: number): number {
    if (n < 0) {
        throw new Error("Input must be a non-negative integer.");
    }
    if (n <= 1) {
        return n;
    }
    return fibonacci_bruteForce(n - 1) + fibonacci_bruteForce(n - 2);
}

// --- Approach 2: Recursive with Memoization (Top-Down Dynamic Programming) ---
/**
 * Calculates the Nth Fibonacci number using recursion with memoization.
 * It stores the results of expensive function calls and returns the cached result when the same inputs occur again.
 *
 * Time Complexity: O(N) - Each Fibonacci number from 0 to N is computed once.
 * Space Complexity: O(N) - For the memoization cache and the recursion stack depth.
 *
 * @param n The index of the Fibonacci number to calculate (n >= 0).
 * @param memo Optional: A cache to store computed Fibonacci numbers.
 * @returns The Nth Fibonacci number.
 */
export function fibonacci_memoized(n: number, memo?: MemoCache<number>): number {
    if (n < 0) {
        throw new Error("Input must be a non-negative integer.");
    }

    // Initialize memoization cache if not provided
    if (!memo) {
        memo = createMemoCache<number>();
    }

    const key = getMemoKey(n);
    if (memo.has(key)) {
        return memo.get(key)!;
    }

    if (n <= 1) {
        memo.set(key, n);
        return n;
    }

    const result = fibonacci_memoized(n - 1, memo) + fibonacci_memoized(n - 2, memo);
    memo.set(key, result);
    return result;
}

// --- Approach 3: Iterative with Tabulation (Bottom-Up Dynamic Programming) ---
/**
 * Calculates the Nth Fibonacci number using an iterative, bottom-up approach with tabulation.
 * It builds up the solution from the base cases to the desired Nth number, storing all intermediate results in an array (DP table).
 *
 * Time Complexity: O(N) - A single loop runs N times.
 * Space Complexity: O(N) - For the DP array.
 *
 * @param n The index of the Fibonacci number to calculate (n >= 0).
 * @returns The Nth Fibonacci number.
 */
export function fibonacci_tabulated(n: number): number {
    if (n < 0) {
        throw new Error("Input must be a non-negative integer.");
    }
    if (n <= 1) {
        return n;
    }

    // Create a DP table to store results
    // dp[i] will store the i-th Fibonacci number
    const dp: number[] = new Array(n + 1).fill(0);

    // Base cases
    dp[0] = 0;
    dp[1] = 1;

    // Fill the DP table iteratively
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

// --- Approach 4: Iterative with Space Optimization ---
/**
 * Calculates the Nth Fibonacci number using an iterative approach with space optimization.
 * This method observes that to calculate F(n), we only need F(n-1) and F(n-2).
 * Thus, we can optimize the space complexity from O(N) to O(1).
 *
 * Time Complexity: O(N) - A single loop runs N times.
 * Space Complexity: O(1) - Only a constant number of variables are used.
 *
 * @param n The index of the Fibonacci number to calculate (n >= 0).
 * @returns The Nth Fibonacci number.
 */
export function fibonacci_spaceOptimized(n: number): number {
    if (n < 0) {
        throw new Error("Input must be a non-negative integer.");
    }
    if (n <= 1) {
        return n;
    }

    let a = 0; // Represents F(i-2)
    let b = 1; // Represents F(i-1)
    let currentFib = 0;

    // Loop from 2 to n
    for (let i = 2; i <= n; i++) {
        currentFib = a + b; // F(i) = F(i-2) + F(i-1)
        a = b;             // Update F(i-2) to be the old F(i-1)
        b = currentFib;    // Update F(i-1) to be the current F(i)
    }

    return currentFib;
}