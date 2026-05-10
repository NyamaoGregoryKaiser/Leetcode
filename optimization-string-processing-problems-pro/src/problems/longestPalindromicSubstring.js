```javascript
/**
 * @fileoverview Problem: Longest Palindromic Substring
 *
 * Given a string `s`, find the longest palindromic substring in `s`.
 * A palindromic substring is a contiguous sequence of characters within a string that reads the same forwards and backwards.
 *
 * Constraints:
 * 1 <= s.length <= 1000
 * `s` consists of only digits and English letters.
 */

/**
 * Solution 1: Expand Around Center
 * This approach considers every single character and every pair of adjacent characters as potential centers of a palindrome.
 * For each center, it expands outwards to find the longest palindrome.
 *
 * A palindrome can have an odd length (e.g., "aba", center 'b') or an even length (e.g., "abba", center between 'b's).
 *
 * Time Complexity: O(N^2)
 * For each of the `2N-1` possible centers (N single characters and N-1 spaces between characters),
 * we expand outwards. In the worst case, this expansion can take O(N) time (e.g., "aaaaa").
 * Thus, total time is O(N * N) = O(N^2).
 *
 * Space Complexity: O(1)
 * We only store a few variables to track the longest palindrome found so far.
 *
 * @param {string} s - The input string.
 * @returns {string} The longest palindromic substring.
 */
function longestPalindromeExpandAroundCenter(s) {
    if (!s || s.length < 1) {
        return "";
    }

    let start = 0; // Starting index of the longest palindrome
    let maxLength = 1; // Length of the longest palindrome

    /**
     * Helper function to expand around a center.
     * @param {string} str - The input string.
     * @param {number} left - The left boundary of the potential palindrome.
     * @param {number} right - The right boundary of the potential palindrome.
     * @returns {number} The length of the palindrome found.
     */
    const expandAroundCenter = (str, left, right) => {
        while (left >= 0 && right < str.length && str[left] === str[right]) {
            left--;
            right++;
        }
        // When the loop ends, left and right are one step beyond the palindrome boundaries.
        // The length is (right - 1) - (left + 1) + 1 = right - left - 1.
        return right - left - 1;
    };

    for (let i = 0; i < s.length; i++) {
        // Case 1: Odd length palindrome (center is s[i])
        // E.g., "aba", center at 'b' (index 1), start with left=1, right=1
        let len1 = expandAroundCenter(s, i, i);

        // Case 2: Even length palindrome (center is between s[i] and s[i+1])
        // E.g., "abba", center between 'b' and 'b' (index 1 and 2), start with left=1, right=2
        let len2 = expandAroundCenter(s, i, i + 1);

        // Get the maximum length found from these two cases
        let currentMaxLen = Math.max(len1, len2);

        // If the current palindrome is longer than the longest found so far, update
        if (currentMaxLen > maxLength) {
            maxLength = currentMaxLen;
            // Calculate the new start index.
            // For example, if currentMaxLen is 5 (e.g., "abcba") centered at i=2:
            // i=2, len=5. Start = 2 - floor((5-1)/2) = 2 - 2 = 0.
            // For example, if currentMaxLen is 4 (e.g., "abba") centered between i=1 and i=2:
            // i=1, len=4. Start = 1 - floor((4-1)/2) = 1 - 1 = 0.
            start = i - Math.floor((currentMaxLen - 1) / 2);
        }
    }

    // Return the substring from 'start' with 'maxLength'
    return s.substring(start, start + maxLength);
}

/**
 * Solution 2: Dynamic Programming
 * Let dp[i][j] be true if the substring s[i...j] is a palindrome, and false otherwise.
 *
 * Base cases:
 * 1. dp[i][i] = true (Single characters are palindromes)
 * 2. dp[i][i+1] = true if s[i] == s[i+1] (Two identical characters form a palindrome)
 *
 * Recursive relation:
 * dp[i][j] = true if s[i] == s[j] AND dp[i+1][j-1] == true
 *
 * We need to fill the DP table based on increasing substring length (or "gap" between i and j).
 *
 * Time Complexity: O(N^2)
 * We fill an N x N DP table. Each cell takes O(1) time to compute.
 *
 * Space Complexity: O(N^2)
 * We use a 2D array of size N x N to store the DP states.
 *
 * @param {string} s - The input string.
 * @returns {string} The longest palindromic substring.
 */
function longestPalindromeDP(s) {
    if (!s || s.length < 1) {
        return "";
    }

    const n = s.length;
    // dp[i][j] will be true if s[i...j] is a palindrome
    const dp = Array(n).fill(0).map(() => Array(n).fill(false));

    let start = 0;     // Start index of the longest palindrome found
    let maxLength = 1; // Length of the longest palindrome found

    // All substrings of length 1 are palindromes
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }

    // Check for substrings of length 2
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLength = 2;
        }
    }

    // Check for substrings of length 3 or more
    // 'gap' represents the length of the substring - 1
    // So gap = 0 means length 1, gap = 1 means length 2, gap = 2 means length 3, etc.
    for (let gap = 2; gap < n; gap++) {
        // 'i' is the starting index of the substring
        for (let i = 0; i < n - gap; i++) {
            let j = i + gap; // 'j' is the ending index of the substring

            // s[i...j] is a palindrome if s[i] == s[j] and s[i+1...j-1] is a palindrome
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;

                // If this new palindrome is longer than the current longest, update
                if (gap + 1 > maxLength) {
                    start = i;
                    maxLength = gap + 1;
                }
            }
        }
    }

    return s.substring(start, start + maxLength);
}

module.exports = {
    longestPalindromeExpandAroundCenter,
    longestPalindromeDP
};
```