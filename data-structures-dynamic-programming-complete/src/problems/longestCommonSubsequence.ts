```typescript
/**
 * src/problems/longestCommonSubsequence.ts
 *
 * Longest Common Subsequence (LCS)
 *
 * Given two strings `text1` and `text2`, return the length of their longest common subsequence.
 * If there is no common subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string with some
 * characters (can be none) deleted without changing the relative order of the remaining characters.
 * (For example, "ace" is a subsequence of "abcde" while "aec" is not).
 * A common subsequence of two strings is a subsequence that is common to both strings.
 */

/**
 * Problem Description: Longest Common Subsequence (LCS)
 *
 * Input: Two strings, `text1` and `text2`.
 * Output: The length of their longest common subsequence.
 *
 * Example:
 * text1 = "abcde", text2 = "ace"  => Output: 3 ("ace")
 * text1 = "abc", text2 = "abc"    => Output: 3 ("abc")
 * text1 = "abc", text2 = "def"    => Output: 0
 *
 * Key Concept: Overlapping subproblems and optimal substructure.
 * - If `text1[i-1] == text2[j-1]`, then they contribute to the LCS. The length is 1 + LCS(text1[0...i-2], text2[0...j-2]).
 * - If `text1[i-1] != text2[j-1]`, then one of them must be excluded from the LCS to find the common part.
 *   The length is max(LCS(text1[0...i-2], text2[0...j-1]), LCS(text1[0...i-1], text2[0...j-2])).
 */

// --- 1. Brute Force Recursive Solution ---
/**
 * Implements the Longest Common Subsequence (LCS) using a brute-force recursive approach.
 * This solution recomputes the same subproblems multiple times, leading to exponential time complexity.
 *
 * Time Complexity: O(2^(m+n)) in the worst case, where m and n are the lengths of text1 and text2.
 *                  This is because for each character pair, we potentially make two recursive calls.
 * Space Complexity: O(m+n) due to the recursion stack depth.
 *
 * @param {string} text1 - The first string.
 * @param {string} text2 - The second string.
 * @returns {number} The length of the LCS.
 */
export function longestCommonSubsequence_BruteForce(text1: string, text2: string): number {
    // Helper function for recursion
    function solve(i: number, j: number): number {
        // Base case: If either string is exhausted, no more common characters can be found.
        if (i === 0 || j === 0) {
            return 0;
        }

        // If characters match, they are part of the LCS. Add 1 and recurse for the preceding strings.
        if (text1[i - 1] === text2[j - 1]) {
            return 1 + solve(i - 1, j - 1);
        } else {
            // If characters don't match, we must explore two possibilities:
            // 1. Exclude the last character of text1 and find LCS with text2.
            // 2. Exclude the last character of text2 and find LCS with text1.
            // Take the maximum of these two results.
            return Math.max(solve(i - 1, j), solve(i, j - 1));
        }
    }

    return solve(text1.length, text2.length);
}

// --- 2. Top-Down Dynamic Programming (Memoization) Solution ---
/**
 * Implements the Longest Common Subsequence (LCS) using memoization (top-down DP).
 * This optimizes the brute-force approach by storing the results of subproblems
 * to avoid recomputation, significantly reducing time complexity.
 *
 * Time Complexity: O(m*n), where m and n are the lengths of text1 and text2.
 *                  Each state (i, j) is computed only once.
 * Space Complexity: O(m*n) for the memoization table (dp array) + O(m+n) for recursion stack.
 *
 * @param {string} text1 - The first string.
 * @param {string} text2 - The second string.
 * @returns {number} The length of the LCS.
 */
export function longestCommonSubsequence_Memoized(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;

    // dp table to store results of solve(i, j).
    // Initialize with -1 to indicate not computed yet.
    // dp[i][j] will store LCS length for text1[0...i-1] and text2[0...j-1].
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(-1));

    function solve(i: number, j: number): number {
        // Base case: If either string is exhausted, no common characters.
        if (i === 0 || j === 0) {
            return 0;
        }

        // If this subproblem has already been solved, return the stored result.
        if (dp[i][j] !== -1) {
            return dp[i][j];
        }

        let result: number;
        // If characters match, they contribute to the LCS.
        if (text1[i - 1] === text2[j - 1]) {
            result = 1 + solve(i - 1, j - 1);
        } else {
            // If characters don't match, take the maximum of excluding one character.
            result = Math.max(solve(i - 1, j), solve(i, j - 1));
        }

        // Store the computed result before returning.
        dp[i][j] = result;
        return result;
    }

    return solve(m, n);
}

// --- 3. Bottom-Up Dynamic Programming (Tabulation) Solution ---
/**
 * Implements the Longest Common Subsequence (LCS) using tabulation (bottom-up DP).
 * This iterative approach builds up the solution from base cases to the final result,
 * explicitly filling a DP table.
 *
 * Time Complexity: O(m*n), where m and n are the lengths of text1 and text2.
 *                  Each cell in the dp table is computed once.
 * Space Complexity: O(m*n) for the dp table.
 *
 * @param {string} text1 - The first string.
 * @param {string} text2 - The second string.
 * @returns {number} The length of the LCS.
 */
export function longestCommonSubsequence_Tabulated(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;

    // dp[i][j] will store the length of the LCS for text1[0...i-1] and text2[0...j-1].
    // The table size is (m+1) x (n+1) to handle empty string base cases (row/column 0).
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // Fill the dp table
    // i iterates through text1 (from 1 to m, mapping to text1[i-1])
    // j iterates through text2 (from 1 to n, mapping to text2[j-1])
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // If the current characters match, they extend the LCS by 1.
            // The value comes from the diagonal element (LCS of preceding substrings).
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // If characters do not match, we take the maximum LCS from two possibilities:
                // 1. Excluding the current character from text1 (dp[i-1][j]).
                // 2. Excluding the current character from text2 (dp[i][j-1]).
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // The final result is in the bottom-right corner of the dp table.
    return dp[m][n];
}

// --- 4. Space-Optimized Tabulation Solution ---
/**
 * Implements the Longest Common Subsequence (LCS) using space-optimized tabulation.
 * This version reduces the space complexity from O(m*n) to O(min(m, n)) by observing
 * that the current row's computation only depends on the previous row.
 * We can use two rows (current and previous) instead of the entire 2D table.
 *
 * Time Complexity: O(m*n), where m and n are the lengths of text1 and text2.
 *                  Still needs to iterate through all states.
 * Space Complexity: O(min(m, n)). We use two arrays of size min(m, n) + 1.
 *                  Assuming n is the smaller length, we use O(n) space.
 *
 * @param {string} text1 - The first string.
 * @param {string} text2 - The second string.
 * @returns {number} The length of the LCS.
 */
export function longestCommonSubsequence_SpaceOptimized(text1: string, text2: string): number {
    // Ensure text2 is the shorter string for space optimization to be O(min(m,n))
    // If text1 is shorter, swap them. The LCS length is commutative.
    if (text1.length < text2.length) {
        [text1, text2] = [text2, text1]; // Swap text1 and text2
    }

    const m = text1.length; // Length of the longer string
    const n = text2.length; // Length of the shorter string

    // current_dp stores the results for the current row (current text1 character)
    // prev_dp stores the results for the previous row (previous text1 character)
    // Both arrays are of size n+1, representing LCS with text2 substrings.
    let prev_dp: number[] = Array(n + 1).fill(0);
    let current_dp: number[] = Array(n + 1).fill(0);

    // Iterate through text1 (outer loop)
    for (let i = 1; i <= m; i++) {
        // For each character in text1, we compute a new 'current_dp' row.
        // The first element of current_dp (current_dp[0]) will always be 0 (LCS with empty string).
        for (let j = 1; j <= n; j++) {
            // If characters match
            if (text1[i - 1] === text2[j - 1]) {
                // It's 1 + the LCS of strings excluding these characters.
                // This corresponds to prev_dp[j-1] in the 2D table.
                current_dp[j] = 1 + prev_dp[j - 1];
            } else {
                // If characters don't match, take the maximum of:
                // 1. Excluding current char from text1: prev_dp[j] (value from the row above, same column).
                // 2. Excluding current char from text2: current_dp[j-1] (value from the current row, previous column).
                current_dp[j] = Math.max(prev_dp[j], current_dp[j - 1]);
            }
        }
        // After computing the current row, it becomes the previous row for the next iteration.
        prev_dp = [...current_dp]; // Deep copy current_dp to prev_dp
    }

    // The result is the last element of the final prev_dp (which holds the results of the last row).
    return prev_dp[n];
}

```