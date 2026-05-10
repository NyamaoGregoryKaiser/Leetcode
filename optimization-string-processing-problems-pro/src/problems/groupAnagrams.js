```javascript
/**
 * @fileoverview Problem: Group Anagrams
 *
 * Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * Constraints:
 * 1 <= strs.length <= 10^4
 * 0 <= strs[i].length <= 100
 * `strs[i]` consists of lowercase English letters.
 */

/**
 * Solution 1: Sorting Characters
 *
 * The core idea is that anagrams will have the same sorted string.
 * We can use a hash map (or JavaScript Map) where the key is the sorted version of a word,
 * and the value is a list of all words that, when sorted, produce that key.
 *
 * Algorithm:
 * 1. Initialize an empty hash map `anagramGroups`.
 * 2. Iterate through each string `str` in the input array `strs`.
 * 3. For each `str`:
 *    a. Convert it to a character array, sort the array, and join it back into a string. This sorted string will be our `key`.
 *    b. If `key` is not in `anagramGroups`, add it with an empty array as its value.
 *    c. Push the original `str` into the array associated with `key`.
 * 4. After iterating through all strings, return all the values (arrays of anagrams) from `anagramGroups`.
 *
 * Time Complexity: O(N * M log M)
 * Where N is the number of strings in `strs` and M is the maximum length of a string in `strs`.
 * - Iterating through N strings: O(N)
 * - For each string of length M:
 *   - Converting to array, sorting, and joining takes O(M log M).
 * - Hash map operations (insert/lookup) take O(1) on average.
 * Total time = N * (M log M) = O(N * M log M).
 *
 * Space Complexity: O(N * M)
 * In the worst case, all strings are unique anagrams, or all are anagrams of each other.
 * The hash map stores all N strings, each potentially up to M characters long.
 * The keys (sorted strings) can also be up to M characters long.
 * Total space = O(N * M) for storing the strings in the map values, and O(N * M) for keys in the worst case where keys are distinct and M characters long.
 *
 * @param {string[]} strs - The array of input strings.
 * @returns {string[][]} An array of arrays, where each inner array contains anagrams.
 */
function groupAnagramsSorting(strs) {
    if (!strs || strs.length === 0) {
        return [];
    }

    const anagramGroups = new Map(); // Map<string, string[]>

    for (const str of strs) {
        // Create a unique key by sorting the characters of the string
        const key = str.split('').sort().join('');

        // Get the list of anagrams for this key, or create a new empty list
        if (!anagramGroups.has(key)) {
            anagramGroups.set(key, []);
        }
        anagramGroups.get(key).push(str);
    }

    // Return all the values (arrays of anagrams) from the map
    return Array.from(anagramGroups.values());
}

/**
 * Solution 2: Character Counting Array (Frequency Map)
 *
 * Instead of sorting strings, which takes O(M log M), we can create a frequency map (or array)
 * of characters for each string. Since the constraint says lowercase English letters,
 * we can use an array of size 26 for counting. This character count array can then be
 * converted into a string (e.g., "a1b0c2..." or "#1#0#2...") to serve as the hash map key.
 *
 * Algorithm:
 * 1. Initialize an empty hash map `anagramGroups`.
 * 2. Iterate through each string `str` in the input array `strs`.
 * 3. For each `str`:
 *    a. Create a character count array `count` of size 26, initialized to zeros.
 *    b. Iterate through the characters of `str`. For each character `char`, increment `count[char.charCodeAt(0) - 'a'.charCodeAt(0)]`.
 *    c. Construct a unique `key` from this `count` array. A common way is to join the counts with a delimiter, e.g., "0#1#0#0#...".
 *    d. If `key` is not in `anagramGroups`, add it with an empty array.
 *    e. Push the original `str` into the array associated with `key`.
 * 4. After iterating through all strings, return all the values from `anagramGroups`.
 *
 * Time Complexity: O(N * M)
 * Where N is the number of strings in `strs` and M is the maximum length of a string in `strs`.
 * - Iterating through N strings: O(N)
 * - For each string of length M:
 *   - Creating and filling the count array: O(M) (26 constant operations for array setup, M operations for character counting).
 *   - Constructing the key from the count array: O(26) which is O(1) as 26 is a constant.
 * - Hash map operations take O(1) on average.
 * Total time = N * (M + 1) = O(N * M).
 * This is generally faster than the sorting approach if M is large.
 *
 * Space Complexity: O(N * M)
 * Similar to the sorting approach, the hash map stores all N strings, each up to M characters.
 * The keys (character count strings) are of constant length (26 * 2 for numbers + delimiters).
 * Total space = O(N * M) for storing the strings in the map values.
 *
 * @param {string[]} strs - The array of input strings.
 * @returns {string[][]} An array of arrays, where each inner array contains anagrams.
 */
function groupAnagramsCounting(strs) {
    if (!strs || strs.length === 0) {
        return [];
    }

    const anagramGroups = new Map(); // Map<string, string[]>

    for (const str of strs) {
        // Initialize an array to count character frequencies for 'a' through 'z'
        const charCounts = Array(26).fill(0); // 26 letters in English alphabet

        // Populate the character count array
        for (const char of str) {
            const charCode = char.charCodeAt(0);
            // 'a' has charCode 97, so 'a' maps to index 0, 'b' to 1, etc.
            charCounts[charCode - 'a'.charCodeAt(0)]++;
        }

        // Create a unique key from the character count array
        // Example: "eat" -> [1,0,0,0,1, ... ,1,0] -> "1#0#0#0#1#...#1#0"
        // This key uniquely identifies the anagram group.
        const key = charCounts.join('#'); // Using '#' as a delimiter to prevent ambiguities (e.g., "1#11" vs "11#1")

        // Get the list of anagrams for this key, or create a new empty list
        if (!anagramGroups.has(key)) {
            anagramGroups.set(key, []);
        }
        anagramGroups.get(key).push(str);
    }

    // Return all the values (arrays of anagrams) from the map
    return Array.from(anagramGroups.values());
}

module.exports = {
    groupAnagramsSorting,
    groupAnagramsCounting
};
```