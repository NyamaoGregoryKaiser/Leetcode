```java
package com.example.stringmanipulation.problems;

/**
 * Problem: Longest Palindromic Substring
 * Given a string s, find the longest palindromic substring in s.
 * You may assume that the maximum length of s is 1000.
 */
public class LongestPalindromicSubstring {

    /**
     * Approach 1: Brute Force
     * Generate all possible substrings and for each substring, check if it's a palindrome.
     * Keep track of the longest palindrome found.
     *
     * Time Complexity: O(N^3)
     *   - O(N^2) for generating all substrings (N*(N+1)/2 substrings).
     *   - O(N) for checking if each substring is a palindrome.
     * Space Complexity: O(1) (if not counting the output string storage, which would be O(N))
     *
     * @param s The input string.
     * @return The longest palindromic substring.
     */
    public String longestPalindromeBruteForce(String s) {
        if (s == null || s.length() < 1) {
            return "";
        }
        String longest = "";
        for (int i = 0; i < s.length(); i++) {
            for (int j = i; j < s.length(); j++) {
                String sub = s.substring(i, j + 1);
                if (StringManipulationUtils.isPalindrome(sub) && sub.length() > longest.length()) {
                    longest = sub;
                }
            }
        }
        return longest;
    }

    /**
     * Approach 2: Expand Around Center
     * A palindrome is symmetric around its center. The center can be a single character (for odd-length palindromes like "aba")
     * or two characters (for even-length palindromes like "abba").
     * We iterate through each possible center (N for single char, N-1 for two chars) and expand outwards to find the longest palindrome.
     *
     * Time Complexity: O(N^2)
     *   - There are 2N-1 possible centers (N single characters, N-1 pairs of characters).
     *   - For each center, expanding outwards takes O(N) time in the worst case.
     * Space Complexity: O(1) (if not counting the output string storage, which would be O(N))
     *
     * @param s The input string.
     * @return The longest palindromic substring.
     */
    public String longestPalindromeExpandAroundCenter(String s) {
        if (s == null || s.length() < 1) {
            return "";
        }

        int start = 0; // Start index of the longest palindrome found
        int end = 0;   // End index of the longest palindrome found

        for (int i = 0; i < s.length(); i++) {
            // Case 1: Odd length palindrome (center is s[i])
            int len1 = expandAroundCenter(s, i, i);
            // Case 2: Even length palindrome (center is s[i] and s[i+1])
            int len2 = expandAroundCenter(s, i, i + 1);

            int len = Math.max(len1, len2);

            if (len > end - start + 1) { // If current palindrome is longer
                // Update start and end indices
                // For a length 'len', the new start index will be i - (len - 1) / 2
                // The new end index will be i + len / 2
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        // Return the substring using the found start and end indices
        return s.substring(start, end + 1);
    }

    /**
     * Helper method to expand around a given center (or pair of centers) and return the length
     * of the palindrome found.
     *
     * @param s The input string.
     * @param left The left pointer of the center.
     * @param right The right pointer of the center.
     * @return The length of the palindrome centered at (left, right).
     */
    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        // When the loop exits, left and right are one step outside the palindrome boundaries.
        // The length is (right - 1) - (left + 1) + 1 = right - left - 1.
        return right - left - 1;
    }


    /**
     * Approach 3: Dynamic Programming
     * Define `dp[i][j]` as a boolean indicating whether `s[i...j]` is a palindrome.
     *
     * Recurrence relation:
     * `dp[i][j] = (s.charAt(i) == s.charAt(j)) && dp[i+1][j-1]`
     *
     * Base cases:
     * 1. Single character: `dp[i][i] = true` (all single characters are palindromes).
     * 2. Two characters: `dp[i][i+1] = (s.charAt(i) == s.charAt(i+1))` (if characters are same, it's a palindrome).
     *
     * We fill the DP table by increasing substring length (or "gap" between i and j) to ensure `dp[i+1][j-1]`
     * is already computed.
     *
     * Time Complexity: O(N^2)
     *   - Filling an N x N DP table.
     * Space Complexity: O(N^2)
     *   - For the N x N boolean DP table.
     *
     * @param s The input string.
     * @return The longest palindromic substring.
     */
    public String longestPalindromeDP(String s) {
        if (s == null || s.length() < 1) {
            return "";
        }

        int n = s.length();
        boolean[][] dp = new boolean[n][n]; // dp[i][j] is true if s[i...j] is a palindrome

        int start = 0; // Start index of the longest palindrome found
        int maxLength = 1; // Length of the longest palindrome found (minimum is 1 for single char)

        // All single characters are palindromes
        for (int i = 0; i < n; i++) {
            dp[i][i] = true;
        }

        // Check for palindromes of length 2
        for (int i = 0; i < n - 1; i++) {
            if (s.charAt(i) == s.charAt(i + 1)) {
                dp[i][i + 1] = true;
                start = i;
                maxLength = 2;
            }
        }

        // Check for palindromes of length 3 or more
        // 'len' is the current length of the substring we are checking
        for (int len = 3; len <= n; len++) {
            // 'i' is the starting index
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1; // 'j' is the ending index

                // s[i...j] is a palindrome if s[i] == s[j] AND s[i+1...j-1] is a palindrome
                if (s.charAt(i) == s.charAt(j) && dp[i + 1][j - 1]) {
                    dp[i][j] = true;
                    if (len > maxLength) {
                        start = i;
                        maxLength = len;
                    }
                }
            }
        }

        return s.substring(start, start + maxLength);
    }
}
```