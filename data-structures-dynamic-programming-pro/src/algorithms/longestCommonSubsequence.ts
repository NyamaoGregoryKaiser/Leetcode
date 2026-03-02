/**
 * src/algorithms/longestCommonSubsequence.ts
 *
 * Problem: Longest Common Subsequence (LCS)
 * Given two strings `text1` and `text2`, return the length of their longest common subsequence.
 * If there is no common subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string with some characters
 * (can be none) deleted without changing the relative order of the remaining characters.
 * For example, "ace" is a subsequence of "abcde".
 * A common subsequence of two strings is a subsequence that is common to both strings.
 */

import { createMemoCache, getMemoKey } from '../utils/memoizationCache';
import { MemoCache } from '../types';

// --- Approach 1: Recursive (Brute Force) ---
/**
 * Calculates the length of the Longest Common Subsequence (LCS) using a naive recursive approach.
 * This method explores all possible subsequences, leading to redundant computations.
 *
 * Time Complexity: O(2^(M+N)) - Exponential, where M and N are lengths of text1 and text2.
 * Space Complexity: O(M+N) - Due to the recursion stack depth.
 *
 * @param text1 The first string.
 * @param text2 The second string.
 * @param i Current index in text1 (starting from 0).
 * @param j Current index in text2 (starting from 0).
 * @returns The length of the LCS.
 */
export function longestCommonSubsequence_bruteForce(text1: string, text2: string, i: number = 0, j: number = 0): number {
    // Base case: if either string is exhausted
    if (i === text1.length || j === text2.length) {
        return 0;
    }

    // If characters match, they are part of the LCS
    if (text1[i] === text2[j]) {
        return 1 + longestCommonSubsequence_bruteForce(text1, text2, i + 1, j + 1);
    } else {
        // If characters don't match, explore two possibilities:
        // 1. Skip character in text1 and try to match text1[i+1] with text2[j]
        // 2. Skip character in text2 and try to match text1[i] with text2[j+1]
        return Math.max(
            longestCommonSubsequence_bruteForce(text1, text2, i + 1, j),
            longestCommonSubsequence_bruteForce(text1, text2, i, j + 1)
        );
    }
}

// --- Approach 2: Recursive with Memoization (Top-Down Dynamic Programming) ---
/**
 * Calculates the length of the LCS using recursion with memoization.
 * It stores the results of subproblems (LCS length for substrings `text1[i...]` and `text2[j...]`)
 * to avoid recomputing them.
 *
 * Time Complexity: O(M * N) - Each state (i, j) is computed once, where M and N are lengths of text1 and text2.
 * Space Complexity: O(M * N) - For the memoization cache and the recursion stack depth.
 *
 * @param text1 The first string.
 * @param text2 The second string.
 * @param i Current index in text1 (starting from 0).
 * @param j Current index in text2 (starting from 0).
 * @param memo Optional: A cache to store computed LCS lengths.
 * @returns The length of the LCS.
 */
export function longestCommonSubsequence_memoized(text1: string, text2: string, i: number = 0, j: number = 0, memo?: MemoCache<number>): number {
    if (!memo) {
        memo = createMemoCache<number>();
    }

    const key = getMemoKey(i, j);
    if (memo.has(key)) {
        return memo.get(key)!;
    }

    // Base case: if either string is exhausted
    if (i === text1.length || j === text2.length) {
        return 0;
    }

    let result: number;
    if (text1[i] === text2[j]) {
        // If characters match, they are part of the LCS
        result = 1 + longestCommonSubsequence_memoized(text1, text2, i + 1, j + 1, memo);
    } else {
        // If characters don't match, explore two possibilities and take the maximum
        result = Math.max(
            longestCommonSubsequence_memoized(text1, text2, i + 1, j, memo),
            longestCommonSubsequence_memoized(text1, text2, i, j + 1, memo)
        );
    }

    memo.set(key, result);
    return result;
}

// --- Approach 3: Iterative with Tabulation (Bottom-Up Dynamic Programming) ---
/**
 * Calculates the length of the LCS using an iterative, bottom-up approach with tabulation.
 * It builds a 2D DP table `dp` where `dp[i][j]` stores the length of the LCS for `text1.substring(0, i)`
 * and `text2.substring(0, j)`.
 *
 * Time Complexity: O(M * N) - Two nested loops iterate M*N times.
 * Space Complexity: O(M * N) - For the 2D DP table.
 *
 * @param text1 The first string.
 * @param text2 The second string.
 * @returns The length of the LCS.
 */
export function longestCommonSubsequence_tabulated(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;

    // Create a 2D DP table (m+1) x (n+1) and initialize with zeros.
    // dp[i][j] represents LCS length of text1[0...i-1] and text2[0...j-1].
    // We add 1 to dimensions to handle empty string base cases easily (dp[0][j] and dp[i][0] will be 0).
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // If characters match at current positions (i-1 and j-1, due to 1-based indexing of DP table)
            if (text1[i - 1] === text2[j - 1]) {
                // Add 1 to the LCS length of the previous substrings (without these matching characters)
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // If characters don't match, take the maximum LCS length from:
                // 1. Skipping character in text1 (dp[i-1][j])
                // 2. Skipping character in text2 (dp[i][j-1])
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // The result is at the bottom-right corner of the DP table
    return dp[m][n];
}

// --- Approach 4: Iterative with Space Optimization (O(min(M,N)) space) ---
/**
 * Calculates the length of the LCS using an iterative approach with space optimization.
 * It observes that to compute the current row (or column) of the DP table, we only need the values
 * from the previous row (or column). This allows reducing space complexity to O(min(M, N)).
 *
 * To achieve O(min(M,N)) space, we iterate over the shorter string and use a 1D DP array
 * corresponding to the length of the longer string.
 *
 * Time Complexity: O(M * N) - Still two nested loops.
 * Space Complexity: O(min(M, N)) - For the 1D DP array.
 *
 * @param text1 The first string.
 * @param text2 The second string.
 * @returns The length of the LCS.
 */
export function longestCommonSubsequence_spaceOptimized(text1: string, text2: string): number {
    // Ensure text1 is the shorter string for space optimization (or swap them)
    // If text1 is longer, swap them to make the DP array smaller.
    if (text1.length < text2.length) {
        [text1, text2] = [text2, text1]; // Swap text1 and text2
    }

    const m = text1.length; // Longer string length
    const n = text2.length; // Shorter string length

    // dp array represents the current row, initialized with zeros.
    // dp[j] will store the LCS length for text1 up to current 'i' and text2 up to 'j'.
    const dp: number[] = Array(n + 1).fill(0);

    // Iterate through the longer string (text1)
    for (let i = 1; i <= m; i++) {
        // `prev` stores the value of dp[i-1][j-1] from the conceptual 2D table.
        // It's like the diagonal element from the previous row.
        let prev = 0;

        // Iterate through the shorter string (text2)
        for (let j = 1; j <= n; j++) {
            // `temp` will store the current dp[j] value *before* it's updated.
            // This `temp` becomes `prev` for the next iteration (j+1).
            const temp = dp[j];

            if (text1[i - 1] === text2[j - 1]) {
                // If characters match, LCS is 1 + (LCS of previous diagonal)
                dp[j] = 1 + prev;
            } else {
                // If characters don't match, take max of (LCS of current column, previous row)
                // and (LCS of previous column, current row)
                dp[j] = Math.max(dp[j], dp[j - 1]);
            }
            prev = temp; // Update prev for the next iteration (j+1)
        }
    }

    return dp[n]; // The last element of the dp array contains the LCS length
}