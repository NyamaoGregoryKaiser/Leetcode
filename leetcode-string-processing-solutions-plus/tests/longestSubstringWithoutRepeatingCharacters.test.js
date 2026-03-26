/**
 * tests/longestSubstringWithoutRepeatingCharacters.test.js
 *
 * Test file for the longestSubstringWithoutRepeatingCharacters algorithm implementations.
 */

const {
    lengthOfLongestSubstringBruteForce,
    lengthOfLongestSubstringSlidingWindowSet,
    lengthOfLongestSubstringSlidingWindowMap
} = require('../src/algorithms/longestSubstringWithoutRepeatingCharacters');

const testCases = [
    { input: "abcabcbb", expected: 3 }, // "abc"
    { input: "bbbbb", expected: 1 }, // "b"
    { input: "pwwkew", expected: 3 }, // "wke"
    { input: "", expected: 0 }, // Empty string
    { input: "a", expected: 1 }, // Single character
    { input: "au", expected: 2 }, // Two unique characters
    { input: "dvdf", expected: 3 }, // "vdf"
    { input: " ", expected: 1 }, // Space character
    { input: "abba", expected: 2 }, // "ab" or "ba"
    { input: "tmmzuxt", expected: 5 }, // "mzuxt"
    { input: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()", expected: 62 + 10 + 10 }, // All unique
    { input: "abcdefgabcdefgh", expected: 8 }, // "bcdefgh"
    { input: "abcdeafgh", expected: 7 }, // "bcdeafg" or "cdeafgh"
    { input: "abcdefghijklmnopqrstuvwxyza", expected: 26 }, // Entire alphabet then 'a' again
    { input: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
/**
 * src/algorithms/reverseString.js
 *
 * Problem: Reverse a string.
 *
 * Problem Description:
 * Write a function that reverses a string. The input string is given as an array of characters `char[]`.
 * Do not allocate extra space for another array. You must do this by modifying the input array in-place
 * with `O(1)` extra memory.
 *
 * Example:
 * Input: `["h","e","l","l","o"]`
 * Output: `["o","l","l","e","h"]`
 *
 * Variations covered:
 * 1. Creating a new reversed string (not in-place, for comparison).
 * 2. In-place reversal using two pointers (iterative - optimal for arrays).
 * 3. In-place reversal using recursion (two pointers with recursive calls).
 */

/**
 * Approach 1: Iterative reversal by creating a new string.
 * This approach is simple but does not meet the in-place requirement
 * for character arrays as it creates a new string.
 *
 * Time Complexity: O(n) - where n is the length of the string. We iterate through the string once.
 * Space Complexity: O(n) - A new string of length n is created.
 *
 * @param {string} s - The input string.
 * @returns {string} The reversed string.
 */
function reverseStringIterative(s) {
    if (typeof s !== 'string') {
        throw new TypeError("Input must be a string.");
    }
    let reversed = '';
    for (let i = s.length - 1; i >= 0; i--) {
        reversed += s[i];
    }
    return reversed;
}

/**
 * Approach 2: Two Pointers (In-Place, Iterative)
 * This is the optimal and most common solution for reversing a character array in-place.
 * It uses two pointers, one starting from the beginning and one from the end,
 * and swaps characters until they meet in the middle.
 *
 * Time Complexity: O(n) - We iterate through approximately half of the array.
 * Space Complexity: O(1) - No extra space is allocated beyond a few variables.
 *
 * @param {character[]} s - The input array of characters (modified in-place).
 * @returns {void} The array `s` is modified directly.
 */
function reverseStringTwoPointersInPlace(s) {
    if (!Array.isArray(s) || !s.every(char => typeof char === 'string' && char.length === 1)) {
        throw new TypeError("Input must be an array of single characters.");
    }

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Swap characters at left and right pointers
        [s[left], s[right]] = [s[right], s[left]];

        // Move pointers towards the center
        left++;
        right--;
    }
}

/**
 * Approach 3: Recursive Two Pointers (In-Place)
 * This approach also uses two pointers to achieve in-place reversal but with a recursive structure.
 * It performs swaps similarly to the iterative approach but uses recursion to advance the pointers.
 *
 * Time Complexity: O(n) - Each recursive call processes one pair of characters, and there are n/2 pairs.
 * Space Complexity: O(n) - Due to the recursion stack. In the worst case (e.g., very long strings),
 *                            this could lead to stack overflow if not optimized (Tail Call Optimization might help in some engines,
 *                            but not guaranteed in JS engines generally).
 *
 * @param {character[]} s - The input array of characters (modified in-place).
 * @param {number} left - The left pointer (default: 0).
 * @param {number} right - The right pointer (default: s.length - 1).
 * @returns {void} The array `s` is modified directly.
 */
function reverseStringRecursiveInPlace(s, left = 0, right = s.length - 1) {
    if (!Array.isArray(s) || !s.every(char => typeof char === 'string' && char.length === 1)) {
        throw new TypeError("Input must be an array of single characters.");
    }

    // Base case: if left pointer meets or crosses right pointer, recursion stops.
    if (left >= right) {
        return;
    }

    // Swap characters
    [s[left], s[right]] = [s[right], s[left]];

    // Recursive call for the next pair of characters
    reverseStringRecursiveInPlace(s, left + 1, right - 1);
}

module.exports = {
    reverseStringIterative,
    reverseStringTwoPointersInPlace,
    reverseStringRecursiveInPlace
};