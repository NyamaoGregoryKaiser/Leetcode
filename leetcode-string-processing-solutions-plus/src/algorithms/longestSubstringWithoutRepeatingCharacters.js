/**
 * src/algorithms/longestSubstringWithoutRepeatingCharacters.js
 *
 * Problem: Longest Substring Without Repeating Characters
 *
 * Problem Description:
 * Given a string `s`, find the length of the longest substring without repeating characters.
 *
 * Example:
 * Input: `"abcabcbb"`
 * Output: `3` (The answer is "abc", with a length of 3.)
 * Input: `"bbbbb"`
 * Output: `1` (The answer is "b", with a length of 1.)
 * Input: `"pwwkew"`
 * Output: `3` (The answer is "wke", with a length of 3. Note that "pwke" is a subsequence and not a substring.)
 *
 * Variations covered:
 * 1. Brute-force approach (checking all substrings).
 * 2. Optimal sliding window with a Set.
 * 3. More optimized sliding window with a Map (to store indices for direct jumps).
 */

/**
 * Approach 1: Brute-Force
 * This approach checks every possible substring to see if it contains repeating characters.
 * For each starting character, it extends the substring as far as possible without repeats.
 *
 * Time Complexity: O(n^3) in worst case (checking substrings).
 *   - Outer loop for 'i': O(n)
 *   - Inner loop for 'j': O(n)
 *   - `Set.has` and `Set.add` operations: O(1) on average.
 *   - The `check` function could be O(k) where k is substring length, or O(1) amortized for Set operations.
 *     However, the logic below uses a nested loop to build substrings *and* check uniqueness.
 *     A more direct brute force would be:
 *     `for i` to `n-1`:
 *       `for j` to `n-1`:
 *         `check uniqueness of s[i...j]` (which takes `O(j-i)` time).
 *     This leads to `O(n^3)`.
 *     The implementation below improves the inner loop slightly by using a Set as it builds.
 *     The loop `j` checks `s[i...j]`.
 *     `for i`: `O(n)`
 *       `for j`: `O(n)` - builds substring `s[i...j]` and checks character `s[j]`.
 *       Set operations are `O(1)`.
 *     This version is `O(n^2)`.
 * Space Complexity: O(min(n, alphabet_size)) - The set stores characters within the current window.
 *                                                Worst case is 'n' unique characters, or 'alphabet_size' if larger.
 *
 * @param {string} s - The input string.
 * @returns {number} The length of the longest substring without repeating characters.
 */
function lengthOfLongestSubstringBruteForce(s) {
    if (typeof s !== 'string') {
        throw new TypeError("Input must be a string.");
    }
    const n = s.length;
    let maxLength = 0;

    for (let i = 0; i < n; i++) {
        const charSet = new Set();
        for (let j = i; j < n; j++) {
            if (charSet.has(s[j])) {
                // Character already exists, this substring s[i...j] has repeats
                break;
            } else {
                // Character is unique in s[i...j], add it and update max length
                charSet.add(s[j]);
                maxLength = Math.max(maxLength, j - i + 1);
            }
        }
    }
    return maxLength;
}

/**
 * Approach 2: Sliding Window with Set
 * This is an optimal solution. It uses a "sliding window" approach, where `i` is the start
 * of the window and `j` is the end. A `Set` is used to keep track of characters within the
 * current window `[i, j)`.
 *
 * - When `s[j]` is not in the set, it means it's a unique character. We add it to the set,
 *   expand the window by moving `j` forward, and update the maximum length.
 * - When `s[j]` is already in the set, it means we have a duplicate. To remove the duplicate,
 *   we shrink the window from the left by removing `s[i]` from the set and incrementing `i`.
 *   We repeat this until `s[j]` is unique again in the window.
 *
 * Time Complexity: O(n) - Both pointers `i` and `j` iterate through the string at most once.
 * Space Complexity: O(min(n, alphabet_size)) - The set stores characters within the current window.
 *                                                Worst case is 'n' unique characters, or 'alphabet_size' if larger.
 *
 * @param {string} s - The input string.
 * @returns {number} The length of the longest substring without repeating characters.
 */
function lengthOfLongestSubstringSlidingWindowSet(s) {
    if (typeof s !== 'string') {
        throw new TypeError("Input must be a string.");
    }
    const n = s.length;
    let maxLength = 0;
    let i = 0; // Left pointer of the window
    let j = 0; // Right pointer of the window
    const charSet = new Set();

    while (j < n) {
        // If the character at 'j' is not in the set (i.e., unique in current window)
        if (!charSet.has(s[j])) {
            charSet.add(s[j]);
            maxLength = Math.max(maxLength, j - i + 1); // Update max length
            j++; // Expand window to the right
        } else {
            // Character at 'j' is a duplicate. Shrink window from the left.
            charSet.delete(s[i]);
            i++; // Shrink window from the left
        }
    }
    return maxLength;
}

/**
 * Approach 3: Optimized Sliding Window with Map
 * This is an even more optimized version of the sliding window. Instead of just tracking presence
 * in a Set, we use a Map to store the *last seen index* of each character.
 *
 * When a duplicate `s[j]` is found:
 * - If `s[j]` was seen at `prevIndex` and `prevIndex` is within the current window `[i, j)`,
 *   we don't need to shrink the window character by character. We can directly jump `i` to `prevIndex + 1`.
 * - This effectively skips all characters between the old `i` and `prevIndex`, making the window
 *   start immediately after the previous occurrence of the duplicate character.
 * - `i` is always `Math.max(i, map.get(s[j]) + 1)` to ensure `i` only moves forward and past the previous occurrence.
 *
 * Time Complexity: O(n) - Both pointers `i` and `j` iterate through the string at most once. Map operations are O(1) on average.
 * Space Complexity: O(min(n, alphabet_size)) - The map stores characters and their indices.
 *                                                Worst case is 'n' unique characters, or 'alphabet_size' if larger.
 *
 * @param {string} s - The input string.
 * @returns {number} The length of the longest substring without repeating characters.
 */
function lengthOfLongestSubstringSlidingWindowMap(s) {
    if (typeof s !== 'string') {
        throw new TypeError("Input must be a string.");
    }
    const n = s.length;
    let maxLength = 0;
    let i = 0; // Left pointer of the window
    const charMap = new Map(); // Stores character -> last seen index

    for (let j = 0; j < n; j++) {
        const char = s[j];
        // If the character is already in the map and its last seen index
        // is within the current window [i, j), then update 'i'
        if (charMap.has(char) && charMap.get(char) >= i) {
            i = charMap.get(char) + 1; // Move 'i' to the right of the previous occurrence
        }

        // Update the last seen index of the current character
        charMap.set(char, j);

        // Update the maximum length (current window size is j - i + 1)
        maxLength = Math.max(maxLength, j - i + 1);
    }
    return maxLength;
}

module.exports = {
    lengthOfLongestSubstringBruteForce,
    lengthOfLongestSubstringSlidingWindowSet,
    lengthOfLongestSubstringSlidingWindowMap
};