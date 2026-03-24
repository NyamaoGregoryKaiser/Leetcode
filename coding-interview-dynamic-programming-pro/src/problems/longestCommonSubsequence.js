/**
 * @fileoverview Implementations for the Longest Common Subsequence (LCS) problem.
 *
 * Problem Description:
 * Given two strings `text1` and `text2`, return the length of their longest common subsequence.
 * A subsequence of a string is a new string generated from the original string with some characters
 * (or no characters) deleted without changing the relative order of the remaining characters.
 * For example, "ace" is a subsequence of "abcde".
 * A common subsequence of two strings is a subsequence that is common to both strings.
 */

/**
 * 1. Brute Force (Recursive)
 *
 * This approach tries all possible subsequences of `text1` and checks if they are also
 * subsequences of `text2`. It's a highly inefficient method, primarily useful for
 * understanding the recursive structure before optimization.
 *
 * The recursion logic:
 * - If either string is empty, the LCS is 0.
 * - If the last characters of `text1` and `text2` match:
 *   The LCS includes this character, so we add 1 and recursively find LCS of
 *   `text1` without its last char and `text2` without its last char.
 * - If the last characters do not match:
 *   The LCS does not include both last characters. We take the maximum of:
 *     1. LCS of `text1` without its last char and `text2`.
 *     2. LCS of `text1` and `text2` without its last char.
 *
 * Characteristics:
 * - Simple translation of the recursive definition.
 * - Extremely inefficient due to repeated computations of overlapping subproblems.
 *
 * Time Complexity: O(2^(m+n)) where m and n are the lengths of text1 and text2.
 *                  This is because at each step where characters don't match, the
 *                  function branches into two recursive calls, leading to exponential growth.
 * Space Complexity: O(m+n) due to recursion stack depth in the worst case.
 *
 * @param {string} text1 The first input string.
 * @param {string} text2 The second input string.
 * @returns {number} The length of the longest common subsequence.
 */
function longestCommonSubsequenceBruteForce(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // Helper recursive function
    function solve(i, j) {
        // Base case: If either string is exhausted, no common subsequence possible
        if (i === 0 || j === 0) {
            return 0;
        }

        // If the last characters match
        if (text1[i - 1] === text2[j - 1]) {
            return 1 + solve(i - 1, j - 1);
        } else {
            // If the last characters don't match, take the maximum of two possibilities:
            // 1. Exclude last char of text1
            // 2. Exclude last char of text2
            return Math.max(solve(i - 1, j), solve(i, j - 1));
        }
    }

    return solve(m, n);
}

/**
 * 2. Memoization (Top-Down Dynamic Programming)
 *
 * This approach optimizes the brute force recursion by storing the results of subproblems
 * in a 2D cache (memoization table `memo`). Before computing `solve(i, j)`, it checks if
 * `memo[i][j]` has already been computed. If so, it returns the cached value.
 * Otherwise, it computes it recursively and stores the result before returning.
 *
 * Characteristics:
 * - Eliminates redundant computations by caching results of subproblems.
 * - "Top-down" approach, starting from the desired `(m, n)` state and breaking it down.
 * - Solves the "overlapping subproblems" issue.
 *
 * Time Complexity: O(m*n) where m and n are the lengths of text1 and text2.
 *                  Each state `(i, j)` in the `m x n` DP table is computed only once.
 * Space Complexity: O(m*n) for the memoization table and O(m+n) for the recursion stack.
 *
 * @param {string} text1 The first input string.
 * @param {string} text2 The second input string.
 * @returns {number} The length of the longest common subsequence.
 */
function longestCommonSubsequenceMemoization(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // Initialize memoization table with -1 to indicate uncomputed states
    // memo[i][j] stores the LCS length for text1[0...i-1] and text2[0...j-1]
    const memo = Array(m + 1).fill(null).map(() => Array(n + 1).fill(-1));

    // Helper recursive function with memoization
    function solve(i, j) {
        // Base case: If either string is exhausted
        if (i === 0 || j === 0) {
            return 0;
        }

        // If result is already computed, return it
        if (memo[i][j] !== -1) {
            return memo[i][j];
        }

        let result;
        // If characters match
        if (text1[i - 1] === text2[j - 1]) {
            result = 1 + solve(i - 1, j - 1);
        } else {
            // If characters don't match
            result = Math.max(solve(i - 1, j), solve(i, j - 1));
        }

        // Store the computed result in memo and return
        memo[i][j] = result;
        return result;
    }

    return solve(m, n);
}

/**
 * 3. Tabulation (Bottom-Up Dynamic Programming)
 *
 * This approach builds the solution iteratively using a 2D DP table `dp`.
 * `dp[i][j]` stores the length of the LCS for `text1.substring(0, i)` and `text2.substring(0, j)`.
 *
 * Initialization:
 * - `dp[0][j]` and `dp[i][0]` are 0 (LCS with an empty string is 0).
 *
 * Iteration:
 * For `i` from 1 to `m` and `j` from 1 to `n`:
 * - If `text1[i-1] === text2[j-1]` (characters match):
 *   `dp[i][j] = 1 + dp[i-1][j-1]` (take the current matching char, add to LCS of previous substrings)
 * - Else (characters don't match):
 *   `dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])` (take the maximum LCS from either excluding `text1[i-1]` or `text2[j-1]`)
 *
 * Characteristics:
 * - Iterative, avoids recursion stack overflow issues for very large inputs.
 * - "Bottom-up" approach, building solutions from smallest subproblems.
 *
 * Time Complexity: O(m*n) where m and n are the lengths of text1 and text2.
 *                  Two nested loops iterate through all `m*n` states.
 * Space Complexity: O(m*n) for the DP table `dp`.
 *
 * @param {string} text1 The first input string.
 * @param {string} text2 The second input string.
 * @returns {number} The length of the longest common subsequence.
 */
function longestCommonSubsequenceTabulation(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // dp[i][j] stores the LCS length for text1[0...i-1] and text2[0...j-1]
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // If characters match
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // If characters don't match
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

/**
 * 4. Space-Optimized Tabulation
 *
 * This approach optimizes the space complexity of tabulation. Notice that to compute
 * `dp[i][j]`, we only need values from the current row (`dp[i][j-1]`) and the previous
 * row (`dp[i-1][j-1]` and `dp[i-1][j]`).
 *
 * This means we only need to store two rows at any given time: the current row being computed
 * and the previous row.
 *
 * Characteristics:
 * - Reduces space complexity significantly while maintaining O(m*n) time complexity.
 * - Can be slightly more complex to implement due to variable management for previous/current rows.
 *
 * Time Complexity: O(m*n)
 * Space Complexity: O(min(m, n)) - If we iterate over the shorter string and use 2 rows of the longer string's length.
 *                   For this implementation, it's O(n) (length of `text2`) because we maintain `prevRow` and `currRow`.
 *                   If m < n, we could swap strings to make it O(m).
 *
 * @param {string} text1 The first input string.
 * @param {string} text2 The second input string.
 * @returns {number} The length of the longest common subsequence.
 */
function longestCommonSubsequenceSpaceOptimized(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // We can optimize space by only keeping track of two rows:
    // `prevRow` for dp[i-1] and `currRow` for dp[i].
    // Initialize both with zeros for base cases (LCS with empty string is 0).
    let prevRow = Array(n + 1).fill(0);
    let currRow = Array(n + 1).fill(0);

    // Iterate through text1 rows
    for (let i = 1; i <= m; i++) {
        // Iterate through text2 columns
        for (let j = 1; j <= n; j++) {
            // If characters match
            if (text1[i - 1] === text2[j - 1]) {
                currRow[j] = 1 + prevRow[j - 1];
            } else {
                // If characters don't match
                currRow[j] = Math.max(prevRow[j], currRow[j - 1]);
            }
        }
        // After computing `currRow` for the current `i`, it becomes `prevRow` for the next `i+1`.
        prevRow = [...currRow]; // Deep copy or assign by reference (if using different variable names)
                                // Using a deep copy to ensure `prevRow` is a snapshot before `currRow` is updated.
                                // Alternatively, swap references: `[prevRow, currRow] = [currRow, prevRow]` if you
                                // manage initialization for `currRow` in each outer loop.
                                // For simplicity and clarity, deep copy is shown here.
    }

    // The result is in the last cell of the last computed row
    return prevRow[n]; // After the loop, prevRow holds the result of the last iteration.
}


module.exports = {
    longestCommonSubsequenceBruteForce,
    longestCommonSubsequenceMemoization,
    longestCommonSubsequenceTabulation,
    longestCommonSubsequenceSpaceOptimized,
};