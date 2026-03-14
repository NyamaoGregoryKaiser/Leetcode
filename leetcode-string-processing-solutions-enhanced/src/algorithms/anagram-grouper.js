```javascript
/**
 * @fileoverview Implements various approaches to group anagrams together from a list of strings.
 * Anagrams are words or phrases formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 * The order of the output groups and the order of strings within groups do not matter.
 */

const { charToIndex } = require('../utils/string-helpers');

/**
 * Solution 1: Sorting Characters as Key (Optimal and commonly used)
 * This approach uses a hash map (or JavaScript object/Map) where the key for each group
 * is a sorted version of the string. All anagrams will have the same sorted string as their key.
 *
 * @param {string[]} strs An array of strings.
 * @returns {string[][]} An array of arrays, where each inner array contains a group of anagrams.
 *
 * Time Complexity: O(N * K * log K)
 *   - N is the number of strings in `strs`.
 *   - K is the maximum length of a string in `strs`.
 *   - For each string, we sort its characters (K * log K) and then insert into a hash map (average O(1)).
 *   - So, N operations, each taking K * log K.
 * Space Complexity: O(N * K)
 *   - In the worst case, all strings are distinct and not anagrams of each other.
 *   - The hash map will store N entries, each potentially containing a string of length K (for the key)
 *     and storing the original strings, summing up to N * K total characters.
 */
function groupAnagramsSortingKey(strs) {
    // 1. Handle edge cases.
    if (!strs || strs.length === 0) {
        return [];
    }

    // 2. Use a Map to store groups of anagrams.
    // The key will be the sorted string, and the value will be an array of original strings.
    const anagramGroups = new Map();

    // 3. Iterate through each string in the input array.
    for (const str of strs) {
        // 4. Create a canonical key for the string:
        //    - Split the string into an array of characters.
        //    - Sort the characters alphabetically.
        //    - Join them back into a string.
        //    Example: "eat" -> ['e', 'a', 't'] -> ['a', 'e', 't'] -> "aet"
        //    "tea" -> ['t', 'e', 'a'] -> ['a', 'e', 't'] -> "aet"
        const sortedKey = str.split('').sort().join('');

        // 5. Check if the sorted key already exists in the map.
        if (anagramGroups.has(sortedKey)) {
            // If it exists, add the current string to the existing group.
            anagramGroups.get(sortedKey).push(str);
        } else {
            // If it doesn't exist, create a new group with the current string.
            anagramGroups.set(sortedKey, [str]);
        }
    }

    // 6. Return all the values (the arrays of anagrams) from the map.
    return Array.from(anagramGroups.values());
}

/**
 * Solution 2: Character Count Array as Key (More efficient for fixed alphabet, e.g., lowercase English)
 * This approach uses a hash map where the key for each group is a string representation of
 * a character frequency array (e.g., "1#0#0#1#..." for "a...a").
 * This avoids the O(K log K) sorting step for each string.
 *
 * @param {string[]} strs An array of strings.
 * @returns {string[][]} An array of arrays, where each inner array contains a group of anagrams.
 *
 * Time Complexity: O(N * K)
 *   - N is the number of strings.
 *   - K is the maximum length of a string.
 *   - For each string:
 *     - We iterate through its characters to build a frequency array (O(K)).
 *     - We convert the frequency array to a string key (O(alphabet_size), which is O(1) for fixed alphabet like 26).
 *     - Map operations are O(1) on average.
 *   - So, N operations, each taking O(K) time. This is more efficient than O(N * K * log K) if K is large.
 * Space Complexity: O(N * K)
 *   - Similar to sorting key, stores all strings. Keys also take O(alphabet_size) space.
 */
function groupAnagramsCharCountKey(strs) {
    if (!strs || strs.length === 0) {
        return [];
    }

    const anagramGroups = new Map(); // Map: "count_key" -> [string, ...]

    // Iterate through each string.
    for (const str of strs) {
        // Create a frequency array for the 26 lowercase English letters.
        // Initialize all counts to 0.
        const charCounts = new Array(26).fill(0);

        // Populate the frequency array for the current string.
        for (const char of str) {
            // Use string-helpers to get 0-indexed position for 'a'-'z'.
            charCounts[charToIndex(char)]++;
        }

        // Create a unique key from the character counts.
        // Example: "eat" -> [1,1,0,0,1,0,...] -> "1#1#0#0#1#0#..."
        // Using '#' as a separator prevents collisions (e.g., "ab" vs "a,b" -> "11" vs "1,1").
        const countKey = charCounts.join('#');

        // Add the string to the corresponding group in the map.
        if (anagramGroups.has(countKey)) {
            anagramGroups.get(countKey).push(str);
        } else {
            anagramGroups.set(countKey, [str]);
        }
    }

    // Return all grouped anagrams.
    return Array.from(anagramGroups.values());
}

module.exports = {
    groupAnagramsSortingKey,
    groupAnagramsCharCountKey
};
```