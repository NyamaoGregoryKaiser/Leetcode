```javascript
/**
 * Dynamic Programming: Longest Common Subsequence (LCS)
 *
 * Problem: Given two strings `text1` and `text2`, return the length of their longest common subsequence.
 * If there is no common subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string with some characters
 * (can be none or all) deleted without changing the relative order of the remaining characters.
 * For example, "ace" is a subsequence of "abcde".
 * A common subsequence of two strings is a subsequence that is common to both strings.
 *
 * Example:
 * text1 = "abcde", text2 = "ace"
 * Output: 3 (The longest common subsequence is "ace")
 */

/**
 * Approach 1: Memoization (Top-Down Dynamic Programming)
 *
 * This approach uses recursion with memoization to avoid re-calculating LCS for the same
 * substrings.
 *
 * Recurrence Relation:
 * If text1[i] == text2[j]:
 *   LCS(i, j) = 1 + LCS(i-1, j-1)  (match, include this char in LCS)
 * Else (text1[i] != text2[j]):
 *   LCS(i, j) = max(LCS(i-1, j), LCS(i, j-1)) (mismatch, take max of skipping char from text1 or text2)
 *
 * Base Cases:
 * LCS(i, j) = 0 if i < 0 or j < 0 (one of the strings is empty)
 *
 * Time Complexity: O(m * n) - Each state (i, j) is computed only once.
 * Space Complexity: O(m * n) - For the memoization table and recursion stack.
 *   (m = text1.length, n = text2.length)
 *
 * @param {string} text1 The first string.
 * @param {string} text2 The second string.
 * @param {Object} memo An object used as a cache for storing computed results, e.g., memo['i,j'].
 * @param {number} i Current index in text1 (optional, for recursive calls).
 * @param {number} j Current index in text2 (optional, for recursive calls).
 * @returns {number} The length of the longest common subsequence.
 */
function longestCommonSubsequenceMemoization(text1, text2, memo = {}, i, j) {
    // Initialize i and j for the initial call
    if (i === undefined) i = text1.length - 1;
    if (j === undefined) j = text2.length - 1;

    // Base cases: if either string is exhausted, no more common characters can be found
    if (i < 0 || j < 0) {
        return 0;
    }

    // Check if result is already memoized
    const key = `${i},${j}`;
    if (key in memo) {
        return memo[key];
    }

    let result;
    if (text1[i] === text2[j]) {
        // Characters match: include this character in LCS and move to preceding characters
        result = 1 + longestCommonSubsequenceMemoization(text1, text2, memo, i - 1, j - 1);
    } else {
        // Characters don't match: consider two options and take the maximum
        // 1. Skip character from text1
        // 2. Skip character from text2
        result = Math.max(
            longestCommonSubsequenceMemoization(text1, text2, memo, i - 1, j),
            longestCommonSubsequenceMemoization(text1, text2, memo, i, j - 1)
        );
    }

    // Store the result in memo
    memo[key] = result;
    return result;
}

/**
 * Approach 2: Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds a 2D DP table `dp` where `dp[i][j]` stores the length of the LCS
 * of `text1[0...i-1]` and `text2[0...j-1]`.
 *
 * Initialization:
 * `dp[0][j] = 0` for all `j` (LCS with empty string is 0)
 * `dp[i][0] = 0` for all `i` (LCS with empty string is 0)
 *
 * Iteration:
 * For `i` from 1 to `m` (length of text1):
 *   For `j` from 1 to `n` (length of text2):
 *     If `text1[i-1] === text2[j-1]` (characters match):
 *       `dp[i][j] = 1 + dp[i-1][j-1]`
 *     Else (characters don't match):
 *       `dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])`
 *
 * Time Complexity: O(m * n) - Two nested loops iterate through all cells of the DP table.
 * Space Complexity: O(m * n) - For the 2D DP table.
 *   (m = text1.length, n = text2.length)
 *
 * @param {string} text1 The first string.
 * @param {string} text2 The second string.
 * @returns {number} The length of the longest common subsequence.
 */
function longestCommonSubsequenceTabulation(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // Create a 2D DP table initialized with zeros
    // dp[i][j] will store the LCS of text1[0...i-1] and text2[0...j-1]
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // If characters match at current indices (remember 0-based vs 1-based indexing for dp table)
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // If characters don't match, take the maximum of skipping a character from text1 or text2
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // The result is in the bottom-right cell of the DP table
    return dp[m][n];
}


/**
 * Approach 3: Reconstructing the LCS string (using Tabulation DP table)
 *
 * After computing the DP table using the tabulation method, we can reconstruct the actual LCS string
 * by backtracking through the `dp` table from `dp[m][n]` to `dp[0][0]`.
 *
 * If `text1[i-1] === text2[j-1]`: This character was part of the LCS. Add it and move diagonally up-left.
 * Else (`text1[i-1] !== text2[j-1]`): Move to the cell that contributed to the `max` value (up or left).
 *
 * Time Complexity: O(m + n) - In addition to O(m*n) for building the table, backtracking takes O(m+n) steps.
 * Space Complexity: O(m * n) - For the DP table.
 *
 * @param {string} text1 The first string.
 * @param {string} text2 The second string.
 * @returns {string} The actual longest common subsequence string.
 */
function reconstructLCS(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // Build the DP table (same as tabulation)
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Backtrack to reconstruct the LCS string
    let lcs = [];
    let i = m;
    let j = n;

    while (i > 0 && j > 0) {
        // If characters match, it means this character is part of LCS
        if (text1[i - 1] === text2[j - 1]) {
            lcs.unshift(text1[i - 1]); // Add to the front to maintain order
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            // If the value came from the cell above (skipping text1[i-1])
            i--;
        } else {
            // If the value came from the cell to the left (skipping text2[j-1])
            j--;
        }
    }

    return lcs.join('');
}


module.exports = {
    longestCommonSubsequenceMemoization,
    longestCommonSubsequenceTabulation,
    reconstructLCS,
};
```