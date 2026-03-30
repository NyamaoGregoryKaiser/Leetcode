```java
package com.example.dp.problems;

import java.util.Arrays;

/**
 * Implements various approaches to solve the Longest Common Subsequence (LCS) problem.
 * Given two sequences, find the length of the longest subsequence present in both of them.
 * A subsequence is a sequence that can be derived from another sequence by deleting some or
 * no elements without changing the order of the remaining elements.
 *
 * Example:
 * S1 = "AGGTAB", S2 = "GXTXAYB"
 * LCS is "GTAB", length = 4.
 */
public class LongestCommonSubsequence {

    /**
     * Approach 1: Brute Force Recursive Solution
     *
     * This method recursively explores all possible subsequences to find the LCS.
     * It checks characters from the end of the strings.
     *
     * If characters at current indices match, they are part of the LCS, so we add 1
     * and recurse for the preceding parts.
     * If they don't match, we take the maximum of two subproblems:
     * 1. Skipping the last character of S1 and finding LCS of (S1[0...m-2], S2[0...n-1])
     * 2. Skipping the last character of S2 and finding LCS of (S1[0...m-1], S2[0...n-2])
     *
     * Time Complexity: O(2^(m+n)) - In the worst case, each call can lead to two recursive calls.
     * Space Complexity: O(m+n) - Due to recursion stack depth.
     *
     * @param s1 The first string.
     * @param s2 The second string.
     * @return The length of the LCS.
     */
    public int solveBruteForce(String s1, String s2) {
        return solveBruteForce(s1, s2, s1.length(), s2.length());
    }

    private int solveBruteForce(String s1, String s2, int m, int n) {
        // Base case: If either string is empty, LCS is 0.
        if (m == 0 || n == 0) {
            return 0;
        }

        // If characters at current indices match
        if (s1.charAt(m - 1) == s2.charAt(n - 1)) {
            return 1 + solveBruteForce(s1, s2, m - 1, n - 1);
        } else {
            // If characters don't match, take the maximum of two options
            return Math.max(solveBruteForce(s1, s2, m - 1, n),
                            solveBruteForce(s1, s2, m, n - 1));
        }
    }

    /**
     * Approach 2: Recursive Solution with Memoization (Top-Down Dynamic Programming)
     *
     * This approach optimizes the brute-force recursion by storing the results of subproblems
     * in a memoization table (dp array) to avoid redundant computations.
     *
     * The `dp[i][j]` stores the length of LCS of `s1[0...i-1]` and `s2[0...j-1]`.
     *
     * Time Complexity: O(m*n) - Each state `(i, j)` is computed only once.
     * Space Complexity: O(m*n) - For the memoization table + O(m+n) for recursion stack.
     *
     * @param s1 The first string.
     * @param s2 The second string.
     * @return The length of the LCS.
     */
    public int solveMemoized(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();
        // dp[i][j] will store the length of LCS of s1[0...i-1] and s2[0...j-1]
        // Initialize with -1 to indicate not computed.
        int[][] dp = new int[m + 1][n + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return solveMemoized(s1, s2, m, n, dp);
    }

    private int solveMemoized(String s1, String s2, int m, int n, int[][] dp) {
        // Base case: If either string is empty, LCS is 0.
        if (m == 0 || n == 0) {
            return 0;
        }

        // If the result for this subproblem is already computed, return it.
        if (dp[m][n] != -1) {
            return dp[m][n];
        }

        // If characters at current indices match
        if (s1.charAt(m - 1) == s2.charAt(n - 1)) {
            dp[m][n] = 1 + solveMemoized(s1, s2, m - 1, n - 1, dp);
        } else {
            // If characters don't match, take the maximum of two options
            dp[m][n] = Math.max(solveMemoized(s1, s2, m - 1, n, dp),
                                solveMemoized(s1, s2, m, n - 1, dp));
        }
        return dp[m][n];
    }

    /**
     * Approach 3: Iterative Solution (Bottom-Up Dynamic Programming)
     *
     * This approach fills a 2D DP table `dp[i][j]` where `dp[i][j]` represents the
     * length of the LCS of prefixes `s1.substring(0, i)` and `s2.substring(0, j)`.
     *
     * The table is filled iteratively from smaller subproblems to larger ones.
     * Base cases: `dp[0][j] = 0` and `dp[i][0] = 0` for all `i, j`.
     *
     * Recurrence relation:
     * If `s1.charAt(i-1) == s2.charAt(j-1)`: `dp[i][j] = 1 + dp[i-1][j-1]`
     * Else: `dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])`
     *
     * Time Complexity: O(m*n) - Two nested loops iterate through all states.
     * Space Complexity: O(m*n) - For the 2D DP table.
     *
     * @param s1 The first string.
     * @param s2 The second string.
     * @return The length of the LCS.
     */
    public int solveIterative(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();

        // dp[i][j] stores the length of LCS of s1[0...i-1] and s2[0...j-1]
        int[][] dp = new int[m + 1][n + 1];

        // Fill dp table in bottom-up manner
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                // Base cases: if either string is empty, LCS is 0
                if (i == 0 || j == 0) {
                    dp[i][j] = 0;
                }
                // If characters match
                else if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                }
                // If characters don't match
                else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }

    /**
     * Approach 4: Space-Optimized Iterative Solution
     *
     * The iterative DP solution uses a 2D table, but notice that `dp[i][j]` only
     * depends on `dp[i-1][...]` and `dp[i][j-1]`. This means we only need the
     * previous row's values to compute the current row's values.
     *
     * We can optimize space by using only two rows: `prevRow` and `currRow`.
     *
     * Time Complexity: O(m*n) - Same number of computations.
     * Space Complexity: O(n) - We only store two rows of size n.
     *
     * @param s1 The first string.
     * @param s2 The second string.
     * @return The length of the LCS.
     */
    public int solveSpaceOptimized(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();

        // We only need two rows: prevRow and currRow
        int[] prevRow = new int[n + 1];
        int[] currRow = new int[n + 1];

        // Iterate through rows (representing s1)
        for (int i = 1; i <= m; i++) {
            // Iterate through columns (representing s2)
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    currRow[j] = 1 + prevRow[j - 1]; // Use value from previous row, previous column
                } else {
                    currRow[j] = Math.max(prevRow[j], currRow[j - 1]); // Use value from previous row (same col) or current row (prev col)
                }
            }
            // After computing currRow, it becomes the prevRow for the next iteration
            System.arraycopy(currRow, 0, prevRow, 0, n + 1);
            // Alternatively, prevRow = currRow; currRow = new int[n + 1]; (less efficient due to new array creation)
        }
        return currRow[n]; // Or prevRow[n] as currRow is copied to prevRow at the end
    }


    /**
     * Helper method to reconstruct one of the Longest Common Subsequences.
     * This method requires the full DP table computed by `solveIterative` or `solveMemoized`.
     * It backtracks from `dp[m][n]` to `dp[0][0]`.
     *
     * Time Complexity: O(m+n) - In the worst case, we traverse diagonally.
     * Space Complexity: O(m*n) - Requires the DP table. O(LCS_length) for string builder.
     *
     * @param s1 The first string.
     * @param s2 The second string.
     * @param dp The 2D DP table, filled by `solveIterative` or `solveMemoized`.
     * @return One of the LCS strings.
     * @throws IllegalArgumentException If the DP table is not correctly sized or initialized.
     */
    public String reconstructLCS(String s1, String s2, int[][] dp) {
        int m = s1.length();
        int n = s2.length();

        if (dp == null || dp.length != m + 1 || dp[0].length != n + 1) {
            throw new IllegalArgumentException("DP table must be properly initialized for s1 and s2 lengths.");
        }

        StringBuilder lcsBuilder = new StringBuilder();
        int i = m;
        int j = n;

        while (i > 0 && j > 0) {
            // If current characters match, they are part of LCS
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                lcsBuilder.append(s1.charAt(i - 1));
                i--;
                j--;
            }
            // If not matched, move to the direction from which the max value came
            else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--; // Go up
            } else {
                j--; // Go left
            }
        }
        return lcsBuilder.reverse().toString(); // Reverse to get correct order
    }

    /**
     * Helper method to get the DP table for reconstruction from the memoized solution.
     *
     * @param s1 The first string.
     * @param s2 The second string.
     * @return The filled DP table.
     */
    public int[][] getLCSDpTableMemoized(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1); // Initialize with -1 to indicate uncomputed
        }
        // Call memoized solver, which will fill the dp table
        solveMemoized(s1, s2, m, n, dp);
        return dp;
    }

    /**
     * Helper method to get the DP table for reconstruction from the iterative solution.
     * This is straightforward as the iterative solution already builds the full table.
     *
     * @param s1 The first string.
     * @param s2 The second string.
     * @return The filled DP table.
     */
    public int[][] getLCSDpTableIterative(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i == 0 || j == 0) {
                    dp[i][j] = 0;
                } else if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp;
    }
}

```