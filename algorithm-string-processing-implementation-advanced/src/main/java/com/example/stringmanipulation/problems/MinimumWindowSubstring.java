```java
package com.example.stringmanipulation.problems;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Minimum Window Substring
 * Given two strings s and t of lengths m and n respectively, return the minimum window substring of s
 * such that every character in t (including duplicates) is included in the window.
 * If there is no such substring, return an empty string "".
 */
public class MinimumWindowSubstring {

    /**
     * Approach 1: Brute Force (Conceptual - Not usually implemented for MWS due to high complexity)
     *
     * This approach checks every possible substring of `s` and for each, verifies if it contains all
     * characters of `t` with the required frequencies.
     *
     * Algorithm:
     * 1. Iterate through all possible starting positions `i` in `s`.
     * 2. For each `i`, iterate through all possible ending positions `j` from `i` to `s.length() - 1`.
     * 3. Extract the substring `s[i...j]`.
     * 4. Check if this substring contains all characters of `t` (including frequencies).
     *    This check involves creating a frequency map for the substring and comparing it with `t`'s frequency map.
     * 5. If it does, update the minimum length and the corresponding substring.
     *
     * Time Complexity: O(N^3 * M) or O(N^2 * (N + M))
     *   - O(N^2) for iterating through all substrings.
     *   - O(N) to extract substring.
     *   - O(N + M) to check if a substring is valid (create its map, compare with t's map).
     *   - Total: O(N^3 + N^2*M), approximately O(N^3) if M is small, or O(N^2*M) if M is comparable to N.
     * Space Complexity: O(M) for t's frequency map and O(N) for substring's frequency map.
     *
     * This approach is highly inefficient and would likely result in a Time Limit Exceeded error
     * for most competitive programming platforms or interviews. It's primarily for understanding
     * why optimized solutions are necessary.
     */
    public String minWindowBruteForceConceptual(String s, String t) {
        // This method is conceptual and provided for complexity discussion.
        // It's not a practical solution for this problem.
        if (s == null || t == null || s.length() == 0 || t.length() == 0 || t.length() > s.length()) {
            return "";
        }

        Map<Character, Integer> tFreq = new HashMap<>();
        for (char tc : t.toCharArray()) {
            tFreq.put(tc, tFreq.getOrDefault(tc, 0) + 1);
        }

        String minWindow = "";
        int minLen = Integer.MAX_VALUE;

        for (int i = 0; i < s.length(); i++) {
            for (int j = i; j < s.length(); j++) {
                String currentWindow = s.substring(i, j + 1);
                if (isValidWindow(currentWindow, tFreq)) {
                    if (currentWindow.length() < minLen) {
                        minLen = currentWindow.length();
                        minWindow = currentWindow;
                    }
                }
            }
        }
        return minWindow;
    }

    private boolean isValidWindow(String window, Map<Character, Integer> tFreq) {
        Map<Character, Integer> windowFreq = new HashMap<>();
        for (char wc : window.toCharArray()) {
            windowFreq.put(wc, windowFreq.getOrDefault(wc, 0) + 1);
        }

        for (Map.Entry<Character, Integer> entry : tFreq.entrySet()) {
            char c = entry.getKey();
            int requiredCount = entry.getValue();
            int currentCount = windowFreq.getOrDefault(c, 0);

            if (currentCount < requiredCount) {
                return false;
            }
        }
        return true;
    }


    /**
     * Approach 2: Sliding Window (Optimal)
     *
     * This approach uses a two-pointer technique (left and right) to define a "window" in string `s`.
     * It expands the window from the right and shrinks it from the left.
     *
     * Algorithm:
     * 1. Initialize a frequency map `tCounts` for characters in `t`.
     * 2. Initialize `windowCounts` map to keep track of character frequencies in the current window `s[left...right]`.
     * 3. Initialize `matchedChars` count (number of distinct characters in `t` that are currently matched in the window
     *    with at least their required frequency).
     * 4. Initialize `minLength = infinity`, `minStart = 0`.
     * 5. `right` pointer iterates from `0` to `s.length() - 1`:
     *    a. Add `s[right]` to `windowCounts`.
     *    b. If `s[right]` is a character from `t` and `windowCounts[s[right]]` now meets `tCounts[s[right]]`,
     *       increment `matchedChars`.
     * 6. `left` pointer logic (while `matchedChars` equals `t.length()` - actually, it should be `tCounts.size()`
     *    meaning all *unique* characters of `t` are present at least once, or `required_chars_count` for overall sum):
     *    a. When all characters of `t` are covered by the current window (`matchedCount == tCounts.size()` is a common variant;
     *       more robust is comparing total character counts, using `required_total_chars`).
     *       Let's refine: `required_chars` will count total chars needed, `current_chars_in_window` counts chars matched so far.
     *       When `current_chars_in_window == required_chars`, we have a valid window.
     *    b. Update `minLength` and `minStart` if the current window `s[left...right]` is smaller.
     *    c. Try to shrink the window from the left:
     *       i. Remove `s[left]` from `windowCounts`.
     *       ii. If `s[left]` was a character from `t` and `windowCounts[s[left]]` now falls below `tCounts[s[left]]`,
     *           decrement `matchedChars`.
     *       iii. Increment `left`.
     * 7. Return the substring `s.substring(minStart, minStart + minLength)`.
     *
     * Time Complexity: O(N + M)
     *   - `right` pointer iterates through `s` once (O(N)).
     *   - `left` pointer iterates through `s` once (O(N)).
     *   - Initializing `tCounts` takes O(M).
     *   - Map operations (put, get, remove) are O(1) on average.
     * Space Complexity: O(K) where K is the number of unique characters in `t` (at most 256 for ASCII, N for Unicode).
     *   - For `tCounts` and `windowCounts` maps.
     *
     * @param s The source string.
     * @param t The target string of characters to find.
     * @return The minimum window substring.
     */
    public String minWindowSlidingWindow(String s, String t) {
        if (s == null || t == null || s.length() == 0 || t.length() == 0 || t.length() > s.length()) {
            return "";
        }

        // Frequencies of characters in string t
        Map<Character, Integer> tCounts = new HashMap<>();
        for (char tc : t.toCharArray()) {
            tCounts.put(tc, tCounts.getOrDefault(tc, 0) + 1);
        }

        // Frequencies of characters in the current window
        Map<Character, Integer> windowCounts = new HashMap<>();

        int left = 0; // Left pointer of the window
        int matchedRequiredChars = 0; // Number of characters in `t` that are present in the current window
                                      // with their required frequencies. This counts total characters, not unique types.
        int minLength = Integer.MAX_VALUE;
        int minStart = 0; // Starting index of the minimum window found

        // Iterate with right pointer
        for (int right = 0; right < s.length(); right++) {
            char charRight = s.charAt(right);

            // Add charRight to window
            windowCounts.put(charRight, windowCounts.getOrDefault(charRight, 0) + 1);

            // If this character is one of the required characters from t
            // AND its count in the window is now <= its required count in t
            // (meaning we've found one more instance of a character from t that we needed)
            if (tCounts.containsKey(charRight) && windowCounts.get(charRight) <= tCounts.get(charRight)) {
                matchedRequiredChars++;
            }

            // Condition to shrink the window: all characters from t are present in the current window
            // The `matchedRequiredChars` is equal to t.length() because it counts ALL character occurrences,
            // not just unique character types.
            while (matchedRequiredChars == t.length()) {
                // Current window is valid, check if it's the minimum
                if (right - left + 1 < minLength) {
                    minLength = right - left + 1;
                    minStart = left;
                }

                // Try to shrink the window from the left
                char charLeft = s.charAt(left);

                // If charLeft is a required character from t
                // AND its count in the window was *exactly* what t needed (before decrementing)
                // then by removing it, we're losing one required match.
                if (tCounts.containsKey(charLeft) && windowCounts.get(charLeft) <= tCounts.get(charLeft)) {
                    matchedRequiredChars--;
                }
                // Decrement count for charLeft in window
                windowCounts.put(charLeft, windowCounts.get(charLeft) - 1);
                left++; // Move left pointer
            }
        }

        // If minLength is still MAX_VALUE, no valid window was found
        return minLength == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLength);
    }
}
```