/**
 * src/algorithms/groupAnagrams.js
 *
 * Problem: Group Anagrams
 *
 * Problem Description:
 * Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * Example:
 * Input: `["eat","tea","tan","ate","nat","bat"]`
 * Output: `[["bat"],["nat","tan"],["ate","eat","tea"]]`
 * (Order of inner lists and their elements does not matter)
 *
 * Solution Approach: Hash Map
 * The core idea is that anagrams will have the same "canonical" representation.
 * We can use this canonical representation as a key in a hash map (or object in JS).
 * The value associated with each key will be a list of strings that share that canonical representation.
 *
 * Two common ways to create a canonical key:
 * 1. Sorting the characters of the string.
 * 2. Counting the frequency of characters in the string.
 */

/**
 * Approach 1: Sorting as Key
 *
 * For each string, sort its characters to form a canonical representation (e.g., "eat" -> "aet").
 * Use this sorted string as a key in a hash map.
 * All anagrams will produce the same sorted string and thus map to the same entry in the hash map.
 *
 * Time Complexity: O(N * K log K)
 *   - N: number of strings in the input array `strs`.
 *   - K: maximum length of a string in `strs`.
 *   - For each of N strings:
 *     - Converting string to array: O(K)
 *     - Sorting array: O(K log K)
 *     - Converting array back to string (for key): O(K)
 *     - Map operations (get, set, push): O(1) on average.
 *   - Total: N * (K + K log K + K) = O(N * K log K)
 *
 * Space Complexity: O(N * K)
 *   - The map stores all N strings (in its values) and N sorted strings (in its keys) in the worst case.
 *   - Each sorted string key takes O(K) space.
 *   - The list of anagrams for each key stores the original strings, also O(K) per string.
 *   - Total: O(N * K)
 *
 * @param {string[]} strs - An array of strings.
 * @returns {string[][]} An array of arrays, where each inner array contains anagrams.
 */
function groupAnagramsSortingKey(strs) {
    if (!Array.isArray(strs) || !strs.every(s => typeof s === 'string')) {
        throw new TypeError("Input must be an array of strings.");
    }

    const anagramMap = new Map(); // Using Map for better key handling than plain object

    for (const str of strs) {
        // Create a canonical key by sorting the string
        // Example: "eat" -> ["e", "a", "t"] -> ["a", "e", "t"] -> "aet"
        const key = str.split('').sort().join('');

        // If the key exists, add the current string to its list
        // Otherwise, create a new list for this key
        if (anagramMap.has(key)) {
            anagramMap.get(key).push(str);
        } else {
            anagramMap.set(key, [str]);
        }
    }

    // Return all the lists of anagrams (values from the map)
    return Array.from(anagramMap.values());
}

/**
 * Approach 2: Character Counting as Key
 *
 * Instead of sorting, we can count the frequency of each character for a string.
 * This character count can then be used to form a unique key.
 * For example, for "eat", the counts might be `a:1, e:1, t:1`. This can be represented
 * as a string like "a1e1t1" or "#1#0#0...#1#0..." for all 26 lowercase letters.
 *
 * Time Complexity: O(N * K + N * alphabet_size) which simplifies to O(N * K) given alphabet_size is constant (26).
 *   - N: number of strings in the input array `strs`.
 *   - K: maximum length of a string in `strs`.
 *   - For each of N strings:
 *     - Initialize count array: O(alphabet_size) (26 for lowercase English letters)
 *     - Iterate through string to count characters: O(K)
 *     - Construct key string from count array: O(alphabet_size)
 *     - Map operations: O(1) on average.
 *   - Total: N * (alphabet_size + K + alphabet_size) = O(N * (K + alphabet_size)) = O(N * K)
 *   This is generally faster than sorting if K is large, as K log K > K.
 *
 * Space Complexity: O(N * K + N * alphabet_size) which simplifies to O(N * K)
 *   - The map stores N original strings (values).
 *   - The map stores N keys. Each key (character count string) takes O(alphabet_size) space.
 *   - Total: O(N * K + N * alphabet_size) = O(N * K)
 *
 * @param {string[]} strs - An array of strings.
 * @returns {string[][]} An array of arrays, where each inner array contains anagrams.
 */
function groupAnagramsCountingKey(strs) {
    if (!Array.isArray(strs) || !strs.every(s => typeof s === 'string')) {
        throw new TypeError("Input must be an array of strings.");
    }

    const anagramMap = new Map();

    for (const str of strs) {
        // Initialize an array to store character counts (for 'a' through 'z')
        // We use 26 for lowercase English letters
        const charCounts = new Array(26).fill(0);

        // Populate character counts
        for (const char of str) {
            // 'a'.charCodeAt(0) gives ASCII value of 'a'
            // Subtracting 'a'.charCodeAt(0) gives 0 for 'a', 1 for 'b', etc.
            charCounts[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        // Create a unique key from the character counts
        // Example: "eat" -> [1,0,0,0,1,0...1,0,0] -> "1#0#0#0#1#0...1#0#0"
        // Using '#' as a separator to avoid ambiguity (e.g., "ab" -> "11", "k" -> "11" if using only counts)
        const key = charCounts.join('#');

        // Store the string in the map
        if (anagramMap.has(key)) {
            anagramMap.get(key).push(str);
        } else {
            anagramMap.set(key, [str]);
        }
    }

    return Array.from(anagramMap.values());
}

module.exports = {
    groupAnagramsSortingKey,
    groupAnagramsCountingKey
};