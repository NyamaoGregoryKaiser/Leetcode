```typescript
/**
 * src/algorithms/longestPalindromicSubstring.ts
 *
 * Problem: Longest Palindromic Substring
 * Given a string `s`, return the longest palindromic substring in `s`.
 *
 * A substring is a contiguous non-empty sequence of characters within a string.
 * A palindrome is a string that reads the same forwards and backward.
 *
 * Example 1:
 * Input: s = "babad"
 * Output: "bab" ("aba" is also a valid answer)
 *
 * Example 2:
 * Input: s = "cbbd"
 * Output: "bb"
 */

/**
 * Approach 1: Expand Around Center
 *
 * This approach iterates through each character of the string, treating it as a potential center
 * of a palindrome. Palindromes can be of two types:
 * 1. Odd length: centered around a single character (e.g., "aba" centered at 'b').
 * 2. Even length: centered between two characters (e.g., "abba" centered between the two 'b's).
 *
 * For each character, we expand outwards to find the longest palindrome. We do this twice:
 * once assuming an odd length palindrome (center `i`) and once assuming an even length palindrome
 * (center `i` and `i+1`).
 *
 * We keep track of the start index and length of the longest palindrome found so far.
 *
 * Time Complexity: O(N^2)
 *   - There are 2N-1 possible centers (N for odd length, N-1 for even length).
 *   - In the worst case, expanding around a center can take O(N) time (e.g., "aaaaa").
 *   - So, total time complexity is O(N * N) = O(N^2).
 *
 * Space Complexity: O(1)
 *   - We only use a few variables to store the current longest palindrome's bounds.
 */
export function longestPalindromeExpandAroundCenter(s: string): string {
  if (!s || s.length < 1) {
    return "";
  }

  let start = 0; // Start index of the longest palindrome found
  let maxLength = 0; // Length of the longest palindrome found

  /**
   * Helper function to expand around a center and find the length of the palindrome.
   * @param left The left pointer of the potential palindrome center.
   * @param right The right pointer of the potential palindrome center.
   * @returns The length of the palindrome found.
   */
  const expandAroundCenter = (l: number, r: number): number => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    // After the loop, l and r are one step beyond the actual palindrome boundaries.
    // The length is (r - 1) - (l + 1) + 1 = r - l - 1.
    return r - l - 1;
  };

  for (let i = 0; i < s.length; i++) {
    // Case 1: Odd length palindrome (centered at s[i])
    const len1 = expandAroundCenter(i, i);

    // Case 2: Even length palindrome (centered between s[i] and s[i+1])
    const len2 = expandAroundCenter(i, i + 1);

    // Get the maximum length between the two cases
    const currentMaxLen = Math.max(len1, len2);

    // If the current palindrome is longer than the longest found so far, update.
    if (currentMaxLen > maxLength) {
      maxLength = currentMaxLen;
      // Calculate the new start index.
      // For a palindrome of length `currentMaxLen` centered at `i` (or `i` and `i+1`):
      // Start = i - (currentMaxLen - 1) / 2
      // This formula works for both odd and even lengths due to integer division.
      // E.g., for "babad" (len 5, center at 'a' (index 2)): 2 - (5-1)/2 = 2 - 2 = 0. "babad"
      // E.g., for "baba" (len 4, center between 'a's (index 1 & 2)): 1 - (4-1)/2 = 1 - 1 = 0. "baba"
      // More precisely, for 'len', start = i - floor((len-1)/2) if center is i.
      // If the center is i,i+1, start = i - (len/2 -1).
      // The formula `i - (currentMaxLen - 1) / 2` works well to pinpoint the start index.
      start = i - Math.floor((currentMaxLen - 1) / 2);
    }
  }

  // Return the substring using the calculated start and maxLength.
  return s.substring(start, start + maxLength);
}

/**
 * Approach 2: Dynamic Programming
 *
 * Let `dp[i][j]` be a boolean value indicating whether the substring `s[i...j]` is a palindrome.
 *
 * Base Cases:
 * 1. `dp[i][i] = true` (Single characters are palindromes).
 * 2. `dp[i][i+1] = (s[i] === s[i+1])` (Two characters are a palindrome if they are equal).
 *
 * Recurrence Relation:
 * `dp[i][j] = (s[i] === s[j] && dp[i+1][j-1])`
 * A substring `s[i...j]` is a palindrome if its outer characters `s[i]` and `s[j]` are equal
 * AND the inner substring `s[i+1...j-1]` is also a palindrome.
 *
 * The `dp` table is filled from smaller substrings to larger ones. This means we iterate
 * by `length` of substring (`L`), from `L=1` to `N`. For each `L`, we iterate `i` from `0` to `N-L`.
 * Then `j = i + L - 1`.
 *
 * Time Complexity: O(N^2)
 *   - We fill an N x N DP table.
 *   - Each cell takes O(1) time to compute.
 *   - Total time: O(N^2).
 *
 * Space Complexity: O(N^2)
 *   - We use an N x N 2D array to store the DP states.
 *   - Total space: O(N^2).
 */
export function longestPalindromeDP(s: string): string {
  if (!s || s.length < 1) {
    return "";
  }

  const n = s.length;
  // dp[i][j] will be true if substring s[i...j] is a palindrome
  const dp: boolean[][] = Array(n).fill(0).map(() => Array(n).fill(false));

  let start = 0;
  let maxLength = 1; // Single characters are palindromes, so min length is 1

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

  // Check for substrings of length L >= 3
  // L is the current length of the substring
  for (let L = 3; L <= n; L++) {
    // i is the starting index of the substring
    for (let i = 0; i <= n - L; i++) {
      // j is the ending index of the substring
      const j = i + L - 1;

      // s[i...j] is a palindrome if s[i] == s[j] AND s[i+1...j-1] is a palindrome
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        // If we found a longer palindrome, update start and maxLength
        if (L > maxLength) {
          start = i;
          maxLength = L;
        }
      }
    }
  }

  return s.substring(start, start + maxLength);
}
```