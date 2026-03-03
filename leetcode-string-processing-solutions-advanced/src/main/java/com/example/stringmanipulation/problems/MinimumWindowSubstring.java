```java
package com.example.stringmanipulation.problems;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Minimum Window Substring
 * Given two strings `s` and `t` of lengths `m` and `n` respectively,
 * return the minimum window substring of `s` such that every character
 * in `t` (including duplicates) is included in the window.
 * If there is no such substring, return an empty string `""`.
 *
 * Examples:
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 *
 * Input: s = "a", t = "a"
 * Output: "a"
 *
 * Input: s = "a", t = "aa"
 * Output: ""
 *
 * Constraints:
 * m == s.length
 * n == t.length
 * 1 <= m, n <= 10^5
 * s and t consist of uppercase and lowercase English letters.
 */
public class MinimumWindowSubstring {

    /**
     * Approach: Sliding Window with Two Pointers and Two Hash Maps (or one combined map)
     *
     * This is a classic sliding window problem. We maintain a window `[left, right]`
     * in string `s` and expand it by moving `right`. When the window contains all
     * characters of `t`, we try to shrink it from the `left` to find the smallest valid window.
     *
     * Algorithm:
     * 1. Initialize a `targetFreq` map (or array) to store character frequencies of `t`.
     *    `map_t[char] = count`
     * 2. Initialize a `windowFreq` map (or array) to store character frequencies within the current window `s[left...right]`.
     *    (Alternatively, we can use a single map and decrement target counts, adding to current window counts,
     *    but two maps often clarify the logic).
     * 3. Initialize `left = 0`, `minLength = infinity`, `minStart = 0` (to store the start of the shortest window).
     * 4. Initialize `matchedCount = 0` (number of unique characters from `t` that are matched with their required frequency).
     *    (Alternatively, `desiredCharCount = number of characters in t` for which `windowFreq[char] >= targetFreq[char]`).
     *    Let's use a `count` variable that tracks characters in `t` that are satisfied by the current window.
     *
     * 5. Iterate with `right` pointer from `0` to `s.length() - 1`:
     *    a. Add `s.charAt(right)` to the `windowFreq` map.
     *    b. If `s.charAt(right)` is a character present in `t` (i.e., in `targetFreq`)
     *       AND `windowFreq.get(s.charAt(right))` is less than or equal to `targetFreq.get(s.charAt(right))`,
     *       then it means we have matched one more required character from `t`. Increment `matchedCount`.
     *    c. While `matchedCount == t.length()` (meaning all characters from `t` are present in the current window `s[left...right]`):
     *       i. Calculate current window length: `currentLength = right - left + 1`.
     *       ii. If `currentLength < minLength`, update `minLength = currentLength` and `minStart = left`.
     *       iii. Now, try to shrink the window from the left:
     *            Decrement count for `s.charAt(left)` in `windowFreq`.
     *            If `s.charAt(left)` is a character present in `t` (i.e., in `targetFreq`)
     *            AND `windowFreq.get(s.charAt(left))` becomes strictly less than `targetFreq.get(s.charAt(left))`,
     *            then it means we've "lost" a required character, and the window is no longer valid. Decrement `matchedCount`.
     *       iv. Increment `left`.
     * 6. After the loop, if `minLength` is still infinity, no valid window was found. Return `""`.
     *    Otherwise, return `s.substring(minStart, minStart + minLength)`.
     *
     * A more robust way to manage `matchedCount` or `count` variable:
     * Instead of `matchedCount == t.length()`, use `charToMatch` counter.
     * Initialize `charToMatch = t.length()`.
     * When `s.charAt(right)` is a character from `t` and its frequency in the window is `targetFreq[char]`, decrement `charToMatch`.
     * When `s.charAt(left)` is a character from `t` and its frequency in the window drops below `targetFreq[char]`, increment `charToMatch`.
     * The window is valid when `charToMatch == 0`.
     *
     * Time Complexity: O(S + T)
     * - Initializing `targetFreq`: O(T) where T is length of string t.
     * - The `right` pointer iterates through `s` once: O(S).
     * - The `left` pointer iterates through `s` once in the worst case (each character enters and leaves the window at most once).
     * - Map operations (put, get, remove) take O(1) on average.
     * Total: O(S + T).
     *
     * Space Complexity: O(T)
     * The `targetFreq` map stores at most unique characters from `t`.
     * The `windowFreq` map stores at most unique characters from `s`.
     * In worst case, this is O(alphabet size) or O(T) if `t` contains many unique characters.
     * Since the alphabet size is constant (e.g., 52 for English letters), it can be considered O(1) effectively,
     * but if we consider arbitrary Unicode characters, then it's O(T_unique).
     * For competitive programming/interviews, assume constant alphabet size for typical character sets.
     *
     * Edge Cases:
     * - `t` is longer than `s`: No possible window, should return `""`. (Handled by `minLength` check)
     * - `t` has duplicate characters (e.g., `t = "AA"`): The window must contain both 'A's. (Handled by frequency maps)
     * - No characters from `t` found in `s`: `matchedCount` will never reach `t.length()`. (Handled by `minLength` check)
     */
    public String minWindow(String s, String t) {
        if (s == null || t == null || s.length() == 0 || t.length() == 0 || t.length() > s.length()) {
            return "";
        }

        // Frequencies of characters in string t
        Map<Character, Integer> targetFreq = new HashMap<>();
        for (char c : t.toCharArray()) {
            targetFreq.put(c, targetFreq.getOrDefault(c, 0) + 1);
        }

        // Frequencies of characters in the current window
        Map<Character, Integer> windowFreq = new HashMap<>();

        int left = 0;
        int matchedChars = 0; // Counts characters in window that match requirements of targetFreq
                              // It refers to the number of *distinct* characters in t that are matched
                              // with their required frequencies.
        // A better way to track is to count how many characters (including duplicates)
        // from T are currently in the window at sufficient frequency.
        // Let's use `charsNeeded` to represent how many characters from `t` we still need to satisfy.
        int charsNeeded = t.length();

        int minLength = Integer.MAX_VALUE;
        int minStart = 0;

        for (int right = 0; right < s.length(); right++) {
            char rChar = s.charAt(right);

            // Add the current character to windowFreq
            windowFreq.put(rChar, windowFreq.getOrDefault(rChar, 0) + 1);

            // If the character `rChar` is required by `t`
            // AND its count in the current window is less than or equal to its required count in `t`
            // it means we've covered one more required instance of this character.
            // This condition ensures we only decrement `charsNeeded` for characters actually part of `t`
            // and only up to their required frequency.
            if (targetFreq.containsKey(rChar) && windowFreq.get(rChar) <= targetFreq.get(rChar)) {
                charsNeeded--;
            }

            // Shrink the window from the left if all characters from t are found
            while (charsNeeded == 0) { // All characters of t are now covered in the window s[left...right]
                int currentWindowLength = right - left + 1;

                // Update minimum window if current one is smaller
                if (currentWindowLength < minLength) {
                    minLength = currentWindowLength;
                    minStart = left;
                }

                char lChar = s.charAt(left);

                // Try to remove lChar from the window
                windowFreq.put(lChar, windowFreq.get(lChar) - 1);

                // If lChar was a required character from t AND its frequency in the window
                // drops below the required frequency in targetFreq, it means we 'lost' one match.
                // Increment charsNeeded to reflect that this character is no longer sufficiently covered.
                if (targetFreq.containsKey(lChar) && windowFreq.get(lChar) < targetFreq.get(lChar)) {
                    charsNeeded++;
                }

                // Move left pointer to shrink the window
                left++;
            }
        }

        // If minLength is still MAX_VALUE, no valid window was found
        return (minLength == Integer.MAX_VALUE) ? "" : s.substring(minStart, minStart + minLength);
    }
}
```