/**
 * @fileoverview Implementations for the Longest Common Subsequence (LCS) problem.
 */

/**
 * --- Problem Description ---
 * Given two strings `text1` and `text2`, return the length of their longest common subsequence.
 * If there is no common subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string with some characters
 * (can be none) deleted without changing the relative order of the remaining characters.
 * (For example, "ace" is a subsequence of "abcde" while "aec" is not).
 * A common subsequence of two strings is a subsequence that is common to both strings.
 *
 * Example 1:
 * Input: text1 = "abcde", text2 = "ace"
 * Output: 3
 * Explanation: The longest common subsequence is "ace" and its length is 3.
 *
 * Example 2:
 * Input: text1 = "abc", text2 = "abc"
 * Output: 3
 * Explanation: The longest common subsequence is "abc" and its length is 3.
 *
 * Example 3:
 * Input: text1 = "abc", text2 = "def"
 * Output: 0
 * Explanation: There is no common subsequence, so the result is 0.
 *
 * Constraints:
 * 1 <= text1.length, text2.length <= 1000
 * text1 and text2 consist of only lowercase English characters.
 */

/**
 * 1. Memoization (Top-Down Dynamic Programming)
 * This approach uses recursion with caching (memoization) to store the results of subproblems.
 *
 * The state `dp(i, j)` represents the length of the LCS of `text1[i:]` and `text2[j:]`.
 * Recurrence Relation:
 *   - If `text1[i] === text2[j]`: `dp(i, j) = 1 + dp(i+1, j+1)` (match, include this char)
 *   - If `text1[i] !== text2[j]`: `dp(i, j) = max(dp(i+1, j), dp(i, j+1))` (no match, try skipping char from either text)
 * Base Cases:
 *   - If `i` reaches `text1.length` or `j` reaches `text2.length`: `dp(i, j) = 0` (one string is exhausted)
 *
 * @param {string} text1 The first string.
 * @param {string} text2 The second string.
 * @returns {number} The length of the longest common subsequence.
 *
 * Time Complexity: O(m * n) - Where 'm' is text1.length and 'n' is text2.length. Each state (i, j) is computed once.
 * Space Complexity: O(m * n) - For the memoization table and the recursion stack.
 */
function lcs_memo(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    // Use a 2D array for memoization, initialized with -1 (or null/undefined)
    // memo[i][j] stores the LCS length of text1[i:] and text2[j:]
    const memo = Array(m).fill(null).map(() => Array(n).fill(-1));

    /**
     * Helper recursive function to compute LCS length.
     * @param {number} i Current index in text1.
     * @param {number} j Current index in text2.
     * @returns {number} Length of LCS for text1[i:] and text2[j:].
     */
    function dp(i, j) {
        // Base case: if either string is exhausted
        if (i === m || j === n) {
            return 0;
        }

        // Check if result is already memoized
        if (memo[i][j] !== -1) {
            return memo[i][j];
        }

        let result;
        if (text1[i] === text2[j]) {
            // Characters match, include them in LCS and move to next characters in both strings
            result = 1 + dp(i + 1, j + 1);
        } else {
            // Characters don't match, consider two possibilities:
            // 1. Skip character from text1 and try to find LCS of text1[i+1:] and text2[j:]
            // 2. Skip character from text2 and try to find LCS of text1[i:] and text2[j+1:]
            result = Math.max(dp(i + 1, j), dp(i, j + 1));
        }

        // Store result in memo table before returning
        memo[i][j] = result;
        return result;
    }

    // Start the recursion from the beginning of both strings
    return dp(0, 0);
}


/**
 * 2. Tabulation (Bottom-Up Dynamic Programming)
 * This approach builds up the solution iteratively using a 2D DP table.
 *
 * `dp[i][j]` will store the length of the LCS of `text1[0...i-1]` and `text2[0...j-1]`.
 * This means `dp` table dimensions will be `(m+1) x (n+1)`.
 *
 * Initialization:
 *   - `dp[0][j] = 0` for all `j` (LCS with empty string text1 prefix is 0)
 *   - `dp[i][0] = 0` for all `i` (LCS with empty string text2 prefix is 0)
 *
 * Recurrence Relation:
 *   For `i` from 1 to `m`, and `j` from 1 to `n`:
 *     - If `text1[i-1] === text2[j-1]` (characters match):
 *       `dp[i][j] = 1 + dp[i-1][j-1]`
 *     - Else (characters don't match):
 *       `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`
 *
 * @param {string} text1 The first string.
 * @param {string} text2 The second string.
 * @returns {number} The length of the longest common subsequence.
 *
 * Time Complexity: O(m * n) - Two nested loops iterate through all (m+1) * (n+1) states.
 * Space Complexity: O(m * n) - For the 2D DP table.
 */
function lcs_tab(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // dp[i][j] will store the length of LCS of text1[0...i-1] and text2[0...j-1]
    // The table size is (m+1) x (n+1)
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Fill the dp table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // Compare characters text1[i-1] and text2[j-1] because dp table is 1-indexed for string chars
            if (text1[i - 1] === text2[j - 1]) {
                // Characters match, extend the LCS by 1 from the diagonal previous state
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // Characters don't match, take the maximum LCS from either:
                // 1. Excluding text1[i-1] (dp[i-1][j])
                // 2. Excluding text2[j-1] (dp[i][j-1])
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // The result is in the bottom-right cell of the dp table
    return dp[m][n];
}

module.exports = {
    lcs_memo,
    lcs_tab
};