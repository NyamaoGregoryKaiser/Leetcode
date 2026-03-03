```java
package com.example.stringmanipulation.problems;

/**
 * Problem: Longest Palindromic Substring
 * Given a string `s`, return the longest palindromic substring in `s`.
 *
 * Examples:
 * Input: s = "babad"
 * Output: "bab" (or "aba")
 *
 * Input: s = "cbbd"
 * Output: "bb"
 *
 * Constraints:
 * 1 <= s.length <= 1000
 * s consists of only digits and English letters.
 */
public class LongestPalindromicSubstring {

    // Global variables to keep track of the longest palindrome found so far
    private int maxLength = 0;
    private int start = 0;

    /**
     * Approach 1: Expand Around Center (Optimal for many cases)
     *
     * A palindrome reads the same forwards and backwards. This means it has a center.
     * The center of a palindrome can be a single character (e.g., "aba", center is 'b')
     * or two characters (e.g., "abba", center is 'bb').
     *
     * Algorithm:
     * 1. Iterate through each character `i` in the string `s` from `0` to `s.length() - 1`.
     * 2. For each `i`, consider two types of centers:
     *    a. Single character center: `i` itself. Call an `expandAroundCenter` helper function with `left = i`, `right = i`.
     *    b. Two character center: `i` and `i+1`. Call an `expandAroundCenter` helper function with `left = i`, `right = i + 1`.
     * 3. The `expandAroundCenter(s, left, right)` function:
     *    a. While `left >= 0` and `right < s.length()` and `s.charAt(left) == s.charAt(right)`:
     *       i. Decrement `left`.
     *       ii. Increment `right`.
     *    b. After the loop, `left` and `right` are at positions where `s.charAt(left)` != `s.charAt(right)`
     *       or they have gone out of bounds. The actual palindrome is between `left + 1` and `right - 1`.
     *    c. Calculate the current palindrome's length: `currentLength = right - 1 - (left + 1) + 1 = right - left - 1`.
     *    d. If `currentLength` is greater than `maxLength`, update `maxLength` and `start` (the starting index of the longest palindrome, which is `left + 1`).
     * 4. After iterating through all possible centers, the substring from `start` with `maxLength` is the answer.
     *
     * Time Complexity: O(N^2)
     * There are 2N-1 possible centers (N for single char, N-1 for two chars).
     * For each center, expanding outwards can take up to O(N) time in the worst case (e.g., "aaaaa").
     * Total: (2N-1) * O(N) = O(N^2).
     *
     * Space Complexity: O(1)
     * Only a few variables are used to store indices and lengths.
     */
    public String longestPalindromeExpandAroundCenter(String s) {
        if (s == null || s.length() < 1) {
            return "";
        }
        maxLength = 0; // Reset for each new call
        start = 0;     // Reset for each new call

        for (int i = 0; i < s.length(); i++) {
            // Case 1: Odd length palindrome (center is s[i])
            expandAroundCenter(s, i, i);
            // Case 2: Even length palindrome (center is s[i] and s[i+1])
            expandAroundCenter(s, i, i + 1);
        }

        return s.substring(start, start + maxLength);
    }

    // Helper function to expand around a given center
    private void expandAroundCenter(String s, int left, int right) {
        // Expand as long as indices are valid and characters match
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        // At this point, left and right are one step outside the palindrome boundaries.
        // The actual palindrome is from (left + 1) to (right - 1).
        // Its length is (right - 1) - (left + 1) + 1 = right - left - 1.
        int currentLength = right - left - 1;

        // If current palindrome is longer than the longest found so far, update
        if (currentLength > maxLength) {
            maxLength = currentLength;
            start = left + 1; // Update starting index
        }
    }


    /**
     * Approach 2: Dynamic Programming (DP)
     *
     * This approach builds up the solution for larger substrings from smaller ones.
     *
     * Algorithm:
     * 1. Create a 2D boolean array `dp` of size `N x N`, where `N` is `s.length()`.
     *    `dp[i][j]` will be `true` if the substring `s[i...j]` is a palindrome, `false` otherwise.
     * 2. Initialization:
     *    a. All single characters are palindromes: `dp[i][i] = true` for all `i`.
     *       Initialize `maxLength = 1` and `start = i` (first character).
     *    b. Check all substrings of length 2: `s[i...i+1]`. If `s.charAt(i) == s.charAt(i+1)`,
     *       then `dp[i][i+1] = true`. Update `maxLength = 2` and `start = i`.
     * 3. Fill the `dp` table for `length` from 3 to `N`:
     *    For each `length`:
     *       For each starting index `i` from `0` to `N - length`:
     *          Calculate the ending index `j = i + length - 1`.
     *          If `s.charAt(i) == s.charAt(j)` AND `dp[i+1][j-1]` is `true` (meaning the inner substring is a palindrome),
     *          then `dp[i][j] = true`.
     *          If `dp[i][j]` is `true` and `length` is greater than `maxLength`, update `maxLength` and `start`.
     * 4. Return the substring `s.substring(start, start + maxLength)`.
     *
     * Relationship: `dp[i][j] = (s.charAt(i) == s.charAt(j)) AND dp[i+1][j-1]`
     * Base cases:
     * - `length = 1`: `dp[i][i] = true`
     * - `length = 2`: `dp[i][i+1] = (s.charAt(i) == s.charAt(i+1))`
     *
     * Time Complexity: O(N^2)
     * The nested loops iterate for each length and each starting index, filling an N x N table.
     * Each cell calculation is O(1). Total: O(N^2).
     *
     * Space Complexity: O(N^2)
     * The `dp` table requires O(N^2) space.
     */
    public String longestPalindromeDP(String s) {
        if (s == null || s.length() < 1) {
            return "";
        }

        int n = s.length();
        boolean[][] dp = new boolean[n][n];
        String longest = "";
        int currentMaxLen = 0;

        // All substrings of length 1 are palindromes
        for (int i = 0; i < n; i++) {
            dp[i][i] = true;
            if (1 > currentMaxLen) {
                currentMaxLen = 1;
                longest = s.substring(i, i + 1);
            }
        }

        // Check for substrings of length 2
        for (int i = 0; i < n - 1; i++) {
            if (s.charAt(i) == s.charAt(i + 1)) {
                dp[i][i + 1] = true;
                if (2 > currentMaxLen) {
                    currentMaxLen = 2;
                    longest = s.substring(i, i + 2);
                }
            }
        }

        // Check for substrings of length 3 or more
        // length represents the length of the substring
        for (int length = 3; length <= n; length++) {
            // i represents the starting index
            for (int i = 0; i <= n - length; i++) {
                // j represents the ending index
                int j = i + length - 1;

                // Condition for s[i...j] to be a palindrome:
                // 1. s[i] must be equal to s[j]
                // 2. The inner substring s[i+1...j-1] must also be a palindrome (checked by dp[i+1][j-1])
                if (s.charAt(i) == s.charAt(j) && dp[i + 1][j - 1]) {
                    dp[i][j] = true;
                    if (length > currentMaxLen) {
                        currentMaxLen = length;
                        longest = s.substring(i, j + 1);
                    }
                }
            }
        }

        return longest;
    }
}
```