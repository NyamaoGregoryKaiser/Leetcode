```typescript
/**
 * Given an array of strings `strs`, group the anagrams together.
 * You can return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * Example 1:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * Example 2:
 * Input: strs = [""]
 * Output: [[""]]
 *
 * Example 3:
 * Input: strs = ["a"]
 * Output: [["a"]]
 *
 * Constraints:
 * 1 <= strs.length <= 10^4
 * 0 <= strs[i].length <= 100
 * strs[i] consists of lowercase English letters.
 */

/**
 * Optimal Solution: Using a Hash Map (Map in TypeScript/JavaScript)
 *
 * Approach:
 * The core idea is that anagrams will have the same "canonical" representation.
 * If we can transform each string into such a canonical form, we can use this
 * form as a key in a hash map to group all strings that share that form.
 *
 * 1. Initialize an empty hash map where:
 *    - Key: The canonical form of a string (e.g., sorted string, or a frequency count string).
 *    - Value: A list of strings that are anagrams and share this canonical form.
 * 2. Iterate through each `str` in the input array `strs`.
 * 3. For each `str`, generate its canonical key:
 *    a. **Method 1 (Sorted String - chosen for implementation):** Convert the string to a character array, sort it, and then join it back into a string.
 *       Example: "tea" -> ['t','e','a'] -> ['a','e','t'] -> "aet"
 *                "eat" -> ['e','a','t'] -> ['a','e','t'] -> "aet"
 *    b. **Method 2 (Frequency Count String):** Create a frequency array (e.g., of size 26 for lowercase English letters). Count character occurrences. Convert this frequency array into a unique string key.
 *       Example: "tea" -> [1,0,0,0,1,0,...1...] (counts for a,b,c,d,e,f,...t...) -> "1#0#0#1#0#1" (delimiter helps)
 *       This method can sometimes be faster if string sorting is expensive for very long strings, as it's O(M) where M is string length,
 *       while sorting is O(M log M). However, M is usually small in constraints.
 * 4. Use this `key` to interact with the hash map:
 *    a. If `map.has(key)` is false, create a new list for this key: `map.set(key, [])`.
 *    b. Add the original `str` to the list associated with `key`: `map.get(key)!.push(str)`.
 * 5. After iterating through all strings, the values of the hash map will be lists of grouped anagrams.
 *    Return `Array.from(map.values())`.
 *
 * Time Complexity: O(N * M log M) or O(N * M)
 * - N is the number of strings in `strs`.
 * - M is the average length of a string in `strs`.
 * - Generating the key:
 *   - If sorting strings: O(M log M) for each string. Total: O(N * M log M).
 *   - If using frequency count array: O(M) for each string. Converting array to string can be O(alphabet_size) which is constant (26). Total: O(N * M).
 * - Hash map operations (insert/lookup): O(1) on average for a string key of length M.
 *
 * Space Complexity: O(N * M)
 * - In the worst case, all strings could be unique anagram groups. The map would store N keys, and the lists would collectively store all characters of all N strings.
 * - The sorted string key also takes O(M) space temporarily for each string.
 */
export function groupAnagrams(strs: string[]): string[][] {
    // A Map to store grouped anagrams.
    // The key will be the canonical form (sorted string), and the value will be an array of anagrams.
    const anagramGroups = new Map<string, string[]>();

    for (const str of strs) {
        // 3. Generate the canonical key for the current string.
        // Convert to character array, sort it, and join back to a string.
        // Example: "eat" -> ['e','a','t'] -> ['a','e','t'] -> "aet"
        const key = str.split('').sort().join('');

        // 4. Group strings using the generated key.
        // If the key doesn't exist, initialize an empty array for it.
        if (!anagramGroups.has(key)) {
            anagramGroups.set(key, []);
        }
        // Add the original string to the list associated with its canonical key.
        anagramGroups.get(key)!.push(str);
    }

    // 5. Return all the grouped lists of anagrams.
    // `Array.from(map.values())` extracts all value arrays into a new array.
    return Array.from(anagramGroups.values());
}
```