```javascript
/**
 * @fileoverview Problem: Minimum Window Substring
 *
 * Given two strings `s` and `t` of lengths `m` and `n` respectively,
 * return the minimum window substring of `s` such that every character
 * in `t` (including duplicates) is included in the window. If there is
 * no such substring, return an empty string "".
 *
 * Constraints:
 * 1 <= s.length, t.length <= 10^5
 * `s` and `t` consist of uppercase and lowercase English letters.
 */

/**
 * Solution: Sliding Window with Two Pointers and Hash Map
 *
 * This problem is a classic application of the sliding window technique.
 * We maintain a window `[left, right]` in string `s` and expand/contract it.
 *
 * Algorithm:
 * 1. **Character Frequency Map for `t`**:
 *    Create a hash map (`mapT`) to store the frequency of each character in string `t`.
 *    This map tells us what characters we *need* to find in our window.
 *
 * 2. **Sliding Window Initialization**:
 *    - `windowMap`: A hash map to store the frequency of characters currently in our sliding window `s[left...right]`.
 *    - `matchedChars`: An integer to keep track of how many characters from `t` we have successfully matched in our current window.
 *      A character is "matched" if its count in `windowMap` is greater than or equal to its count in `mapT`.
 *      It's helpful to count *unique* characters that have met their frequency requirement, or a total count of *all* characters.
 *      Let's use a `count` that increments when a character in `windowMap` reaches `mapT`'s requirement, and decrements when it falls below.
 *      The goal is `count === Object.keys(mapT).length`.
 *    - `minLength`: Stores the length of the smallest valid window found so far, initialized to `Infinity`.
 *    - `minWindowStart`: Stores the starting index of the smallest valid window found.
 *    - `left` and `right`: Pointers for the sliding window, initialized to 0.
 *
 * 3. **Expand the Window (`right` pointer moves)**:
 *    - Iterate `right` from 0 to `s.length - 1`.
 *    - For each character `s[right]`:
 *      - Add `s[right]` to `windowMap`.
 *      - If `s[right]` is a character that `t` needs (i.e., `s[right]` exists in `mapT`) AND its count in `windowMap`
 *        now meets or exceeds its required count in `mapT`, increment `matchedChars`.
 *
 * 4. **Contract the Window (`left` pointer moves) when a valid window is found**:
 *    - Once `matchedChars` equals the number of *unique* characters required from `mapT` (or the total length of `t` if counting total chars),
 *      we have a valid window `s[left...right]`.
 *    - Update `minLength` and `minWindowStart` if the current window `(right - left + 1)` is smaller.
 *    - Now, try to shrink the window from the `left`:
 *      - Take `s[left]` out of the `windowMap`.
 *      - If `s[left]` was a character `t` needs AND its count in `windowMap` now falls *below* its required count in `mapT`,
 *        decrement `matchedChars`.
 *      - Increment `left`.
 *    - Keep contracting until `matchedChars` no longer indicates a valid window.
 *
 * 5. **Repeat steps 3 and 4** until `right` reaches the end of `s`.
 *
 * 6. **Return Result**:
 *    If `minLength` is still `Infinity`, no valid window was found, return `""`.
 *    Otherwise, return `s.substring(minWindowStart, minWindowStart + minLength)`.
 *
 * Time Complexity: O(S + T)
 * Where S is the length of string `s` and T is the length of string `t`.
 * - Populating `mapT`: O(T).
 * - The `right` pointer iterates through `s` once: O(S).
 * - The `left` pointer iterates through `s` at most once: O(S).
 * - Hash map operations (insert, lookup, delete) are O(1) on average.
 * Total time: O(S + T).
 *
 * Space Complexity: O(1) (or O(k) where k is the number of unique characters in the alphabet)
 * The hash maps (`mapT` and `windowMap`) will store at most a fixed number of distinct characters
 * (e.g., 52 for English letters, 256 for ASCII). Therefore, the space complexity is constant,
 * irrespective of the lengths of `s` and `t`. If we consider the alphabet size `A`, it's O(A).
 *
 * @param {string} s - The main string to search within.
 * @param {string} t - The target string whose characters must be included.
 * @returns {string} The minimum window substring, or "" if not found.
 */
function minWindow(s, t) {
    if (t.length === 0) {
        return "";
    }
    if (s.length === 0 || s.length < t.length) {
        return "";
    }

    // `mapT` stores character frequencies for string `t`
    const mapT = {};
    for (const char of t) {
        mapT[char] = (mapT[char] || 0) + 1;
    }

    let windowStart = 0;
    let matchedCharsCount = 0; // Number of characters in window that satisfy t's frequency requirement
    let minLength = Infinity;
    let minWindowStart = 0; // Starting index of the minimum window found

    // Iterate `windowEnd` (right pointer) through string `s`
    for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
        const rightChar = s[windowEnd];

        // If `rightChar` is one of the characters we need from `t`
        if (rightChar in mapT) {
            mapT[rightChar]--; // Decrement its count in `mapT` (meaning we "used" one instance)
            // If the count becomes non-negative, it means we have matched an instance of this character.
            // We only increment `matchedCharsCount` when we fulfill a *required* character from `t`.
            // Example: t="AABC", mapT initially {A:2, B:1, C:1}
            // If we find 'A', mapT['A'] becomes 1. matchedCharsCount increments.
            // If we find another 'A', mapT['A'] becomes 0. matchedCharsCount increments.
            // If we find a third 'A', mapT['A'] becomes -1. matchedCharsCount does NOT increment.
            // This `matchedCharsCount` tracks how many characters from `t` have been "covered" by the window.
            if (mapT[rightChar] >= 0) {
                matchedCharsCount++;
            }
        }

        // Shrink the window if `matchedCharsCount` indicates we have a valid window
        // (i.e., all characters from `t` are present with their required frequencies)
        while (matchedCharsCount === t.length) {
            // Update minimum window found so far
            if (windowEnd - windowStart + 1 < minLength) {
                minLength = windowEnd - windowStart + 1;
                minWindowStart = windowStart;
            }

            const leftChar = s[windowStart];
            windowStart++; // Shrink the window from the left

            // If `leftChar` was a character required by `t`
            if (leftChar in mapT) {
                // Increment its count in `mapT` (as we are removing it from the window)
                mapT[leftChar]++;
                // If its count becomes positive after incrementing, it means we now *need*
                // this character again to satisfy `t`'s requirements.
                // So, decrement `matchedCharsCount`.
                if (mapT[leftChar] > 0) {
                    matchedCharsCount--;
                }
            }
        }
    }

    // If minLength is still Infinity, no valid window was found
    return minLength === Infinity ? "" : s.substring(minWindowStart, minWindowStart + minLength);
}

module.exports = {
    minWindow
};
```