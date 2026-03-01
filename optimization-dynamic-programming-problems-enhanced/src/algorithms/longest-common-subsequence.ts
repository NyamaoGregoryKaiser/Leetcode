/**
 * src/algorithms/longest-common-subsequence.ts
 *
 * This file implements various approaches to find the length of the Longest Common Subsequence (LCS)
 * between two strings. LCS is a fundamental problem in Dynamic Programming, demonstrating
 * 2D DP table construction and state transitions.
 */

/**
 * Approach 1: Recursive (Brute Force)
 *
 * Calculates the length of the LCS using plain recursion.
 * Explores all possible subsequences, leading to redundant computations.
 *
 * Time Complexity: O(2^(m+n)) where m and n are lengths of strings s1 and s2.
 *   - In the worst case, if characters don't match, it makes two recursive calls.
 * Space Complexity: O(m+n)
 *   - Due to the recursion stack depth.
 *
 * @param s1 The first string.
 * @param s2 The second string.
 * @param i Current index in s1 (initially s1.length - 1).
 * @param j Current index in s2 (initially s2.length - 1).
 * @returns The length of the LCS.
 */
export function lcsRecursive(s1: string, s2: string, i = s1.length - 1, j = s2.length - 1): number {
    // Base case: If either string is exhausted, no common subsequence possible
    if (i < 0 || j < 0) {
        return 0;
    }

    // If characters match, they are part of the LCS. Increment count and move diagonally.
    if (s1[i] === s2[j]) {
        return 1 + lcsRecursive(s1, s2, i - 1, j - 1);
    } else {
        // If characters don't match, consider two possibilities:
        // 1. Exclude character from s1 and match s1[0...i-1] with s2[0...j]
        // 2. Exclude character from s2 and match s1[0...i] with s2[0...j-1]
        // Take the maximum of these two possibilities.
        return Math.max(
            lcsRecursive(s1, s2, i - 1, j),
            lcsRecursive(s1, s2, i, j - 1)
        );
    }
}

/**
 * Approach 2: Memoization (Top-Down Dynamic Programming)
 *
 * Calculates the length of the LCS using recursion with memoization.
 * Stores results of subproblems in a 2D array (DP table) to avoid recomputing.
 *
 * Time Complexity: O(m*n) where m and n are lengths of strings s1 and s2.
 *   - Each state (i, j) is computed only once.
 * Space Complexity: O(m*n)
 *   - For the memoization table and recursion stack.
 *
 * @param s1 The first string.
 * @param s2 The second string.
 * @param i Current index in s1 (initially s1.length).
 * @param j Current index in s2 (initially s2.length).
 * @param memo Optional: A 2D array (matrix) used for memoization.
 * @returns The length of the LCS.
 */
export function lcsMemoization(s1: string, s2: string, i = s1.length, j = s2.length, memo?: number[][]): number {
    // Initialize memo table if not provided (first call)
    if (memo === undefined) {
        // dp[i][j] will store LCS length for s1[0...i-1] and s2[0...j-1]
        // Dimensions will be (m+1) x (n+1)
        memo = Array(s1.length + 1).fill(0).map(() => Array(s2.length + 1).fill(-1));
    }

    // Base case: If either string is empty, LCS length is 0
    if (i === 0 || j === 0) {
        return 0;
    }

    // Check if the result for this state (i, j) is already computed
    if (memo[i][j] !== -1) {
        return memo[i][j];
    }

    // If characters match (s1[i-1] and s2[j-1]), include them in LCS
    // and move to previous characters in both strings
    if (s1[i - 1] === s2[j - 1]) {
        memo[i][j] = 1 + lcsMemoization(s1, s2, i - 1, j - 1, memo);
    } else {
        // If characters don't match, take the maximum of:
        // 1. Excluding s1[i-1]
        // 2. Excluding s2[j-1]
        memo[i][j] = Math.max(
            lcsMemoization(s1, s2, i - 1, j, memo),
            lcsMemoization(s1, s2, i, j - 1, memo)
        );
    }

    return memo[i][j];
}

/**
 * Approach 3: Tabulation (Bottom-Up Dynamic Programming)
 *
 * Calculates the length of the LCS iteratively using a 2D DP table.
 * Builds up the solution from smallest subproblems (empty strings) to the full strings.
 *
 * Time Complexity: O(m*n) where m and n are lengths of strings s1 and s2.
 *   - Two nested loops iterate m*n times.
 * Space Complexity: O(m*n)
 *   - For the DP table.
 *
 * @param s1 The first string.
 * @param s2 The second string.
 * @returns The length of the LCS.
 */
export function lcsTabulation(s1: string, s2: string): number {
    const m = s1.length;
    const n = s2.length;

    // Create a DP table. dp[i][j] will store the length of LCS of
    // s1[0...i-1] and s2[0...j-1].
    // Dimensions: (m+1) x (n+1).
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // Fill the DP table
    // Base cases: dp[0][j] = 0 and dp[i][0] = 0 are already initialized to 0.
    // This represents that if one of the strings is empty, LCS is 0.
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // If characters match (s1[i-1] and s2[j-1]),
            // they contribute to the LCS. Add 1 to the LCS of previous characters.
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // If characters don't match, take the maximum of:
                // 1. LCS when excluding s1[i-1] (dp[i-1][j])
                // 2. LCS when excluding s2[j-1] (dp[i][j-1])
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // The length of LCS for s1 and s2 is stored at dp[m][n]
    return dp[m][n];
}