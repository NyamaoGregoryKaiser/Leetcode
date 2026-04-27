/**
 * src/problems/longestCommonSubsequence.js
 *
 * Problem: Longest Common Subsequence (LCS)
 *
 * Given two strings `text1` and `text2`, return the length of their longest common subsequence.
 * If there is no common subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string with some characters
 * (can be none) deleted without changing the relative order of the remaining characters.
 * (For example, "ace" is a subsequence of "abcde" while "aec" is not).
 * A common subsequence of two strings is a subsequence that is common to both strings.
 *
 * Example:
 * text1 = "abcde", text2 = "ace"
 * Output: 3 (LCS is "ace")
 *
 * This file implements various approaches:
 * 1. Recursive (Brute Force)
 * 2. Memoization (Top-Down Dynamic Programming)
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 */

const { create2DArray } = require('../utils/helpers');

/**
 * 1. Recursive (Brute Force) Solution
 *
 * The recurrence relation is defined as follows:
 * If text1[i] === text2[j]: LCS(i, j) = 1 + LCS(i-1, j-1)  (match, take this char)
 * If text1[i] !== text2[j]: LCS(i, j) = max(LCS(i-1, j), LCS(i, j-1)) (mismatch, try skipping char from text1 or text2)
 * Base cases: LCS(i, 0) = 0, LCS(0, j) = 0
 *
 * Time Complexity: O(2^(m+n)) - Exponential, where m and n are lengths of strings.
 * Space Complexity: O(m+n) - Due to recursion stack depth.
 *
 * @param {string} text1 - The first string.
 * @param {string} text2 - The second string.
 * @param {number} i - Current index in text1 (from end, or length for initial call).
 * @param {number} j - Current index in text2 (from end, or length for initial call).
 * @returns {number} The length of the LCS.
 */
function longestCommonSubsequenceRecursive(text1, text2, i = text1.length, j = text2.length) {
    // Base cases: if either string is empty, LCS is 0
    if (i === 0 || j === 0) {
        return 0;
    }

    // If characters match, they are part of the LCS
    // Move both pointers back and add 1 to the result
    if (text1[i - 1] === text2[j - 1]) {
        return 1 + longestCommonSubsequenceRecursive(text1, text2, i - 1, j - 1);
    } else {
        // If characters don't match, we have two choices:
        // 1. Skip character from text1 (i-1, j)
        // 2. Skip character from text2 (i, j-1)
        // Take the maximum of these two possibilities
        return Math.max(
            longestCommonSubsequenceRecursive(text1, text2, i - 1, j),
            longestCommonSubsequenceRecursive(text1, text2, i, j - 1)
        );
    }
}

/**
 * 2. Memoization (Top-Down Dynamic Programming) Solution
 *
 * Optimizes the recursive solution by storing the results of subproblems in a 2D cache.
 * `memo[i][j]` stores the LCS length for `text1[0...i-1]` and `text2[0...j-1]`.
 *
 * Time Complexity: O(m*n) - Where m and n are lengths of text1 and text2.
 *                             Each state (i, j) is computed only once.
 * Space Complexity: O(m*n) - For the memoization table and recursion stack.
 *
 * @param {string} text1 - The first string.
 * @param {string} text2 - The second string.
 * @param {number} i - Current index in text1.
 * @param {number} j - Current index in text2.
 * @param {Array<Array<number|undefined>>} memo - Cache for storing results.
 * @returns {number} The length of the LCS.
 */
function longestCommonSubsequenceMemoized(text1, text2, i = text1.length, j = text2.length, memo) {
    // Initialize memo table only once on the first call
    if (memo === undefined) {
        // memo[i][j] stores LCS of text1[0...i-1] and text2[0...j-1]
        memo = create2DArray(text1.length + 1, text2.length + 1, undefined);
    }

    // Base cases
    if (i === 0 || j === 0) {
        return 0;
    }

    // Return cached value if already computed
    if (memo[i][j] !== undefined) {
        return memo[i][j];
    }

    let result;
    if (text1[i - 1] === text2[j - 1]) {
        result = 1 + longestCommonSubsequenceMemoized(text1, text2, i - 1, j - 1, memo);
    } else {
        result = Math.max(
            longestCommonSubsequenceMemoized(text1, text2, i - 1, j, memo),
            longestCommonSubsequenceMemoized(text1, text2, i, j - 1, memo)
        );
    }

    // Store the computed result in memo
    memo[i][j] = result;
    return result;
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming) Solution
 *
 * Builds the solution iteratively using a 2D DP table.
 * `dp[i][j]` stores the length of the LCS of `text1[0...i-1]` and `text2[0...j-1]`.
 *
 * Time Complexity: O(m*n) - Two nested loops iterate through all (m+1)*(n+1) states.
 * Space Complexity: O(m*n) - For the DP table `dp`.
 *
 * @param {string} text1 - The first string.
 * @param {string} text2 - The second string.
 * @returns {number} The length of the LCS.
 */
function longestCommonSubsequenceTabulated(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // dp[i][j] will store the LCS length of text1[0...i-1] and text2[0...j-1]
    // DP table dimensions: (m+1) x (n+1)
    const dp = create2DArray(m + 1, n + 1, 0);

    // Fill the DP table
    // i iterates through text1 (index from 1 to m)
    for (let i = 1; i <= m; i++) {
        // j iterates through text2 (index from 1 to n)
        for (let j = 1; j <= n; j++) {
            // If characters match (text1[i-1] and text2[j-1])
            // Take the diagonal element + 1
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // If characters don't match, take the maximum from:
                // 1. LCS without text1[i-1] (dp[i-1][j])
                // 2. LCS without text2[j-1] (dp[i][j-1])
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // The result is in the bottom-right cell of the DP table
    return dp[m][n];
}

module.exports = {
    longestCommonSubsequenceRecursive,
    longestCommonSubsequenceMemoized,
    longestCommonSubsequenceTabulated,
};