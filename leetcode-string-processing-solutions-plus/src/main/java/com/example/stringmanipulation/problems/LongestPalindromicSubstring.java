```java
package com.example.stringmanipulation.problems;

/**
 * LongestPalindromicSubstring
 * Finds the longest palindromic substring within a given string.
 * A palindrome is a sequence of characters that reads the same forwards and backwards.
 * A substring is a contiguous sequence of characters within a string.
 */
public class LongestPalindromicSubstring {

    /**
     * Brute-force approach to find the longest palindromic substring.
     * This method checks every possible substring and verifies if it's a palindrome.
     *
     * Time Complexity: O(N^3)
     *   - O(N^2) for iterating through all possible start and end indices of substrings.
     *   - O(N) for checking if each substring is a palindrome.
     * Space Complexity: O(1) (excluding space for storing the result string).
     *
     * @param s The input string.
     * @return The longest palindromic substring.
     */
    public static String bruteForce(String s) {
        if (s == null || s.length() < 1) {
            return "";
        }

        String longestPalindrome = "";
        // Initialize with a single character as the minimum possible palindrome
        if (s.length() > 0) {
            longestPalindrome = s.substring(0, 1);
        }

        int n = s.length();

        // Iterate through all possible starting positions
        for (int i = 0; i < n; i++) {
            // Iterate through all possible ending positions
            for (int j = i; j < n; j++) {
                String sub = s.substring(i, j + 1);
                if (isPalindrome(sub)) {
                    if (sub.length() > longestPalindrome.length()) {
                        longestPalindrome = sub;
                    }
                }
            }
        }
        return longestPalindrome;
    }

    /**
     * Helper method to check if a given string is a palindrome.
     *
     * Time Complexity: O(N) where N is the length of the string.
     * Space Complexity: O(1).
     *
     * @param str The string to check.
     * @return true if the string is a palindrome, false otherwise.
     */
    private static boolean isPalindrome(String str) {
        int left = 0;
        int right = str.length() - 1;
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    /**
     * Optimal approach using "Expand Around Center".
     * A palindrome expands outwards from its center. The center can be a single character
     * (for odd-length palindromes like "racecar") or two characters (for even-length palindromes like "noon").
     * We iterate through all possible centers and expand to find the longest palindrome.
     *
     * Time Complexity: O(N^2)
     *   - There are 2N - 1 possible centers (N for odd length, N-1 for even length).
     *   - For each center, expanding outwards can take up to O(N) time in the worst case.
     * Space Complexity: O(1).
     *
     * @param s The input string.
     * @return The longest palindromic substring.
     */
    public static String expandAroundCenter(String s) {
        if (s == null || s.length() < 1) {
            return "";
        }

        int start = 0; // Start index of the longest palindrome found
        int end = 0;   // End index of the longest palindrome found

        for (int i = 0; i < s.length(); i++) {
            // Case 1: Odd length palindromes (e.g., "aba", center is 'b')
            // i acts as the center
            int len1 = expand(s, i, i);

            // Case 2: Even length palindromes (e.g., "abba", center is 'bb')
            // i and i+1 act as the center
            int len2 = expand(s, i, i + 1);

            // Get the maximum length found from these two expansions
            int len = Math.max(len1, len2);

            // If this new palindrome is longer than the current longest, update start and end
            if (len > (end - start + 1)) {
                // Calculate new start and end indices based on the center 'i' and length 'len'
                // For odd length: center is i, len = 2k + 1. start = i - k, end = i + k
                // k = (len - 1) / 2
                // start = i - (len - 1) / 2
                // For even length: centers are i, i+1, len = 2k. start = i - k + 1, end = i + k
                // k = len / 2
                // start = i - len / 2 + 1
                // The formula below works for both:
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        // Return the substring using the final start and end indices
        return s.substring(start, end + 1);
    }

    /**
     * Helper method for expandAroundCenter. Expands outwards from a given center.
     *
     * @param s The input string.
     * @param left The left index of the center (or left part of the center pair).
     * @param right The right index of the center (or right part of the center pair).
     * @return The length of the palindrome found.
     */
    private static int expand(String s, int left, int right) {
        // Expand as long as indices are within bounds and characters match
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        // Length of palindrome is (right - 1) - (left + 1) + 1 = right - left - 1
        return right - left - 1;
    }


    /**
     * Dynamic Programming approach to find the longest palindromic substring.
     * Uses a 2D boolean array `dp[i][j]` where `dp[i][j]` is true if `s[i...j]` is a palindrome.
     *
     * dp[i][j] = (s.charAt(i) == s.charAt(j)) && dp[i+1][j-1]
     * Base cases:
     *   - Substrings of length 1: `dp[i][i]` is always true.
     *   - Substrings of length 2: `dp[i][i+1]` is true if `s.charAt(i) == s.charAt(i+1)`.
     *
     * Time Complexity: O(N^2)
     *   - We fill an N x N DP table. Each cell takes O(1) time.
     * Space Complexity: O(N^2) for the DP table.
     *
     * @param s The input string.
     * @return The longest palindromic substring.
     */
    public static String dynamicProgramming(String s) {
        if (s == null || s.length() < 1) {
            return "";
        }

        int n = s.length();
        boolean[][] dp = new boolean[n][n]; // dp[i][j] is true if s[i...j] is a palindrome

        int start = 0; // Start index of the longest palindrome found
        int maxLength = 1; // Length of the longest palindrome found (minimum 1 for single char)

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
        // 'len' represents the current substring length
        for (int len = 3; len <= n; len++) {
            // 'i' represents the starting index of the substring
            for (int i = 0; i <= n - len; i++) {
                // 'j' represents the ending index of the substring
                int j = i + len - 1;

                // Check if outer characters match AND the inner substring is a palindrome
                if (s.charAt(i) == s.charAt(j) && dp[i + 1][j - 1]) {
                    dp[i][j] = true;
                    // If this palindrome is longer than the current longest, update
                    if (len > maxLength) {
                        start = i;
                        maxLength = len;
                    }
                }
            }
        }

        // Return the longest palindromic substring
        return s.substring(start, start + maxLength);
    }
}
```