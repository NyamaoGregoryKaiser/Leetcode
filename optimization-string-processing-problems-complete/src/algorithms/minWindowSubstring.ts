```typescript
/**
 * src/algorithms/minWindowSubstring.ts
 *
 * Problem: Minimum Window Substring
 * Given two strings `s` and `t` of lengths `m` and `n` respectively,
 * return the minimum window substring of `s` such that every character
 * in `t` (including duplicates) is included in the window.
 * If there is no such substring, return an empty string `""`.
 *
 * The test cases will be generated such that the answer is unique.
 *
 * Example 1:
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 * Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
 *
 * Example 2:
 * Input: s = "a", t = "a"
 * Output: "a"
 * Explanation: The entire string s is the minimum window.
 *
 * Example 3:
 * Input: s = "a", t = "aa"
 * Output: ""
 * Explanation: "a" does not contain two 'a's, so the minimum window is empty.
 */

/**
 * Approach: Sliding Window
 *
 * This problem is a classic application of the Sliding Window technique with two pointers (left and right)
 * and a frequency map (or hash table).
 *
 * Algorithm:
 * 1. Initialize two frequency maps:
 *    - `tCharCounts`: Stores character counts for string `t`.
 *    - `windowCharCounts`: Stores character counts for the current sliding window in `s`.
 * 2. Populate `tCharCounts` by iterating through `t`. Also, keep track of `requiredChars` (number of unique characters in `t`).
 * 3. Initialize window pointers: `left = 0`, `right = 0`.
 * 4. Initialize `formedChars = 0` (number of unique characters in the window that satisfy `tCharCounts`).
 * 5. Initialize `minLen = Infinity`, `minStart = 0` (to store the result).
 *
 * 6. Iterate `right` pointer from `0` to `s.length - 1`:
 *    a. Add `s[right]` to `windowCharCounts`.
 *    b. If `s[right]` is a character from `t` AND its count in `windowCharCounts` now matches its count in `tCharCounts`:
 *       Increment `formedChars`.
 *
 *    c. While `formedChars` equals `requiredChars` (meaning a valid window is found):
 *       i. Update `minLen` and `minStart` if the current window `(right - left + 1)` is smaller.
 *       ii. Try to shrink the window from the left:
 *           - Decrement `s[left]` from `windowCharCounts`.
 *           - If `s[left]` was a required character AND its count in `windowCharCounts` now falls below `tCharCounts[s[left]]`:
 *             Decrement `formedChars`.
 *           - Move `left` pointer one step to the right.
 *
 * 7. After the loop, if `minLen` is still `Infinity`, no valid window was found. Return `""`.
 *    Otherwise, return the substring `s.substring(minStart, minStart + minLen)`.
 *
 * Time Complexity: O(S + T)
 *   - S is the length of string `s`.
 *   - T is the length of string `t`.
 *   - Populating `tCharCounts`: O(T).
 *   - The `right` pointer iterates `S` times.
 *   - The `left` pointer iterates at most `S` times in total (it only moves forward).
 *   - Each character is processed by `right` and `left` pointers at most twice.
 *   - Hash map operations (get, set, increment, decrement) are O(1) on average.
 *   - Total time: O(S + T).
 *
 * Space Complexity: O(Alphabet_Size) or O(1) given a fixed alphabet (e.g., ASCII/Unicode).
 *   - `tCharCounts` and `windowCharCounts` maps store at most `Alphabet_Size` entries.
 *   - If the alphabet size is constant (e.g., 256 for extended ASCII), then space is O(1).
 *   - If the alphabet size can grow (e.g., full Unicode), then it's O(U) where U is the number of unique characters in `t`.
 *   - For typical interview constraints (lowercase/uppercase English letters), this is effectively O(1).
 */
export function minWindow(s: string, t: string): string {
  // Edge cases
  if (!s || !t || s.length === 0 || t.length === 0) {
    return "";
  }

  // Map to store character counts for string t
  const tCharCounts = new Map<string, number>();
  for (const char of t) {
    tCharCounts.set(char, (tCharCounts.get(char) || 0) + 1);
  }

  // `requiredChars` stores the count of unique characters in t
  const requiredChars = tCharCounts.size;

  // `windowCharCounts` stores character counts for the current sliding window in s
  const windowCharCounts = new Map<string, number>();

  // `formedChars` stores the number of unique characters in the window that satisfy `tCharCounts` requirements.
  // E.g., if t = "AABC", tCharCounts = {A:2, B:1, C:1}.
  // If window has {A:2, B:1, X:1}, then formedChars = 2 (A and B are satisfied, C is not).
  let formedChars = 0;

  // Pointers for the sliding window
  let left = 0;
  let right = 0;

  // Variables to store the minimum window found
  let minLen = Infinity;
  let minStart = 0;

  // Iterate with the right pointer to expand the window
  while (right < s.length) {
    const charR = s[right];

    // Add current character to windowCharCounts
    windowCharCounts.set(charR, (windowCharCounts.get(charR) || 0) + 1);

    // Check if charR is a required character from t, and its count in the window now matches the required count
    if (tCharCounts.has(charR) && windowCharCounts.get(charR) === tCharCounts.get(charR)) {
      formedChars++;
    }

    // While the window is valid (all required characters are formed)
    while (formedChars === requiredChars) {
      // Current window length
      const currentWindowLen = right - left + 1;

      // Update minimum window if current one is smaller
      if (currentWindowLen < minLen) {
        minLen = currentWindowLen;
        minStart = left;
      }

      // Try to shrink the window from the left
      const charL = s[left];

      // Decrement charL from windowCharCounts
      windowCharCounts.set(charL, windowCharCounts.get(charL)! - 1);

      // If charL was a required character from t, and its count in the window now falls below the required count,
      // then this character is no longer "formed".
      if (tCharCounts.has(charL) && windowCharCounts.get(charL)! < tCharCounts.get(charL)!) {
        formedChars--;
      }

      // Move left pointer to the right
      left++;
    }

    // Move right pointer to expand the window further
    right++;
  }

  // If minLen is still Infinity, no valid window was found
  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}
```